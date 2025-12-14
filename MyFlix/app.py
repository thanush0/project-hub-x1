"""
MyFlix - Flask Application
Main web server for the streaming platform
"""

import os
import asyncio
import sys
import time
from datetime import datetime
from functools import wraps

# Fix for Python 3.14+ event loop issue with Pyrogram
if sys.version_info >= (3, 10):
    try:
        asyncio.get_event_loop()
    except RuntimeError:
        asyncio.set_event_loop(asyncio.new_event_loop())

from flask import Flask, render_template, jsonify, Response, request, abort, send_file
from pyrogram.errors import RPCError
import config
from telegram_client import telegram_client, init_telegram, cleanup_telegram


# ================================
# FLASK APP SETUP
# ================================
app = Flask(__name__)
app.config['SECRET_KEY'] = config.SECRET_KEY

# Rate limiting storage (in-memory for simplicity)
request_history = {}


# ================================
# HELPER FUNCTIONS
# ================================
def run_async(coro):
    """Helper to run async functions in Flask routes"""
    # Always create a fresh event loop for each request to avoid conflicts
    # This prevents "Future attached to a different event loop" errors
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    try:
        # Run the coroutine
        result = loop.run_until_complete(coro)
        return result
    finally:
        # Clean up: close the loop to free resources
        # Don't use loop.close() if we want to keep it, but create new ones instead
        try:
            # Cancel any pending tasks
            pending = asyncio.all_tasks(loop)
            for task in pending:
                task.cancel()
            # Wait for task cancellations
            if pending:
                loop.run_until_complete(asyncio.gather(*pending, return_exceptions=True))
        except Exception:
            pass
        finally:
            loop.close()


def rate_limit(max_requests=config.MAX_REQUESTS_PER_MINUTE):
    """Simple rate limiting decorator"""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not config.RATE_LIMIT_ENABLED:
                return f(*args, **kwargs)
            
            # Get client IP
            client_ip = request.remote_addr
            current_time = time.time()
            
            # Initialize or clean old requests
            if client_ip not in request_history:
                request_history[client_ip] = []
            
            # Remove requests older than 1 minute
            request_history[client_ip] = [
                req_time for req_time in request_history[client_ip]
                if current_time - req_time < 60
            ]
            
            # Check rate limit
            if len(request_history[client_ip]) >= max_requests:
                return jsonify({
                    'error': 'Rate limit exceeded',
                    'message': f'Maximum {max_requests} requests per minute'
                }), 429
            
            # Add current request
            request_history[client_ip].append(current_time)
            
            return f(*args, **kwargs)
        return wrapper
    return decorator


def clean_temp_files():
    """Clean up old temporary download files"""
    try:
        temp_dir = config.TEMP_DOWNLOAD_DIR
        if not os.path.exists(temp_dir):
            return
        
        current_time = time.time()
        for filename in os.listdir(temp_dir):
            filepath = os.path.join(temp_dir, filename)
            if os.path.isfile(filepath):
                file_age = current_time - os.path.getmtime(filepath)
                if file_age > config.MAX_TEMP_FILE_AGE:
                    os.remove(filepath)
                    print(f"🗑️  Cleaned temp file: {filename}")
    except Exception as e:
        print(f"⚠️  Error cleaning temp files: {e}")


def group_movies_by_genre(movies):
    """Group movies by their genres"""
    genre_groups = {}
    
    for movie in movies:
        genres = movie.get('genre', ['Uncategorized'])
        
        for genre in genres:
            if genre not in genre_groups:
                genre_groups[genre] = []
            genre_groups[genre].append(movie)
    
    return genre_groups


def format_duration(seconds):
    """Convert seconds to readable duration (e.g., '2h 15m')"""
    if not seconds:
        return 'Unknown'
    
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    
    if hours > 0:
        return f"{hours}h {minutes}m"
    else:
        return f"{minutes}m"


