# 🚀 Deployment Guide for MyFlix

Complete step-by-step deployment instructions for various platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ Telegram API credentials (API_ID, API_HASH)
- ✅ Telegram Bot Token
- ✅ Telegram Channel with bot added as admin
- ✅ At least one video uploaded to channel with proper caption
- ✅ Tested locally with `python app.py`

---

## 🌐 Platform-Specific Guides

### 1. Render.com (Recommended - Free Tier Available)

**Advantages:**
- Free tier with 750 hours/month
- Automatic HTTPS
- Easy GitHub integration
- Persistent storage

**Steps:**

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or select "Deploy from Git URL"

3. **Configure Build Settings**
   ```
   Name: myflix
   Environment: Python 3
   Branch: main
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app --bind 0.0.0.0:$PORT
   ```

4. **Add Environment Variables**
   Go to "Environment" tab and add:
   ```
   TELEGRAM_API_ID = your_api_id
   TELEGRAM_API_HASH = your_api_hash
   TELEGRAM_BOT_TOKEN = your_bot_token
   TELEGRAM_CHANNEL_ID = @yourchannel
   SECRET_KEY = generate_random_32_char_string
   DEBUG = False
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - Access via: `https://myflix-xxxx.onrender.com`

6. **Important Notes**
   - Free tier sleeps after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - Limited to 512MB RAM

---

### 2. Railway.app (Easy & Modern)

**Advantages:**
- $5 free credit monthly
- Fast deployments
- Good performance
- Simple dashboard

**Steps:**

1. **Setup**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"

2. **Deploy from GitHub**
   - Select "Deploy from GitHub repo"
   - Choose your MyFlix repository
   - Railway auto-detects Python

3. **Add Variables**
   - Go to "Variables" tab
   - Add all environment variables
   ```
   TELEGRAM_API_ID
   TELEGRAM_API_HASH
   TELEGRAM_BOT_TOKEN
   TELEGRAM_CHANNEL_ID
   SECRET_KEY
   PORT (Railway sets this automatically)
   ```

4. **Domain**
   - Railway provides a public URL automatically
   - Or add custom domain in "Settings"

---

### 3. Heroku (Traditional PaaS)

**Advantages:**
- Well-established platform
- Good documentation
- Many add-ons available

**Steps:**

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create myflix-app-unique-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set TELEGRAM_API_ID=your_id
   heroku config:set TELEGRAM_API_HASH=your_hash
   heroku config:set TELEGRAM_BOT_TOKEN=your_token
   heroku config:set TELEGRAM_CHANNEL_ID=@yourchannel
   heroku config:set SECRET_KEY=$(openssl rand -hex 32)
   heroku config:set DEBUG=False
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Ready for Heroku"
   git push heroku main
   ```

5. **Open App**
   ```bash
   heroku open
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

**Note:** Heroku free tier was discontinued. Minimum $5/month.

---

### 4. Hugging Face Spaces (AI/ML Community)

**Advantages:**
- Free hosting
- Great for demos
- Community visibility

**Steps:**

