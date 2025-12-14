"""
Configuration file for MyFlix Telegram Streaming Platform
Store your API credentials here or use environment variables
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# ================================
# TELEGRAM API CONFIGURATION
# ================================
# Get these from https://my.telegram.org/apps
API_ID = os.environ.get('TELEGRAM_API_ID', 'YOUR_API_ID')
API_HASH = os.environ.get('TELEGRAM_API_HASH', 'YOUR_API_HASH')

# Authentication Method: Choose 'bot' or 'user'
# 'bot' - Use bot token (requires bot to be admin in channel)
# 'user' - Use your personal account (recommended for private channels)
AUTH_METHOD = os.environ.get('TELEGRAM_AUTH_METHOD', 'user')

# Bot Token (only needed if AUTH_METHOD = 'bot')
BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', 'YOUR_BOT_TOKEN')

# Phone Number (only needed if AUTH_METHOD = 'user')
# Format: +1234567890 (include country code)
PHONE_NUMBER = os.environ.get('TELEGRAM_PHONE_NUMBER', 'YOUR_PHONE_NUMBER')

# Telegram Channel Configuration
# Use channel username (e.g., '@myflixchannel') or channel ID (e.g., -1001234567890)
CHANNEL_ID = os.environ.get('TELEGRAM_CHANNEL_ID', '@myflixchannel')

# ================================
# FLASK CONFIGURATION
# ================================
SECRET_KEY = os.environ.get('SECRET_KEY', 'change-this-to-random-secret-key')
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
HOST = os.environ.get('HOST', '0.0.0.0')
PORT = int(os.environ.get('PORT', 5000))

# ================================
# CACHE CONFIGURATION
# ================================
CACHE_DIR = 'cache'
MOVIES_CACHE_FILE = os.path.join(CACHE_DIR, 'movies.json')
CACHE_EXPIRY_HOURS = 24  # Refresh cache every 24 hours

# ================================
# STREAMING CONFIGURATION
# ================================
CHUNK_SIZE = 1024 * 1024  # 1MB chunks for streaming
TEMP_DOWNLOAD_DIR = 'temp_downloads'
MAX_TEMP_FILE_AGE = 3600  # Delete temp files older than 1 hour

# ================================
# RATE LIMITING
# ================================
RATE_LIMIT_ENABLED = True
MAX_REQUESTS_PER_MINUTE = 30

# ================================
# CATEGORIES
# ================================
# These should match the categories used in Telegram captions
CATEGORIES = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Animation',
    'Documentary',
    'Series'
]

# ================================
# VALIDATION
# ================================
def validate_config():
    """Validate that required configuration is set"""
    errors = []
    
    if API_ID == 'YOUR_API_ID':
        errors.append("TELEGRAM_API_ID is not set")
    
    if API_HASH == 'YOUR_API_HASH':
        errors.append("TELEGRAM_API_HASH is not set")
    
    if AUTH_METHOD not in ['bot', 'user']:
        errors.append(f"TELEGRAM_AUTH_METHOD must be 'bot' or 'user', got '{AUTH_METHOD}'")
    
    if AUTH_METHOD == 'bot' and BOT_TOKEN == 'YOUR_BOT_TOKEN':
        errors.append("TELEGRAM_BOT_TOKEN is not set (required for bot mode)")
    
    if AUTH_METHOD == 'user' and PHONE_NUMBER == 'YOUR_PHONE_NUMBER':
        errors.append("TELEGRAM_PHONE_NUMBER is not set (required for user mode)")
    
    if CHANNEL_ID == '@myflixchannel':
        errors.append("TELEGRAM_CHANNEL_ID is not set")
    
    if errors:
        print("\n⚠️  Configuration Errors:")
        for error in errors:
            print(f"   - {error}")
        print("\nPlease update config.py or set environment variables.\n")
        return False
    
    return True
