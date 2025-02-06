const { Analytics } = require('@vercel/analytics');
const analytics = new Analytics(); // This helps Vercel display analytics for the project but after running ""

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your bot token (will be set as an environment variable)
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token);

// Handle incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log(`Received message: ${text} from chat ID: ${chatId}`);

  // Echo the message back in the desired format
  bot.sendMessage(chatId, `You said '${text}'`);
  

  // Log the event using Vercel Analytics
  analytics.track('MessageReceived', {
    chatId: chatId,
    message: text,
  });
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot is working!');
});
// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});