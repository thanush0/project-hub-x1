# 🎬 MyFlix - Telegram Streaming Platform

A modern, Netflix-style streaming platform that uses **Telegram as cloud storage** for movies. Built with Flask and Pyrogram, this application allows you to stream videos directly from a Telegram channel with a beautiful, responsive interface.

![MyFlix](https://img.shields.io/badge/MyFlix-Streaming-red?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green?style=for-the-badge&logo=flask)
![Telegram](https://img.shields.io/badge/Telegram-Bot-blue?style=for-the-badge&logo=telegram)

---

## 📋 Table of Contents
- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Telegram Setup](#-telegram-setup)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)

---

## ✨ Features

### 🎥 **Streaming**
- Stream movies directly from Telegram channel
- Chunked video streaming with range request support
- Resume playback from last position
- Skip intro/outro buttons
- Keyboard shortcuts for playback control

### 🎨 **User Interface**
- Netflix-inspired dark theme
- Responsive design (mobile, tablet, desktop)
- Real-time search functionality
- Category-based browsing
- Smooth animations and transitions

### ⚡ **Performance**
- JSON-based caching system (24-hour expiry)
- Lazy loading for movie posters
- Rate limiting to prevent abuse
- Efficient Telegram API usage

### 🔒 **Security**
- Rate limiting on all routes
- Input validation
- Proxied video streaming (no direct file ID exposure)
- Secure configuration management

---

## 🏗️ Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP/HTTPS
       ↓
┌─────────────────────────────────────┐
│      Flask Web Application          │
│  ┌──────────┐      ┌─────────────┐ │
│  │  Routes  │ ←──→ │   Cache     │ │
│  │  (app.py)│      │  (JSON)     │ │
│  └────┬─────┘      └─────────────┘ │
│       │                             │
│       ↓                             │
│  ┌──────────────────────────┐      │
│  │   Telegram Client        │      │
│  │   (Pyrogram)             │      │
│  └──────────┬───────────────┘      │
└─────────────┼───────────────────────┘
              │ Bot API
              ↓
     ┌────────────────┐
     │  Telegram Bot  │
     │     API        │
     └────────┬───────┘
              │
              ↓
     ┌────────────────┐
     │   Telegram     │
     │   Channel      │
     │  (Video Files) │
     └────────────────┘
```

**Components:**
1. **Flask Backend** - Web server and API
2. **Pyrogram Client** - Telegram bot connection
3. **Cache Layer** - JSON-based metadata storage
4. **Streaming Proxy** - Chunked video delivery

---

## 📦 Prerequisites

- **Python 3.8+**
- **Telegram Account**
- **Telegram Bot Token**
- **Telegram API Credentials** (API ID & Hash)
- **Telegram Channel** (where videos are uploaded)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/MyFlix.git
cd MyFlix
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Create Required Directories
```bash
mkdir cache temp_downloads static/thumbnails
```

---

## ⚙️ Configuration

### 1. Get Telegram API Credentials

1. Visit [https://my.telegram.org/apps](https://my.telegram.org/apps)
2. Log in with your phone number
3. Create a new application
4. Copy your `API_ID` and `API_HASH`

### 2. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the **Bot Token** provided

### 3. Create a Telegram Channel

1. Create a new Telegram channel
2. Add your bot as an **administrator** with "Post Messages" permission
3. Get the channel username (e.g., `@myflixchannel`) or ID

### 4. Configure `config.py`

Edit the `config.py` file with your credentials:

```python
# Telegram API Configuration
API_ID = 'YOUR_API_ID'  # From my.telegram.org
API_HASH = 'YOUR_API_HASH'  # From my.telegram.org
BOT_TOKEN = 'YOUR_BOT_TOKEN'  # From @BotFather

# Channel Configuration
CHANNEL_ID = '@myflixchannel'  # Your channel username or ID
```

**Or use environment variables:**

```bash
# Create .env file
echo "TELEGRAM_API_ID=YOUR_API_ID" >> .env
echo "TELEGRAM_API_HASH=YOUR_API_HASH" >> .env
echo "TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN" >> .env
echo "TELEGRAM_CHANNEL_ID=@myflixchannel" >> .env
```

---

## 📺 Telegram Setup

### Uploading Movies to Channel

For the app to properly parse movie metadata, upload videos with captions in this format:

```
Title: Inception
Year: 2010
Genre: Sci-Fi, Thriller, Action
Rating: 8.8
Description: A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
```

**Example:**
```
Title: The Dark Knight
Year: 2008
Genre: Action, Crime, Drama
Rating: 9.0
Description: When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.
```

### Caption Format Rules:
- Each field should be on a new line
- Use `Field: Value` format
- `Genre` can have multiple values separated by commas
- `Description` can span multiple lines

### Fallback:
If no caption is provided, the app will use:
- **Title:** Filename
- **Year:** Unknown
- **Genre:** Uncategorized
- **Description:** No description available

---

## 🎮 Usage

### Running the Application

```bash
python app.py
```

The app will start on `http://localhost:5000`

### First Run

On first launch, the application will:
1. Connect to Telegram
2. Fetch all videos from your channel
3. Parse metadata from captions
4. Cache the movie list

This may take a few minutes depending on the number of videos.

### Accessing the Platform

Open your browser and navigate to:
```
http://localhost:5000
```

### Features to Try:

1. **Browse Movies** - Scroll through genre-based rows
2. **Search** - Click the search icon or press `/` key
3. **Watch** - Click any movie to start streaming
4. **Resume** - Playback resumes from where you left off
5. **Keyboard Shortcuts:**
   - `Space` or `K` - Play/Pause
   - `F` - Fullscreen
   - `←` - Rewind 10s
   - `→` - Forward 10s
   - `↑` - Volume up
   - `↓` - Volume down
   - `M` - Mute

---

## 🌐 Deployment

### Option 1: Render.com (Free Tier)

1. Create account at [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Environment Variables:** Add all from `config.py`
5. Deploy!

### Option 2: Hugging Face Spaces

1. Create account at [Hugging Face](https://huggingface.co)
2. Create new Space
3. Choose "Gradio" or "Streamlit" SDK (or custom)
4. Push your code
5. Add secrets in Space settings

### Option 3: Railway.app

1. Visit [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Deploy!

### Option 4: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create myflix-app

# Add environment variables
heroku config:set TELEGRAM_API_ID=your_id
heroku config:set TELEGRAM_API_HASH=your_hash
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHANNEL_ID=@yourchannel

# Deploy
git push heroku main
```

### Environment Variables for Deployment:
```
TELEGRAM_API_ID=your_api_id
TELEGRAM_API_HASH=your_api_hash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@yourchannel
SECRET_KEY=your_random_secret_key
DEBUG=False
PORT=5000
```

---

## 🔌 API Endpoints

### GET `/`
Home page with all movies grouped by genre

### GET `/watch/<message_id>`
Video player page for specific movie

### GET `/category/<genre>`
Movies filtered by genre

### GET `/stream/<message_id>`
Video streaming endpoint (supports range requests)

### GET `/api/movies`
**Response:**
```json
{
  "success": true,
  "total": 42,
  "movies": [...]
}
```

### GET `/api/movies/<message_id>`
Get specific movie details

### GET `/api/search?q=<query>`
**Response:**
```json
{
  "success": true,
  "query": "inception",
  "total": 1,
  "results": [...]
}
```

### GET `/api/refresh`
Force refresh cache from Telegram (rate limited to 2 req/min)

---

## 🔮 Future Enhancements

### Short-term (v1.1)
- [ ] User authentication system
- [ ] Watch history tracking
- [ ] Favorites/Watchlist
- [ ] Rating system
- [ ] Comments section
- [ ] Subtitle support (.srt files from Telegram)

### Medium-term (v1.5)
- [ ] Multiple channel support
- [ ] Admin dashboard
- [ ] Automatic thumbnail generation
- [ ] Video quality selection
- [ ] Download functionality
- [ ] Series/Episode management

### Long-term (v2.0)
- [ ] User profiles with preferences
- [ ] Recommendation engine
- [ ] Social features (share, discuss)
- [ ] Mobile apps (React Native)
- [ ] Chromecast support
- [ ] Offline viewing (PWA)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is for **educational purposes only**. 

**Important:**
- Do not use this to distribute copyrighted content
- Respect content creators' rights
- Use only for personal, legal content
- Check local laws regarding streaming services

---

## ⚠️ Disclaimer

This application is designed for personal use with legally owned content. The developers are not responsible for any misuse of this software. Users are responsible for ensuring they have the rights to stream any content they upload to their Telegram channels.

---

## 🐛 Troubleshooting

### Bot Can't Access Channel
- Ensure bot is added as admin to the channel
- Check channel ID/username is correct
- Verify bot has "Post Messages" permission

### Videos Won't Stream
- Check Telegram API limits (not rate-limited)
- Ensure video file size is within Telegram limits (2GB)
- Verify bot session is active

### Cache Not Updating
- Click "Refresh Cache" in footer
- Delete `cache/movies.json` and restart
- Check Telegram API credentials

### Port Already in Use
```bash
# Change port in config.py
PORT = 5001  # Use different port
```

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/MyFlix/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/MyFlix/discussions)
- **Email:** support@myflix.example.com

---

## 🙏 Acknowledgments

- [Flask](https://flask.palletsprojects.com/) - Web framework
- [Pyrogram](https://docs.pyrogram.org/) - Telegram MTProto API
- [Telegram](https://telegram.org/) - Cloud storage platform
- Netflix - UI/UX inspiration

---

<div align="center">

Made with ❤️ for movie enthusiasts

**[⬆ Back to Top](#-myflix---telegram-streaming-platform)**

</div>
