# 🔐 MyFlix User Authentication Setup Guide

## Why Use User Authentication?

Using your personal Telegram account instead of a bot has several advantages:

✅ **No admin permissions needed** - Works with any channel you're a member of
✅ **No PEER_ID_INVALID errors** - User accounts don't have bot limitations
✅ **Access private channels** - As long as you're a member
✅ **Simpler setup** - No need to add bot as admin
✅ **More reliable** - Bypasses bot-specific restrictions

---

## 📋 Setup Instructions

### Step 1: Get Your Telegram API Credentials

1. Go to https://my.telegram.org/apps
2. Log in with your phone number
3. Create a new application (if you haven't already)
4. Copy your **API ID** and **API Hash**

### Step 2: Configure MyFlix for User Mode

Update your `.env` file or `config.py` with these settings:

```env
# Telegram API Configuration
TELEGRAM_API_ID=your_api_id_here
TELEGRAM_API_HASH=your_api_hash_here

# Authentication Method - USE 'user' MODE
TELEGRAM_AUTH_METHOD=user

# Your Phone Number (with country code)
TELEGRAM_PHONE_NUMBER=+1234567890

# Channel Configuration
TELEGRAM_CHANNEL_ID=-1003342485515
```

**Important:**
- Set `TELEGRAM_AUTH_METHOD=user` (not 'bot')
- Include country code in phone number: `+1234567890`
- You can now use any channel ID you're a member of
- You don't need `TELEGRAM_BOT_TOKEN` in user mode

### Step 3: First Run - Verification

When you first run MyFlix with user mode:

1. Start the application:
   ```powershell
   cd MyFlix
   python app.py
   ```

2. You'll be prompted to enter a **verification code**
3. Check your Telegram app for the code
4. Enter the code in the terminal
5. ✅ Done! The session will be saved for future use

### Step 4: Join Your Channel

Make sure your Telegram account is a member of the channel:

1. Open Telegram
2. Search for or navigate to your channel
3. Join the channel (if you own it, you're already a member)
4. That's it! MyFlix will now work

---

## 🔄 Switching from Bot to User Mode

If you were previously using bot mode, follow these steps:

1. **Stop your MyFlix application**

2. **Delete old session files:**
   ```powershell
   cd MyFlix
   Remove-Item -Path "*.session*" -Force
   ```

3. **Update your configuration:**
   ```env
   TELEGRAM_AUTH_METHOD=user
   TELEGRAM_PHONE_NUMBER=+1234567890
   ```

4. **Restart the application:**
   ```powershell
   python app.py
   ```

5. **Enter verification code** when prompted

---

## 💡 Troubleshooting

### Issue: "Phone number is not registered"
**Solution:** Use the phone number that's registered with your Telegram account

### Issue: "Verification code invalid"
**Solution:** 
- Make sure you're entering the code from the correct device
- Check for 2-step verification (you'll need your cloud password)
- Try requesting a new code

### Issue: "Cannot access channel"
**Solution:**
- Make sure you're a member of the channel
- Verify the TELEGRAM_CHANNEL_ID is correct
- For private channels, you must be added as a member

### Issue: "Session expired"
**Solution:**
- Delete session files: `Remove-Item -Path "*.session*" -Force`
- Restart the application and enter verification code again

---

## 🔐 Security Notes

### Session Files
- User sessions are stored in `myflix_user.session`
- This file contains your authentication credentials
- **Keep it secure** - don't share or commit to git
- Already in `.gitignore` for your protection

### Two-Factor Authentication (2FA)
If you have 2FA enabled on Telegram:
1. You'll be asked for your verification code first
2. Then you'll be prompted for your cloud password
3. Enter your cloud password to complete authentication

### Logging Out
To revoke the session and log out:
```powershell
cd MyFlix
Remove-Item -Path "myflix_user.session*" -Force
```
Next time you start the app, you'll need to verify again.

---

## 🆚 User vs Bot Mode Comparison

| Feature | User Mode | Bot Mode |
|---------|-----------|----------|
| Setup Difficulty | Easy | Medium |
| Admin Required | ❌ No | ✅ Yes |
| Private Channels | ✅ Works | ⚠️ Requires admin |
| PEER_ID_INVALID | ❌ Never | ⚠️ Common issue |
| Verification Code | ✅ One-time | ❌ N/A |
| Session Management | Auto-saved | Auto-saved |
| Rate Limits | Normal | Stricter |

**Recommendation:** Use **User Mode** for private channels and simpler setup!

---

## 📝 Example Configuration

Here's a complete example `.env` file for user mode:

```env
# Telegram API Configuration
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=abcdef1234567890abcdef1234567890

# Use USER mode (not bot)
TELEGRAM_AUTH_METHOD=user

# Your phone number with country code
TELEGRAM_PHONE_NUMBER=+1234567890

# Your channel ID
TELEGRAM_CHANNEL_ID=-1003342485515

# Flask Configuration
SECRET_KEY=your-secret-key-here
DEBUG=False
PORT=5000
```

---

## ✅ Quick Start Checklist

- [ ] Get API ID and API Hash from https://my.telegram.org/apps
- [ ] Set `TELEGRAM_AUTH_METHOD=user` in config
- [ ] Add your phone number with country code
- [ ] Add your channel ID
- [ ] Delete old session files
- [ ] Run the application
- [ ] Enter verification code from Telegram
- [ ] Verify you're a member of the channel
- [ ] ✅ Start streaming!

---

**That's it!** User mode completely bypasses all the bot permission issues and works seamlessly with any channel you're a member of.
