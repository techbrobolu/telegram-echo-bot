//const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

//const app = express();
//const PORT = process.env.PORT || 3000;
require('dotenv').config()

// Use express.json() to parse JSON bodies
//app.use(express.json());

// Initialize the bot without polling
const bot = new TelegramBot(token, { polling: false });

// Set up the webhook for Telegram updates
bot.setWebHook(`${process.env.WEBHOOK_URL}/api/index`);
console.log(`Webhook is set to ${process.env.WEBHOOK_URL}/api/index`);


// Register commands/handlers once per instance
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot is working!');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(`Received message: ${text} from chat ID: ${chatId}`);
  bot.sendMessage(chatId, `You said '${text}'`);
});

// Vercel serverless function
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Process the incoming Telegram update
      bot.processUpdate(req.body);
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error processing update:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};