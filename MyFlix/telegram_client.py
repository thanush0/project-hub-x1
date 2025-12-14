"""
Telegram Client Module
Handles all Telegram bot operations using Pyrogram
"""

import os
import json
import asyncio
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from pyrogram import Client
from pyrogram.types import Message
from pyrogram.errors import FloodWait, ChannelInvalid
import config


class TelegramMovieClient:
    """Manages Telegram bot connection and movie operations"""
    
    def __init__(self):
        self.client = None
        self.cache_file = config.MOVIES_CACHE_FILE
        self.channel_id = config.CHANNEL_ID
        self._ensure_directories()
    
    def _ensure_directories(self):
        """Create necessary directories if they don't exist"""
        os.makedirs(config.CACHE_DIR, exist_ok=True)
        os.makedirs(config.TEMP_DOWNLOAD_DIR, exist_ok=True)
    
    async def start(self):
        """Initialize and start the Telegram client"""
        try:
            print(f"🔌 Connecting to Telegram using {config.AUTH_METHOD.upper()} mode...")
            
            if config.AUTH_METHOD == 'bot':
                # Bot authentication
                self.client = Client(
                    "myflix_bot",
                    api_id=config.API_ID,
                    api_hash=config.API_HASH,
                    bot_token=config.BOT_TOKEN
                )
                await self.client.start()
                me = await self.client.get_me()
                print(f"✅ Bot connected: @{me.username}")
                
            elif config.AUTH_METHOD == 'user':
                # User account authentication
                self.client = Client(
                    "myflix_user",
                    api_id=config.API_ID,
                    api_hash=config.API_HASH,
                    phone_number=config.PHONE_NUMBER
                )
                await self.client.start()
                me = await self.client.get_me()
                print(f"✅ User account connected: {me.first_name}")
                print(f"   Phone: {me.phone_number}")
                print(f"   ⚠️  USER MODE: No admin permissions needed!")
                
            else:
                raise ValueError(f"Invalid AUTH_METHOD: {config.AUTH_METHOD}")
            
            print("✅ Telegram client connected successfully")
            return True
            
        except Exception as e:
            print(f"❌ Failed to connect to Telegram: {e}")
            print(f"\n💡 Tips:")
            if config.AUTH_METHOD == 'user':
                print("   - Make sure TELEGRAM_PHONE_NUMBER is correct (include country code)")
                print("   - You'll need to enter verification code from Telegram")
                print("   - Make sure your account is a member of the channel")
            else:
                print("   - Make sure TELEGRAM_BOT_TOKEN is correct")
                print("   - Bot must be added as admin in the channel")
            return False
    
    async def stop(self):
        """Stop the Telegram client"""
        if self.client:
            await self.client.stop()
            print("🛑 Telegram client disconnected")
    
    async def verify_bot_admin_permissions(self) -> bool:
        """
        Verify that the bot/user has access to the channel
        Returns True if has access, False otherwise
        """
        if not self.client:
            print("❌ Telegram client not initialized")
            return False
        
        # If using user mode, skip admin checks
        if config.AUTH_METHOD == 'user':
            try:
                chat = await self.client.get_chat(self.channel_id)
                print(f"✅ Successfully accessed channel: {chat.title}")
                print(f"   Channel ID: {chat.id}")
                print(f"   Channel Type: {chat.type}")
                
                me = await self.client.get_me()
                print(f"✅ User account: {me.first_name} (@{me.username if me.username else 'no username'})")
                
                # Check if user is a member
                try:
                    member = await self.client.get_chat_member(self.channel_id, me.id)
                    print(f"✅ User status in channel: {member.status}")
                    print("✅ User has access to the channel!")
                    return True
                except Exception as e:
                    print(f"❌ Error checking membership: {e}")
                    print("   Make sure your account is a member of the channel")
                    return False
                    
            except Exception as e:
                print(f"❌ Error accessing channel: {e}")
                return False
        
        # Bot mode - check admin permissions
        try:
            # Get the channel/chat
            chat = await self.client.get_chat(self.channel_id)
            print(f"✅ Successfully accessed channel: {chat.title}")
            print(f"   Channel ID: {chat.id}")
            print(f"   Channel Type: {chat.type}")
            
            # Get bot's own user info
            me = await self.client.get_me()
            print(f"✅ Bot username: @{me.username}")
            
            # Check if bot is a member and get its permissions
            try:
                member = await self.client.get_chat_member(self.channel_id, me.id)
                print(f"✅ Bot status in channel: {member.status}")
                
                # Check if bot is admin or creator
                if member.status not in ["administrator", "creator"]:
                    print(f"❌ Bot is not an admin! Current status: {member.status}")
                    print("   Please make the bot an administrator in the channel")
                    return False
                
                # Check specific permissions if available
                if hasattr(member, 'privileges') and member.privileges:
                    print(f"✅ Bot has admin privileges")
                    if hasattr(member.privileges, 'can_post_messages'):
                        print(f"   - Can post messages: {member.privileges.can_post_messages}")
                    if hasattr(member.privileges, 'can_edit_messages'):
                        print(f"   - Can edit messages: {member.privileges.can_edit_messages}")
                    if hasattr(member.privileges, 'can_delete_messages'):
                        print(f"   - Can delete messages: {member.privileges.can_delete_messages}")
                
                print("✅ Bot has admin permissions in the channel!")
                return True
                
            except Exception as e:
                print(f"❌ Error checking bot membership: {e}")
                print("   Make sure the bot is added to the channel as an admin")
                return False
                
        except ChannelInvalid:
            print(f"❌ Invalid channel ID: {self.channel_id}")
            print("   Possible issues:")
            print("   1. Bot is not added to the channel")
            print("   2. Channel ID is incorrect")
            print("   3. Channel is private and bot doesn't have access")
            return False
        except ValueError as e:
            if "Peer id invalid" in str(e) or "PEER_ID_INVALID" in str(e):
                print(f"❌ PEER_ID_INVALID: Bot doesn't recognize the channel yet")
                print(f"\n🔧 QUICK FIX:")
                print(f"   1. Open Telegram → Go to your channel")
                print(f"   2. Forward ANY message from the channel to your bot")
                print(f"   3. This will make the bot 'meet' the channel")
                print(f"   4. Restart this application")
                print(f"\n   OR make your channel public and use @username instead of ID")
                print(f"\n   See MANUAL_FIX_INSTRUCTIONS.md for detailed steps")
            else:
                print(f"❌ Error verifying bot permissions: {e}")
                print(f"   Error type: {type(e).__name__}")
            return False
        except Exception as e:
            error_str = str(e)
            if "PEER_ID_INVALID" in error_str or "Peer id invalid" in error_str:
                print(f"❌ PEER_ID_INVALID: Bot doesn't recognize the channel yet")
                print(f"\n🔧 QUICK FIX:")
                print(f"   1. Open Telegram → Go to your channel")
                print(f"   2. Forward ANY message from the channel to your bot")
                print(f"   3. This will make the bot 'meet' the channel")
                print(f"   4. Restart this application")
                print(f"\n   OR make your channel public and use @username instead of ID")
                print(f"\n   See MANUAL_FIX_INSTRUCTIONS.md for detailed steps")
            else:
                print(f"❌ Error verifying bot permissions: {e}")
                print(f"   Error type: {type(e).__name__}")
            return False
    
    def _parse_movie_caption(self, message: Message) -> Optional[Dict]:
        """
        Parse movie metadata from Telegram message caption
        
        Expected format:
        Title: Movie Name
        Year: 2024
        Genre: Action, Thriller
        Rating: 8.5
        Description: Movie description here...
        """
        if not message.caption and not message.text:
            # Fallback to filename if no caption
            if message.video:
                return {
                    'title': message.video.file_name or 'Untitled',
                    'year': 'Unknown',
                    'genre': ['Uncategorized'],
                    'rating': 'N/A',
                    'description': 'No description available',
                    'duration': message.video.duration or 0
                }
            return None
        
        caption = message.caption or message.text
        lines = caption.strip().split('\n')
        
        movie_data = {
            'title': 'Untitled',
            'year': 'Unknown',
            'genre': ['Uncategorized'],
            'rating': 'N/A',
            'description': '',
            'duration': 0
        }
        
        description_lines = []
        parsing_description = False
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            if ':' in line and not parsing_description:
                key, value = line.split(':', 1)
                key = key.strip().lower()
                value = value.strip()
                
                if key == 'title':
                    movie_data['title'] = value
                elif key == 'year':
                    movie_data['year'] = value
                elif key == 'genre':
                    # Split genres by comma and clean
                    movie_data['genre'] = [g.strip() for g in value.split(',')]
                elif key == 'rating':
                    movie_data['rating'] = value
                elif key == 'description':
                    description_lines.append(value)
                    parsing_description = True
            else:
                # Continuation of description
                description_lines.append(line)
        
        movie_data['description'] = ' '.join(description_lines)
        
        # Get video duration if available
        if message.video:
            movie_data['duration'] = message.video.duration or 0
            if movie_data['title'] == 'Untitled':
                movie_data['title'] = message.video.file_name or 'Untitled'
        
        return movie_data
    
    async def fetch_movies_from_channel(self) -> List[Dict]:
        """Fetch all movies from the Telegram channel"""
        if not self.client:
            print("❌ Telegram client not initialized")
            return []
        
        # First verify bot has admin permissions
        print("🔍 Verifying channel access...")
        has_permissions = await self.verify_bot_admin_permissions()
        
        if not has_permissions:
            if config.AUTH_METHOD == 'user':
                print("\n" + "="*60)
                print("❌ CHANNEL ACCESS ERROR")
                print("="*60)
                print("Your user account doesn't have access to the channel.")
                print("\n📋 How to fix:")
                print("   1. Open Telegram on your phone/desktop")
                print("   2. Search for the channel or click the channel link")
                print("   3. Join the channel")
                print("   4. Wait a few seconds for sync")
                print("   5. Restart this application")
                print("\n💡 Verify your settings:")
                print(f"   TELEGRAM_CHANNEL_ID = {config.CHANNEL_ID}")
                print(f"   TELEGRAM_AUTH_METHOD = {config.AUTH_METHOD}")
                print(f"   TELEGRAM_PHONE_NUMBER = {config.PHONE_NUMBER}")
                print("="*60 + "\n")
            else:
                print("\n" + "="*60)
                print("❌ BOT PERMISSION ERROR")
                print("="*60)
                print("Your bot doesn't have admin permissions in the channel.")
                print("\n📋 How to fix:")
                print("   1. Open your Telegram channel")
                print("   2. Go to channel info → Administrators")
                print("   3. Click 'Add Administrator'")
                print("   4. Search for your bot and add it")
                print("   5. Enable these permissions:")
                print("      ✓ Post Messages")
                print("      ✓ Edit Messages")
                print("      ✓ Delete Messages")
                print("   6. Save and restart this application")
                print("\n💡 Alternative: Use 'user' mode instead of 'bot' mode")
                print("   Set TELEGRAM_AUTH_METHOD=user in your .env file")
                print("="*60 + "\n")
            return []
        
        movies = []
        
        try:
            print(f"📡 Fetching movies from channel: {self.channel_id}")
            
            async for message in self.client.get_chat_history(self.channel_id):
                # Only process messages with video
                if message.video:
                    movie_data = self._parse_movie_caption(message)
                    
                    if movie_data:
                        movie_data.update({
                            'message_id': message.id,
                            'file_id': message.video.file_id,
                            'file_size': message.video.file_size,
                            'thumbnail': None,  # Will be handled separately
                            'added_date': message.date.isoformat() if message.date else None
                        })
                        
                        # Get thumbnail if available
                        if message.video.thumbs:
                            movie_data['thumbnail'] = message.video.thumbs[0].file_id
                        
                        movies.append(movie_data)
                        print(f"   ✓ Found: {movie_data['title']}")
                
                # Respect Telegram rate limits
                await asyncio.sleep(0.1)
            
            print(f"✅ Fetched {len(movies)} movies from Telegram")
            return movies
        
        except ChannelInvalid:
            print(f"❌ Invalid channel ID: {self.channel_id}")
            print("   Make sure the bot is added to the channel as admin")
            return []
        except FloodWait as e:
            print(f"⚠️  Rate limited by Telegram. Wait {e.value} seconds")
            await asyncio.sleep(e.value)
            return await self.fetch_movies_from_channel()
        except ValueError as e:
            error_msg = str(e)
            if "Peer id invalid" in error_msg or "PEER_ID_INVALID" in error_msg:
                print("\n" + "="*60)
                print("❌ PEER_ID_INVALID ERROR")
                print("="*60)
                print("The bot/user doesn't recognize the channel yet.")
                print("\n🔧 QUICK FIX (for bot mode):")
                print("   1. Open Telegram")
                print("   2. Go to your channel")
                print("   3. Forward ANY message from the channel to your bot")
                print("   4. This makes the bot 'meet' the channel")
                print("   5. Restart the application")
                print("\n🔧 ALTERNATIVE FIX:")
                print("   Use the channel username instead of ID:")
                print("   TELEGRAM_CHANNEL_ID=@your_channel_username")
                print("="*60 + "\n")
            else:
                print(f"❌ Error fetching movies: {e}")
            return []
        except Exception as e:
            error_msg = str(e)
            error_type = type(e).__name__
            
            # Check for asyncio event loop errors
            if "attached to a different event loop" in error_msg or "Event loop" in error_msg:
                print("\n" + "="*60)
                print("❌ ASYNCIO EVENT LOOP ERROR")
                print("="*60)
                print("An asyncio conflict occurred. This has been fixed.")
                print("\n💡 This error should not happen anymore.")
                print("   If it persists, please restart the application.")
                print("="*60 + "\n")
            else:
                print(f"❌ Error fetching movies: {error_type}: {error_msg}")
            
            return []
    
    def save_cache(self, movies: List[Dict]):
        """Save movies to JSON cache"""
        try:
            cache_data = {
                'last_updated': datetime.now().isoformat(),
                'total_movies': len(movies),
                'movies': movies
            }
            
            with open(self.cache_file, 'w', encoding='utf-8') as f:
                json.dump(cache_data, f, indent=2, ensure_ascii=False)
            
            print(f"💾 Cache saved: {len(movies)} movies")
        except Exception as e:
            print(f"❌ Error saving cache: {e}")
    
    def load_cache(self) -> Optional[Dict]:
        """Load movies from JSON cache"""
        try:
            if not os.path.exists(self.cache_file):
                print("⚠️  Cache file not found, will fetch from Telegram")
                return None
            
            # Check if file is empty
            if os.path.getsize(self.cache_file) == 0:
                print("⚠️  Cache file is empty, will fetch from Telegram")
                return None
            
            with open(self.cache_file, 'r', encoding='utf-8') as f:
                cache_data = json.load(f)
            
            # Validate cache structure
            if not isinstance(cache_data, dict) or 'movies' not in cache_data:
                print("⚠️  Invalid cache format, will fetch from Telegram")
                return None
            
            # Check if cache is expired
            if 'last_updated' in cache_data:
                last_updated = datetime.fromisoformat(cache_data['last_updated'])
                expiry_time = timedelta(hours=config.CACHE_EXPIRY_HOURS)
                
                if datetime.now() - last_updated > expiry_time:
                    print("⚠️  Cache expired, will refresh from Telegram")
                    return None
            
            print(f"✅ Loaded {cache_data.get('total_movies', 0)} movies from cache")
            return cache_data
        except json.JSONDecodeError as e:
            print(f"❌ Cache file corrupted: {e}, will fetch from Telegram")
            return None
        except Exception as e:
            print(f"❌ Error loading cache: {e}, will fetch from Telegram")
            return None
    
    async def get_movies(self, force_refresh: bool = False) -> List[Dict]:
        """
        Get movies from cache or fetch from Telegram
        
        Args:
            force_refresh: Force fetch from Telegram even if cache exists
        """
        # Check if client is initialized
        if not self.client:
            print("⚠️  Telegram client not initialized, attempting to start...")
            await self.start()
        
        if not force_refresh:
            cache_data = self.load_cache()
            if cache_data:
                return cache_data['movies']
        
        # Fetch from Telegram
        print(f"📥 Fetching movies from Telegram (force_refresh={force_refresh})...")
        movies = await self.fetch_movies_from_channel()
        
        if movies:
            self.save_cache(movies)
        else:
            print("⚠️  No movies fetched from Telegram")
            # Try to return cached data even if expired as fallback
            cache_data = self.load_cache()
            if cache_data:
                print("ℹ️  Returning expired cache as fallback")
                return cache_data['movies']
        
        return movies
    
    async def get_movie_by_id(self, message_id: int) -> Optional[Dict]:
        """Get a specific movie by its message ID"""
        movies = await self.get_movies()
        
        for movie in movies:
            if movie['message_id'] == message_id:
                return movie
        
        return None
    
    async def download_thumbnail(self, file_id: str, save_path: str) -> bool:
        """Download thumbnail from Telegram"""
        try:
            if not self.client:
                return False
            
            await self.client.download_media(file_id, file_name=save_path)
            return True
        except Exception as e:
            print(f"❌ Error downloading thumbnail: {e}")
            return False
    
    async def get_file_stream(self, file_id: str):
        """
        Get file stream for video streaming
        Returns an async generator that yields chunks
        """
        try:
            if not self.client:
                raise Exception("Telegram client not initialized")
            
            # Use Pyrogram's iter_download method for chunked streaming
            async for chunk in self.client.stream_media(file_id, limit=config.CHUNK_SIZE):
                yield chunk
        
        except Exception as e:
            print(f"❌ Error streaming file: {e}")
            raise


# Global client instance
telegram_client = TelegramMovieClient()


async def init_telegram():
    """Initialize Telegram client - call this at app startup"""
    success = await telegram_client.start()
    if success:
        # Verify access to channel
        if config.AUTH_METHOD == 'user':
            print("\n🔐 Verifying user access to channel...")
        else:
            print("\n🔐 Verifying bot permissions in channel...")
            
        has_permissions = await telegram_client.verify_bot_admin_permissions()
        
        if has_permissions:
            # Fetch initial movie list
            print("\n📥 Fetching movies from channel...")
            await telegram_client.get_movies(force_refresh=True)
        else:
            if config.AUTH_METHOD == 'user':
                print("\n⚠️  User doesn't have access to channel!")
                print("   Please join the channel with your Telegram account and restart.")
            else:
                print("\n⚠️  Bot doesn't have proper permissions!")
                print("   Please add the bot as admin in your channel and restart.")
    return success


async def cleanup_telegram():
    """Cleanup Telegram client - call this at app shutdown"""
    await telegram_client.stop()