1. **Create Space**
   - Go to [huggingface.co/spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Choose "Gradio" or "Docker" SDK

2. **Upload Files**
   - Upload all project files
   - Or connect GitHub repository

3. **Create `app_gradio.py`** (Wrapper for Gradio)
   ```python
   import gradio as gr
   import subprocess
   import threading
   
   def start_flask():
       subprocess.run(["python", "app.py"])
   
   # Start Flask in background
   threading.Thread(target=start_flask, daemon=True).start()
   
   # Gradio interface (just redirects)
   demo = gr.Interface(
       fn=lambda: "MyFlix is running!",
       inputs=None,
       outputs="text",
       title="MyFlix Streaming Platform"
   )
   
   if __name__ == "__main__":
       demo.launch()
   ```

4. **Add Secrets**
   - Go to Settings → Repository secrets
   - Add all environment variables

---

### 5. Vercel (Next.js Optimized, Limited Python Support)

**Note:** Vercel is optimized for Node.js. For Python, use serverless functions.

Not recommended for this project due to streaming requirements.

---

### 6. DigitalOcean App Platform

**Advantages:**
- $5/month tier
- Droplet-like experience
- Good performance

**Steps:**

1. **Create App**
   - Go to [digitalocean.com](https://www.digitalocean.com)
   - Click "Create" → "Apps"
   - Connect GitHub

2. **Configure**
   ```
   Name: myflix
   Type: Web Service
   Build Command: pip install -r requirements.txt
   Run Command: gunicorn app:app
   ```

3. **Environment Variables**
   - Add all required variables in "Environment Variables" section

4. **Deploy**
   - Click "Create Resources"
   - Wait for deployment

---

### 7. PythonAnywhere (Python-Specific Hosting)

**Advantages:**
- Free tier available
- Python-focused
- Easy setup

**Steps:**

1. **Create Account**
   - Go to [pythonanywhere.com](https://www.pythonanywhere.com)
   - Sign up for free tier

2. **Upload Code**
   - Use "Files" tab to upload
   - Or clone from GitHub:
     ```bash
     git clone https://github.com/yourusername/MyFlix.git
     ```

3. **Create Virtual Environment**
   ```bash
   cd MyFlix
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Configure Web App**
   - Go to "Web" tab
   - Click "Add a new web app"
   - Choose "Manual configuration"
   - Python 3.10
   - Set source code: `/home/yourusername/MyFlix`
   - Set virtualenv: `/home/yourusername/MyFlix/venv`

5. **Edit WSGI File**
   ```python
   import sys
   path = '/home/yourusername/MyFlix'
   if path not in sys.path:
       sys.path.append(path)
   
   from app import app as application
   ```

6. **Set Environment Variables**
   - Edit `.env` file or set in WSGI file

7. **Reload**
   - Click "Reload" button

---

## 🔐 Security Best Practices

### 1. Environment Variables
**Never commit secrets to Git!**

```bash
# Check .gitignore includes:
.env
config.py (if storing secrets there)
*.session
```

### 2. Generate Strong Secret Key
```python
import secrets
print(secrets.token_hex(32))
```

### 3. HTTPS Only
Ensure your deployment platform provides HTTPS (all above do).

### 4. Rate Limiting
Keep rate limiting enabled in production:
```python
RATE_LIMIT_ENABLED = True
MAX_REQUESTS_PER_MINUTE = 30
```

---

## 🐳 Docker Deployment (Advanced)

### Dockerfile
Create `Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create necessary directories
RUN mkdir -p cache temp_downloads

# Expose port
EXPOSE 5000

# Run application
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--workers", "2"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  myflix:
    build: .
    ports:
      - "5000:5000"
    environment:
      - TELEGRAM_API_ID=${TELEGRAM_API_ID}
      - TELEGRAM_API_HASH=${TELEGRAM_API_HASH}
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_CHANNEL_ID=${TELEGRAM_CHANNEL_ID}
      - SECRET_KEY=${SECRET_KEY}
    volumes:
      - ./cache:/app/cache
      - ./temp_downloads:/app/temp_downloads
    restart: unless-stopped
```

### Deploy
```bash
docker-compose up -d
```

---

## 📊 Performance Optimization

### 1. Use Gunicorn Workers
```bash
gunicorn app:app --workers 4 --threads 2 --timeout 120
```

### 2. Enable Caching Headers
Add to `app.py`:
```python
@app.after_request
def add_cache_headers(response):
    response.headers['Cache-Control'] = 'public, max-age=3600'
    return response
```

### 3. Use CDN for Static Assets
Upload CSS/JS to CDN like Cloudflare or AWS CloudFront.

---

## 🔍 Monitoring & Logs

### Check Application Logs

**Render:**
```
Dashboard → Logs tab
```

**Railway:**
```
Deployments → View Logs
```

**Heroku:**
```bash
heroku logs --tail --app myflix-app
```

---

## ⚠️ Common Issues

### Issue 1: Application Won't Start
**Solution:** Check logs for Python errors. Ensure all environment variables are set.

### Issue 2: Videos Won't Stream
**Solution:** 
- Verify bot has admin access to channel
- Check Telegram API rate limits
- Ensure video files are under 2GB

### Issue 3: Cache Not Updating
**Solution:**
- Clear cache: Delete `cache/movies.json`
- Use `/api/refresh` endpoint
- Restart application

### Issue 4: Port Binding Error
**Solution:**
- Use `$PORT` environment variable (provided by platform)
- Update `config.py`: `PORT = int(os.environ.get('PORT', 5000))`

---

## 🎯 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Can browse movie categories
- [ ] Search functionality works
- [ ] Can play at least one video
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Monitoring/logging enabled
- [ ] Backup strategy in place

---

## 📞 Support

If you encounter issues during deployment:

1. Check application logs
2. Verify environment variables
3. Test Telegram bot connection locally
4. Open GitHub issue with deployment platform details

---

**Happy Streaming! 🎬**
