# 📺 Telegram Setup Guide for MyFlix

Complete guide to setting up Telegram for use with MyFlix streaming platform.

---

## 📋 Overview

MyFlix uses Telegram as cloud storage for your movies. This guide will walk you through:

1. Creating Telegram API credentials
2. Creating a Telegram bot
3. Setting up a channel
4. Properly formatting movie uploads

---

## 🔑 Step 1: Get Telegram API Credentials

### 1.1 Visit Telegram's API Development Tools

Go to: **[https://my.telegram.org/apps](https://my.telegram.org/apps)**

### 1.2 Log In

- Enter your phone number (with country code, e.g., +1234567890)
- You'll receive a verification code via Telegram
- Enter the code

### 1.3 Create an Application

If you don't have an app yet:

- Click on **"API development tools"**
- Fill in the form:
  ```
  App title: MyFlix Streaming
  Short name: myflix
  Platform: Other
  Description: Personal streaming platform
  ```
- Click **"Create application"**

### 1.4 Save Your Credentials

You'll see two important values:

```
api_id: 1234567
api_hash: 1234567890abcdef1234567890abcdef
```

⚠️ **IMPORTANT:** Keep these credentials secret! Never share them or commit to Git.

---

## 🤖 Step 2: Create a Telegram Bot

### 2.1 Open BotFather

In Telegram, search for: **[@BotFather](https://t.me/BotFather)**

Or open: `https://t.me/BotFather`

### 2.2 Create New Bot

Send this command:
```
/newbot
```

### 2.3 Follow the Instructions

**BotFather will ask:**

1. **"Alright, a new bot. How are we going to call it?"**
   - Enter a display name: `MyFlix Bot`

2. **"Good. Now let's choose a username for your bot."**
   - Must end with 'bot'
   - Must be unique
   - Example: `myflix_streaming_bot`

### 2.4 Save Your Bot Token

You'll receive a message like:

```
Done! Congratulations on your new bot. You will find it at 
t.me/myflix_streaming_bot. You can now add a description...

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567

Keep your token secure and store it safely, it can be used by 
anyone to control your bot.
```

Copy the token: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567`

### 2.5 Optional: Customize Your Bot

You can customize your bot with these commands:

```
/setdescription - Set bot description
/setabouttext - Set about text
/setuserpic - Set bot profile picture
/setcommands - Set bot commands
```

Example commands to set:
```
/setcommands

search - Search for movies
help - Show help message
start - Start the bot
```

---

## 📢 Step 3: Create a Telegram Channel

### 3.1 Create the Channel

1. Open Telegram
2. Click on **Menu** (☰) → **New Channel**
3. Enter channel details:
   ```
   Channel Name: MyFlix Movies
   Description: Personal movie collection
   ```
4. Choose **Private** (recommended for personal use)
   - Or **Public** if you want to share with others

### 3.2 Get Channel Username or ID

#### Option A: Public Channel (Easier)

If you made it public:
1. Set a username: `@myflix_movies`
2. This is your `CHANNEL_ID`: `@myflix_movies`

#### Option B: Private Channel (More Secure)

For private channels, you need the numeric ID:

1. Add your bot to the channel (next step)
2. Send a test message to the channel
3. Use this bot to get the ID: [@getidsbot](https://t.me/getidsbot)
4. Forward the test message to `@getidsbot`
5. It will reply with the channel ID: `-1001234567890`
6. This is your `CHANNEL_ID`: `-1001234567890`

### 3.3 Add Bot as Administrator

1. Open your channel
2. Click on channel name → **Administrators**
3. Click **Add Administrator**
4. Search for your bot: `@myflix_streaming_bot`
5. Give it these permissions:
   - ✅ **Post Messages** (required)
   - ✅ **Edit Messages** (optional)
   - ✅ **Delete Messages** (optional)
6. Click **Save**

⚠️ **CRITICAL:** Bot must be admin to access channel messages!

---

## 🎬 Step 4: Upload Movies to Channel

### 4.1 Movie Caption Format

For best results, use this caption format when uploading videos:

```
Title: Inception
Year: 2010
Genre: Sci-Fi, Thriller, Action
Rating: 8.8
Description: A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
```

### 4.2 Field Descriptions

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| Title | ✅ | Text | `Title: The Dark Knight` |
| Year | ✅ | YYYY | `Year: 2008` |
| Genre | ✅ | Comma-separated | `Genre: Action, Crime, Drama` |
| Rating | Optional | Number/Text | `Rating: 9.0` or `Rating: PG-13` |
| Description | Optional | Multi-line text | `Description: When the menace...` |

### 4.3 Example Uploads

#### Example 1: Action Movie
```
Title: John Wick
Year: 2014
Genre: Action, Thriller
Rating: 7.4
Description: An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.
```

#### Example 2: Series
```
Title: Breaking Bad - Season 1
Year: 2008
Genre: Crime, Drama, Thriller
Rating: 9.5
Description: A high school chemistry teacher diagnosed with cancer turns to cooking meth to provide for his family.
```

#### Example 3: Anime
```
Title: Spirited Away
Year: 2001
Genre: Animation, Adventure, Fantasy
Rating: 8.6
Description: During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.
```

### 4.4 Supported Video Formats

Telegram supports:
- ✅ MP4 (recommended)
- ✅ MKV
- ✅ AVI
- ✅ MOV
- ✅ WebM

**File size limits:**
- Regular account: Up to **2GB** per file
- Telegram Premium: Up to **4GB** per file

### 4.5 Tips for Best Quality

1. **Use H.264 codec** for best compatibility
2. **720p or 1080p** resolution recommended
3. **Add thumbnails** to videos (Telegram auto-generates, but custom is better)
4. **Compress large files** if needed:
   ```bash
   ffmpeg -i input.mkv -c:v libx264 -crf 23 -c:a aac output.mp4
   ```

---

## ✅ Step 5: Verify Setup

### 5.1 Checklist

Before running MyFlix, verify:

- [ ] Got API_ID from my.telegram.org
- [ ] Got API_HASH from my.telegram.org
- [ ] Created bot via @BotFather
- [ ] Got BOT_TOKEN from BotFather
- [ ] Created Telegram channel
- [ ] Added bot as administrator to channel
- [ ] Got channel ID/username
- [ ] Uploaded at least one test video with proper caption

### 5.2 Test Bot Access

Send this command to your bot:
```
/start
```

If bot responds, it's working!

### 5.3 Test Channel Access

1. Upload a video to your channel
2. Verify bot can see it (run MyFlix and check logs)

---

## 🔧 Step 6: Configure MyFlix

### 6.1 Edit `config.py`

```python
# Telegram API Configuration
API_ID = 1234567  # Your API ID
API_HASH = 'your_api_hash_here'  # Your API Hash
BOT_TOKEN = 'your_bot_token_here'  # Your Bot Token

# Channel Configuration
CHANNEL_ID = '@myflixchannel'  # Or numeric ID: -1001234567890
```

### 6.2 Or Use Environment Variables

Create `.env` file:
```bash
TELEGRAM_API_ID=1234567
TELEGRAM_API_HASH=your_api_hash_here
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHANNEL_ID=@myflixchannel
```

---

## 🚀 Step 7: Run MyFlix

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

You should see:
```
==================================================
🎬 MyFlix - Telegram Streaming Platform
==================================================
✅ Telegram client connected successfully
📡 Fetching movies from channel: @myflixchannel
   ✓ Found: Inception
   ✓ Found: The Dark Knight
✅ Fetched 2 movies from Telegram
💾 Cache saved: 2 movies
 * Running on http://0.0.0.0:5000
```

---

## 🎯 Advanced: Multiple Channels

To support multiple channels, modify `config.py`:

```python
CHANNEL_IDS = [
    '@myflix_movies',
    '@myflix_series',
    '-1001234567890'
]
```

Then update `telegram_client.py` to loop through channels.

---

## 🔒 Security Best Practices

### 1. Private vs Public Channels

**Private Channel (Recommended):**
- ✅ Only you and bot can access
- ✅ More secure
- ✅ Better for personal use
- ❌ Harder to share

**Public Channel:**
- ✅ Easy to share link
- ✅ Easy to get ID
- ❌ Anyone can view
- ❌ Risk of unauthorized access

### 2. Bot Token Security

- ❌ Never share bot token
- ❌ Never commit to Git
- ❌ Never post in public forums
- ✅ Use environment variables
- ✅ Add `.env` to `.gitignore`

### 3. API Credentials

- ❌ Never share API_ID or API_HASH
- ❌ Don't use same credentials for multiple public apps
- ✅ Keep them in secure config
- ✅ Regenerate if compromised

---

## 🐛 Troubleshooting

### Issue: "ChannelInvalid" Error

**Problem:** Bot can't access channel

**Solutions:**
1. Verify bot is administrator of channel
2. Check channel ID is correct (with @ or -100 prefix)
3. Ensure channel exists and bot hasn't been removed
4. Try using numeric ID instead of username

### Issue: "Flood Wait" Error

**Problem:** Too many API requests

**Solutions:**
1. Wait the specified time
2. Reduce refresh frequency
3. Increase `CACHE_EXPIRY_HOURS` in config

### Issue: No Movies Found

**Problem:** Bot sees 0 videos

**Solutions:**
1. Verify videos are uploaded to channel (not group)
2. Check bot has "Post Messages" permission
3. Try uploading new video with proper caption
4. Use `/api/refresh` to force cache update

### Issue: Can't Get Channel ID

**Problem:** Don't know numeric channel ID

**Solutions:**
1. Make channel public temporarily
2. Use [@getidsbot](https://t.me/getidsbot)
3. Forward any channel message to bot
4. Bot will reply with channel ID
5. Make channel private again

---

## 📚 Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Pyrogram Documentation](https://docs.pyrogram.org/)
- [BotFather Commands](https://core.telegram.org/bots#botfather)
- [Telegram API FAQ](https://core.telegram.org/api/faq)

---

## 📞 Need Help?

If you're stuck:

1. Check the troubleshooting section above
2. Review application logs for error messages
3. Open a GitHub issue with:
   - Error message
   - Steps you've taken
   - Platform/OS details
   - (Don't include any credentials!)

---

**Ready to stream! 🎬**

[← Back to Main README](README.md)
