const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config()

// Use express.json() to parse JSON bodies
app.use(express.json());

const token = process.env.TELEGRAM_BOT_TOKEN;
const webhookUrl = process.env.WEBHOOK_URL; // e.g., "https://your-app.vercel.app"

// Initialize the bot without polling
const bot = new TelegramBot(token, { polling: false });

// Set up the webhook for Telegram updates
bot.setWebHook(`${webhookUrl}/webhook`);
console.log(`Bot webhook set to: ${webhookUrl}/webhook`);

// Webhook endpoint for Telegram
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot is working!');
});

// Handle regular messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log(`Received message: ${text} from chat ID: ${chatId}`);
  bot.sendMessage(chatId, `You said '${text}'`);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