def format_file_size(bytes_size):
    """Convert bytes to readable file size"""
    if not bytes_size:
        return 'Unknown'
    
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_size < 1024.0:
            return f"{bytes_size:.1f} {unit}"
        bytes_size /= 1024.0
    
    return f"{bytes_size:.1f} TB"


# ================================
# ROUTES
# ================================

@app.route('/')
@rate_limit()
def index():
    """Home page - displays all movies grouped by genre"""
    try:
        # Clean old temp files
        clean_temp_files()
        
        # Get movies from cache/Telegram
        movies = run_async(telegram_client.get_movies())
        
        # Group by genre
        genre_groups = group_movies_by_genre(movies)
        
        # Add formatted data
        for movie in movies:
            movie['duration_formatted'] = format_duration(movie.get('duration', 0))
            movie['file_size_formatted'] = format_file_size(movie.get('file_size', 0))
        
        return render_template(
            'index.html',
            movies=movies,
            genre_groups=genre_groups,
            total_movies=len(movies),
            categories=config.CATEGORIES
        )
    except Exception as e:
        print(f"❌ Error in index route: {e}")
        return render_template('error.html', error=str(e)), 500


@app.route('/watch/<int:message_id>')
@rate_limit()
def watch(message_id):
    """Video player page for a specific movie"""
    try:
        # Get movie details
        movie = run_async(telegram_client.get_movie_by_id(message_id))
        
        if not movie:
            abort(404)
        
        # Add formatted data
        movie['duration_formatted'] = format_duration(movie.get('duration', 0))
        movie['file_size_formatted'] = format_file_size(movie.get('file_size', 0))
        
        return render_template('watch.html', movie=movie)
    except Exception as e:
        print(f"❌ Error in watch route: {e}")
        return render_template('error.html', error=str(e)), 500


@app.route('/category/<genre>')
@rate_limit()
def category(genre):
    """Display movies filtered by genre"""
    try:
        movies = run_async(telegram_client.get_movies())
        
        # Filter by genre
        filtered_movies = [
            movie for movie in movies
            if genre in movie.get('genre', [])
        ]
        
        # Add formatted data
        for movie in filtered_movies:
            movie['duration_formatted'] = format_duration(movie.get('duration', 0))
            movie['file_size_formatted'] = format_file_size(movie.get('file_size', 0))
        
        return render_template(
            'category.html',
            genre=genre,
            movies=filtered_movies,
            total=len(filtered_movies)
        )
    except Exception as e:
        print(f"❌ Error in category route: {e}")
        return render_template('error.html', error=str(e)), 500


@app.route('/stream/<int:message_id>')
@rate_limit(max_requests=10)
def stream_video(message_id):
    """
    Stream video from Telegram
    Uses Range requests for seeking support
    """
    try:
        # Get movie details
        movie = run_async(telegram_client.get_movie_by_id(message_id))
        
        if not movie:
            abort(404)
        
        file_id = movie['file_id']
        file_size = movie.get('file_size', 0)
        
        # Get range header for partial content support
        range_header = request.headers.get('Range')
        
        if not range_header:
            # Full file stream (not recommended for large files)
            return Response(
                run_async(stream_full_file(file_id)),
                mimetype='video/mp4',
                headers={
                    'Content-Disposition': f'inline; filename="{movie["title"]}.mp4"',
                    'Accept-Ranges': 'bytes'
                }
            )
        
        # Parse range request
        byte_range = range_header.replace('bytes=', '').split('-')
        start = int(byte_range[0]) if byte_range[0] else 0
        end = int(byte_range[1]) if len(byte_range) > 1 and byte_range[1] else file_size - 1
        length = end - start + 1
        
        # Stream partial content
        def generate():
            """Generator for chunked streaming with range support"""
            try:
                # Note: This is a simplified version
                # For production, you'd want to use Telegram's offset parameter
                chunk_generator = run_async(stream_file_range(file_id, start, end))
                for chunk in chunk_generator:
                    yield chunk
            except Exception as e:
                print(f"❌ Streaming error: {e}")
        
        response = Response(
            generate(),
            206,  # Partial Content
            mimetype='video/mp4',
            direct_passthrough=True
        )
        
        response.headers.add('Content-Range', f'bytes {start}-{end}/{file_size}')
        response.headers.add('Accept-Ranges', 'bytes')
        response.headers.add('Content-Length', str(length))
        response.headers.add('Content-Disposition', f'inline; filename="{movie["title"]}.mp4"')
        
        return response
    
    except Exception as e:
        print(f"❌ Error in stream route: {e}")
        abort(500)


