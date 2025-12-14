from pyrogram import Client

API_ID = 30079635
API_HASH = "5a3b8b6768c998bc745942655db7632e"
BOT_TOKEN = "8360761989:AAES9Kr3px5XYIFvL_G1dNyCFaVuFjEHGlM"
CHANNEL_ID = -1003342485515
CHANNEL_USERNAME = "Stream_Art_Online"  # WITHOUT @

app = Client(
    "DataVue_bot",
    api_id=API_ID,
    api_hash=API_HASH
)

with app:
    chat = app.get_chat(CHANNEL_USERNAME)
    print("✅ Channel access OK")
    print("Title:", chat.title)

    for msg in app.get_chat_history(CHANNEL_USERNAME, limit=3):
        print("Message:", msg.caption or msg.text)
