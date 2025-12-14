"""
Quick test script to verify your Telegram configuration
Run this before starting the app to check your credentials
"""

import config

print("\n" + "=" * 50)
print("🔍 MyFlix Configuration Test")
print("=" * 50 + "\n")

# Check each configuration
print("📋 Checking Telegram Configuration:")
print("-" * 50)

# API ID
if config.API_ID == 'YOUR_API_ID':
    print("❌ API_ID: NOT SET (placeholder value)")
    print("   → Get from: https://my.telegram.org/apps")
else:
    print(f"✅ API_ID: {config.API_ID}")

# API Hash
if config.API_HASH == 'YOUR_API_HASH':
    print("❌ API_HASH: NOT SET (placeholder value)")
    print("   → Get from: https://my.telegram.org/apps")
else:
    print(f"✅ API_HASH: {config.API_HASH[:10]}... (hidden)")

# Bot Token
if config.BOT_TOKEN == 'YOUR_BOT_TOKEN':
    print("❌ BOT_TOKEN: NOT SET (placeholder value)")
    print("   → Get from: @BotFather on Telegram")
else:
    print(f"✅ BOT_TOKEN: {config.BOT_TOKEN[:20]}... (hidden)")

# Channel ID
if config.CHANNEL_ID == '@myflixchannel':
    print("❌ CHANNEL_ID: NOT SET (placeholder value)")
    print("   → Use your channel username or ID")
else:
    print(f"✅ CHANNEL_ID: {config.CHANNEL_ID}")

print("-" * 50)

# Overall validation
if config.validate_config():
    print("\n✅ All configuration looks good!")
    print("\n📝 Next Steps:")
    print("   1. Make sure your bot is added as admin to the channel")
    print("   2. Upload at least one video to the channel")
    print("   3. Run: python app.py")
else:
    print("\n❌ Configuration incomplete!")
    print("\n📝 How to Fix:")
    print("   1. Edit config.py and replace placeholder values")
    print("   2. Or set environment variables:")
    print("      - TELEGRAM_API_ID")
    print("      - TELEGRAM_API_HASH")
    print("      - TELEGRAM_BOT_TOKEN")
    print("      - TELEGRAM_CHANNEL_ID")
    print("\n📚 Read TELEGRAM_SETUP.md for detailed instructions")

print("\n" + "=" * 50 + "\n")