async def stream_full_file(file_id):
    """Stream entire file from Telegram"""
    async for chunk in telegram_client.get_file_stream(file_id):
        yield chunk


async def stream_file_range(file_id, start, end):
    """
    Stream file range from Telegram
    Note: This is simplified - Pyrogram's streaming needs proper offset handling
    """
    # For production, implement proper range streaming using offset
    async for chunk in telegram_client.get_file_stream(file_id):
        yield chunk


@app.route('/api/movies')
@rate_limit()
def api_movies():
    """API endpoint to get all movies as JSON"""
    try:
        movies = run_async(telegram_client.get_movies())
        return jsonify({
            'success': True,
            'total': len(movies),
            'movies': movies
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/movies/<int:message_id>')
@rate_limit()
def api_movie(message_id):
    """API endpoint to get a specific movie"""
    try:
        movie = run_async(telegram_client.get_movie_by_id(message_id))
        
        if not movie:
            return jsonify({
                'success': False,
                'error': 'Movie not found'
            }), 404
        
        return jsonify({
            'success': True,
            'movie': movie
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/refresh')
@rate_limit(max_requests=2)
def api_refresh():
    """API endpoint to refresh movie cache from Telegram"""
    try:
        movies = run_async(telegram_client.get_movies(force_refresh=True))
        return jsonify({
            'success': True,
            'message': 'Cache refreshed successfully',
            'total': len(movies)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/search')
@rate_limit()
def api_search():
    """API endpoint to search movies"""
    try:
        query = request.args.get('q', '').lower()
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'Search query required'
            }), 400
        
        movies = run_async(telegram_client.get_movies())
        
        # Search in title and description
        results = [
            movie for movie in movies
            if query in movie['title'].lower() or 
               query in movie.get('description', '').lower()
        ]
        
        return jsonify({
            'success': True,
            'query': query,
            'total': len(results),
            'results': results
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.errorhandler(404)
def not_found(e):
    """404 error handler"""
    return render_template('error.html', error='Page not found', code=404), 404


@app.errorhandler(500)
def server_error(e):
    """500 error handler"""
    return render_template('error.html', error='Internal server error', code=500), 500


# ================================
# APP STARTUP & SHUTDOWN
# ================================

def startup():
    """Initialize application on startup"""
    print("🚀 Starting MyFlix application...")
    
    # Validate configuration
    if not config.validate_config():
        print("⚠️  Running with incomplete configuration")
    
    # Initialize Telegram client
    success = run_async(init_telegram())
    
    if not success:
        print("⚠️  Failed to initialize Telegram client")
        print("   The app will run but won't be able to fetch movies")


def shutdown():
    """Cleanup on application shutdown"""
    print("🛑 Shutting down MyFlix application...")
    run_async(cleanup_telegram())
    clean_temp_files()


# ================================
# MAIN ENTRY POINT
# ================================

if __name__ == '__main__':
    try:
        print("=" * 50)
        print("🎬 MyFlix - Telegram Streaming Platform")
        print("=" * 50)
        
        # Ensure directories exist
        os.makedirs(config.CACHE_DIR, exist_ok=True)
        os.makedirs(config.TEMP_DOWNLOAD_DIR, exist_ok=True)
        
        # Initialize Telegram on startup
        startup()
        
        # Run Flask app
        app.run(
            host=config.HOST,
            port=config.PORT,
            debug=config.DEBUG,
            threaded=True
        )
    except KeyboardInterrupt:
        print("\n👋 Shutting down gracefully...")
        shutdown()
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        shutdown()
