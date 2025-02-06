const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your bot token (will be set as an environment variable)
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token);

// Middleware to parse JSON
app.use(express.json());

// Webhook endpoint
app.post('/api', (req, res) => {
  const { message } = req.body;

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bot is working!');
  });

  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    // Echo the message back
    bot.sendMessage(chatId, `You said '${text}'`)
      .then(() => {
        console.log(`Message sent to chat ID ${chatId}: ${text}`);
      })
      .catch((err) => {
        console.error('Error sending message:', err);
      });
  }

  // Respond to Telegram to acknowledge receipt of the message
  res.sendStatus(200);
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});