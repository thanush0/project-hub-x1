# 🚀 Quick Start - User Mode (Solves All Bot Issues!)

## The Problem You Had
Your bot couldn't access the channel due to **PEER_ID_INVALID** error, even after adding it as admin.

## The Solution
Use **USER MODE** instead of bot mode! This completely bypasses all bot limitations.

---

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Update Your Phone Number

Edit the `.env` file and add your phone number:

```env
TELEGRAM_PHONE_NUMBER=+1234567890
```

Replace `+1234567890` with your actual Telegram phone number (include country code).

### 2️⃣ Verify Configuration

Make sure your `.env` has:
```env
TELEGRAM_AUTH_METHOD=user
TELEGRAM_PHONE_NUMBER=+your_actual_number
TELEGRAM_CHANNEL_ID=-1003342485515
```

### 3️⃣ Delete Old Sessions

```powershell
cd MyFlix
Remove-Item -Path "*.session*" -Force
```

### 4️⃣ Run MyFlix

```powershell
python app.py
```

### 5️⃣ Enter Verification Code

1. You'll see: `Please enter the code you received:`
2. Check your Telegram app for a verification code
3. Enter the code
4. ✅ Done! Your session is saved

---

## ✅ What You Get with User Mode

✅ **No admin permissions needed**
✅ **No PEER_ID_INVALID errors ever**
✅ **Works immediately with any channel you're a member of**
✅ **No need to forward messages or wait**
✅ **More reliable than bot mode**

---

## 📱 If You Have 2FA (Two-Factor Authentication)

If you have 2FA enabled on Telegram:

1. Enter verification code first
2. Then enter your cloud password when prompted
3. That's it!

---

## 🆘 Troubleshooting

**Issue:** "Phone number not registered"
- Use the phone number registered with your Telegram account
- Include country code: `+1234567890`

**Issue:** "Cannot access channel"
- Make sure you're a member of the channel `Stream_Art_Online`
- Open Telegram and join the channel
- Restart the app

**Issue:** "Code expired"
- Request a new code
- Enter it faster (codes expire after 5 minutes)

---

## 🎉 That's It!

User mode is **much simpler** than bot mode and has **zero permission issues**.

Just make sure:
1. ✅ Your phone number is correct
2. ✅ You're a member of the channel
3. ✅ You enter the verification code

No forwarding messages, no admin permissions, no PEER_ID_INVALID errors!

---

**Need more details?** See `USER_AUTH_SETUP.md` for comprehensive documentation.
