const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

// Middleware to parse JSON bodies
app.use(express.json());

// Webhook endpoint
app.post(`/webhook/${token}`, (req, res) => {
  const update = req.body;
  bot.processUpdate(update);
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
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Set the webhook URL
  const webhookUrl = `https://https://telegram-echo-bot-alpha.vercel.app//webhook/${token}`;
  await bot.setWebHook(webhookUrl);
  console.log(`Webhook set to ${webhookUrl}`);
});
