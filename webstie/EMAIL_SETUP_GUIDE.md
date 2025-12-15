# 📧 Email Configuration Guide

Complete guide for setting up email functionality in Project Hub X.

## Overview

Project Hub X includes **serverless email functionality** for:
- ✉️ **Contact Form** - Receive messages from visitors
- 🚀 **Custom Project Requests** - Handle project inquiries with automatic confirmations

## Supported Email Providers

Choose one of the following providers:

| Provider | Difficulty | Free Tier | Best For |
|----------|-----------|-----------|----------|
| **SendGrid** | Easy | 100 emails/day | Most users (recommended) |
| **Mailgun** | Easy | 5,000 emails/month | High volume |
| **SMTP** | Medium | Varies | Existing email account |
| **Development** | None | Unlimited | Testing/development |

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Choose Your Provider

Pick one of the options below and follow its setup instructions.

### Step 2: Set Environment Variables

Add the required variables to your deployment platform (Netlify/Render).

### Step 3: Test

Submit a test form to verify emails are working.

---

## Provider Setup Instructions

### Option 1: SendGrid (Recommended) ⭐

**Perfect for most users** - Easy setup, reliable delivery, generous free tier.

#### 1. Create SendGrid Account
- Go to [SendGrid](https://signup.sendgrid.com/)
- Sign up for a free account (100 emails/day)
- Verify your email address

#### 2. Create API Key
- Navigate to **Settings → API Keys**
- Click **Create API Key**
- Name: `project-hub-x`
- Permission: **Full Access** (or at minimum: **Mail Send**)
- Copy the API key (you won't see it again!)

#### 3. Verify Sender Identity
- Navigate to **Settings → Sender Authentication**
- Choose one option:
  - **Single Sender Verification** (easier, for simple use)
  - **Domain Authentication** (better, for professional use)
- Follow the verification steps

#### 4. Set Environment Variables

```bash
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com  # Must be verified
ADMIN_EMAIL=admin@yourdomain.com
```

---

### Option 2: Mailgun

**Great for high volume** - 5,000 free emails per month.

#### 1. Create Mailgun Account
- Go to [Mailgun](https://signup.mailgun.com/)
- Sign up for free account
- Verify your email

#### 2. Get API Credentials
- Navigate to **Settings → API Keys**
- Copy your **Private API Key**
- Note your **Domain** (e.g., `mg.yourdomain.com`)

#### 3. Domain Setup (for production)
- Add your domain in Mailgun dashboard
- Add DNS records to your domain
- Wait for verification (can take a few hours)

For testing, you can use Mailgun's sandbox domain.

#### 4. Set Environment Variables

```bash
EMAIL_PROVIDER=mailgun
MAILGUN_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MAILGUN_DOMAIN=mg.yourdomain.com
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

---

### Option 3: SMTP (Gmail, Outlook, etc.)

**Use your existing email** - Works with any email provider.

#### Using Gmail

1. **Enable 2-Factor Authentication** on your Google account
2. **Create App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Select **2-Step Verification**
   - Scroll to **App passwords**
   - Generate password for "Mail"
3. **Use the 16-character password** (not your regular password)

#### Using Outlook/Office 365

1. Use your Outlook email and password
2. Enable "Allow less secure apps" if prompted

#### Using Custom SMTP

Use your hosting provider's SMTP settings.

#### Set Environment Variables

```bash
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com          # Gmail
SMTP_PORT=587                      # or 465 for SSL
SMTP_SECURE=false                  # true for port 465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password    # App password, not regular password
FROM_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@example.com
```

**Common SMTP Settings:**

| Provider | Host | Port | Secure |
|----------|------|------|--------|
| Gmail | smtp.gmail.com | 587 | false |
| Outlook | smtp.office365.com | 587 | false |
| Yahoo | smtp.mail.yahoo.com | 587 | false |
| Custom | (ask your host) | 587 | false |

---

### Option 4: Development Mode (No Setup)

**For testing only** - Emails are logged to console, not actually sent.

Simply don't set `EMAIL_PROVIDER` or leave it empty. All form submissions will be logged but no emails will be sent.

```bash
# Leave EMAIL_PROVIDER empty or unset
ADMIN_EMAIL=admin@example.com  # Optional
FROM_EMAIL=noreply@example.com # Optional
```

---

## Platform-Specific Setup

### Netlify

1. Go to your site dashboard
2. Navigate to **Site Settings → Environment Variables**
3. Add each variable:
   - Click **Add a variable**
   - Enter **Key** and **Value**
   - Save

Or use Netlify CLI:

```bash
netlify env:set EMAIL_PROVIDER sendgrid
netlify env:set SENDGRID_API_KEY "SG.xxx..."
netlify env:set FROM_EMAIL "noreply@yourdomain.com"
netlify env:set ADMIN_EMAIL "admin@yourdomain.com"
```

### Render

1. Go to your dashboard
2. Select your Web Service
3. Navigate to **Environment** tab
4. Add environment variables:
   - Click **Add Environment Variable**
   - Enter **Key** and **Value**
   - Save changes

### Local Development

Create `.env.local` in the `project-hub-x` directory:

```bash
cp project-hub-x/.env.example project-hub-x/.env.local
```

Edit `.env.local` with your settings.

---

## Email Templates

### Contact Form Email

**Sent to:** Admin  
**Triggered by:** Contact form submission  
**Contains:** Name, email, subject, message

### Custom Project Request Email

**Sent to:** Admin  
**Triggered by:** Custom project request  
**Contains:** Full project details, client info, request ID

### Client Confirmation Email

**Sent to:** Client  
**Triggered by:** Custom project request  
**Contains:** Confirmation, request ID, next steps

---

## Testing Your Setup

### 1. Test Contact Form

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### 2. Test Custom Request

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/custom-request \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Test Client",
    "clientEmail": "client@example.com",
    "projectTitle": "Test Project",
    "projectDescription": "Testing the email functionality"
  }'
```

### 3. Check Results

✅ **Success indicators:**
- Console shows "Email sent successfully"
- Check your admin email inbox
- Check client email inbox (for custom requests)

❌ **Failure indicators:**
- Console shows "Failed to send email"
- Check environment variables
- Verify API keys and credentials

---

## Troubleshooting

### Emails Not Sending

1. **Check environment variables** are set correctly
2. **Verify API keys** haven't expired
3. **Check sender verification** (SendGrid/Mailgun)
4. **Review function logs** in Netlify/Render dashboard

### SendGrid Issues

- ⚠️ **Sender not verified**: Verify sender email in SendGrid dashboard
- ⚠️ **API key invalid**: Generate new API key
- ⚠️ **Rate limit reached**: Upgrade plan or wait 24 hours

### Mailgun Issues

- ⚠️ **Domain not verified**: Complete DNS verification
- ⚠️ **Sandbox limitations**: Add authorized recipients or verify domain
- ⚠️ **Wrong region**: Use correct API endpoint (US vs EU)

### SMTP Issues

- ⚠️ **Authentication failed**: Use app password, not regular password
- ⚠️ **Connection timeout**: Check firewall/network settings
- ⚠️ **TLS/SSL errors**: Try different port (587 vs 465)

### Gmail-Specific

- Enable 2-Factor Authentication
- Use App Password (not regular password)
- Allow "Less secure apps" if needed
- Check "Display Unlock Captcha" if prompted

---

## Security Best Practices

### ✅ DO:
- Use environment variables (never hardcode keys)
- Enable sender verification
- Use app passwords for SMTP
- Rotate API keys periodically
- Monitor usage and logs

### ❌ DON'T:
- Commit API keys to Git
- Share API keys publicly
- Use personal email passwords
- Ignore rate limits
- Skip sender verification

---

## Advanced Features

### Save Requests to Git

Enable saving custom requests as markdown files:

```bash
SAVE_REQUESTS_TO_GIT=true
```

Files are saved to `content/requests/` and can be managed via Netlify CMS.

### Custom Email Templates

Edit the email templates in `netlify/functions/services/email-service.ts`:
- `formatContactFormEmail()` - Contact form styling
- `formatCustomRequestEmail()` - Admin notification styling
- `formatClientConfirmationEmail()` - Client confirmation styling

---

## Cost Comparison

| Provider | Free Tier | Paid Plans Start At | Best For |
|----------|-----------|---------------------|----------|
| SendGrid | 100/day | $19.95/mo (50K/mo) | Small to medium sites |
| Mailgun | 5,000/month | $35/mo (50K/mo) | Growing sites |
| SMTP | Varies | Free - $10/mo | Existing email accounts |

For most users, the **free tiers are sufficient**.

---

## Need Help?

1. Check the [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
2. Review function logs in your dashboard
3. Test with development mode first
4. Verify all environment variables are set

---

## Summary Checklist

- [ ] Choose email provider
- [ ] Create account and get credentials
- [ ] Verify sender identity
- [ ] Set environment variables
- [ ] Deploy changes
- [ ] Test contact form
- [ ] Test custom request form
- [ ] Verify emails received
- [ ] Check client confirmation emails

**You're all set! 🎉** Your contact forms will now send real emails.
