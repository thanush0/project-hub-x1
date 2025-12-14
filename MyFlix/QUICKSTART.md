# ⚡ MyFlix Quick Start Guide

Get MyFlix up and running in **under 15 minutes**!

---

## 🎯 What You'll Need

- ✅ Python 3.8+ installed
- ✅ Telegram account
- ✅ 15 minutes of your time

---

## 🚀 Step-by-Step Setup

### Step 1: Get Telegram Credentials (5 minutes)

#### 1.1 Get API Credentials
1. Visit: https://my.telegram.org/apps
2. Login with your phone number
3. Create new application
4. Copy `api_id` and `api_hash`

#### 1.2 Create Bot
1. Open Telegram, search for `@BotFather`
2. Send `/newbot`
3. Choose name: `MyFlix Bot`
4. Choose username: `myflix_yourname_bot`
5. Copy the bot token

#### 1.3 Create Channel
1. In Telegram: Menu → New Channel
2. Name: `MyFlix Movies`
3. Make it Private (recommended)
4. Add your bot as administrator
5. Give "Post Messages" permission
6. Copy channel username (e.g., `@myflixmovies`)

---

### Step 2: Install MyFlix (3 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/MyFlix.git
cd MyFlix

# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

### Step 3: Configure (2 minutes)

#### Option A: Edit config.py (Simple)
Open `config.py` and replace:

```python
API_ID = 1234567  # Your API ID
API_HASH = 'your_api_hash_here'
BOT_TOKEN = 'your_bot_token_here'
CHANNEL_ID = '@yourchannelname'
```

#### Option B: Use .env file (Recommended)
```bash
# Copy example file
cp .env.example .env

# Edit .env
# Add your credentials
```

---

### Step 4: Upload Test Movie (3 minutes)

1. Open your Telegram channel
2. Upload a video file (MP4 recommended)
3. Add this caption:

```
Title: Test Movie
Year: 2024
Genre: Action
Rating: 8.0
Description: This is a test movie to verify MyFlix is working correctly.
```

4. Send the message

---

### Step 5: Run MyFlix (1 minute)

```bash
python app.py
```

You should see:
```
==================================================
🎬 MyFlix - Telegram Streaming Platform
==================================================
✅ Telegram client connected successfully
📡 Fetching movies from channel: @yourchannelname
   ✓ Found: Test Movie
✅ Fetched 1 movies from Telegram
💾 Cache saved: 1 movies
 * Running on http://0.0.0.0:5000
```

---

### Step 6: Test It! (1 minute)

1. Open browser: http://localhost:5000
2. You should see your test movie
3. Click to play
4. Enjoy! 🎉

---

## ✅ Verification Checklist

- [ ] Application starts without errors
- [ ] Home page shows your test movie
- [ ] Can click on the movie card
- [ ] Video player page loads
- [ ] Video starts playing
- [ ] Can seek through video
- [ ] Search works (try searching for "test")

---

## 🐛 Common Issues & Quick Fixes

### Issue: "ChannelInvalid" error
**Fix:** 
- Make sure bot is admin of the channel
- Check channel ID is correct (starts with @ or -100)

### Issue: "No movies found"
**Fix:**
- Verify video is uploaded to channel (not chat/group)
- Check bot has "Post Messages" permission
- Wait 30 seconds and refresh cache (footer link)

### Issue: "API_ID is not set"
**Fix:**
- Open `config.py` and add your actual credentials
- Or create `.env` file with correct values

### Issue: Port 5000 already in use
**Fix:**
```bash
# Change port in config.py
PORT = 5001
```

### Issue: Video won't play
**Fix:**
- Check video format (MP4 works best)
- Ensure file size under 2GB
- Try different browser

---

## 📚 Next Steps

Once everything works:

### 1. Upload More Movies
Use the caption format from `EXAMPLE_CAPTION.txt`

### 2. Customize
- Edit `config.py` for settings
- Modify `static/css/style.css` for styling
- Update categories in `config.py`

### 3. Deploy to Production
See `DEPLOYMENT.md` for:
- Render.com (free)
- Railway.app (free $5 credit)
- Heroku
- And more!

### 4. Explore Features
- Real-time search
- Category filtering
- Resume playback
- Keyboard shortcuts (Space, F, arrows)
- Cache refresh

---

## 🎓 Learn More

- **Full Documentation:** `README.md`
- **Telegram Setup Details:** `TELEGRAM_SETUP.md`
- **Deployment Guide:** `DEPLOYMENT.md`
- **Caption Examples:** `EXAMPLE_CAPTION.txt`

---

## 💡 Pro Tips

### Tip 1: Better Video Quality
Use H.264 codec and 1080p for best compatibility:
```bash
ffmpeg -i input.mkv -c:v libx264 -crf 23 -preset medium output.mp4
```

### Tip 2: Batch Upload
Create a Python script to upload multiple videos:
```python
# upload_movies.py
from pyrogram import Client

api_id = YOUR_API_ID
api_hash = "YOUR_API_HASH"
bot_token = "YOUR_BOT_TOKEN"
channel = "@yourchannel"

app = Client("uploader", api_id, api_hash, bot_token=bot_token)

with app:
    app.send_video(
        channel,
        "movie.mp4",
        caption="Title: Movie\nYear: 2024\nGenre: Action"
    )
```

### Tip 3: Auto-Refresh Cache
Set up a cron job:
```bash
# Refresh cache every 6 hours
0 */6 * * * curl http://localhost:5000/api/refresh
```

### Tip 4: Custom Domain
After deploying, add a custom domain:
- Render.com: Free custom domain support
- Railway.app: Easy custom domain setup
- Use Cloudflare for free SSL

---

## 🎉 You're All Set!

Congratulations! You now have a working Netflix-style streaming platform powered by Telegram.

**Enjoy your movies! 🍿**

---

## 📞 Need Help?

- **Documentation:** Check `README.md` first
- **Telegram Issues:** See `TELEGRAM_SETUP.md`
- **GitHub Issues:** Report bugs or ask questions
- **Community:** Join discussions on GitHub

---

**Happy Streaming! 🎬**

[← Back to Main README](README.md) | [View Full Documentation →](README.md)
