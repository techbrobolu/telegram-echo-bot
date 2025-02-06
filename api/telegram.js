// api/telegram.js
module.exports = async (req, res) => {
  // Ensure it's a POST request from Telegram webhook
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const body = req.body;

  // Basic validation for a Telegram update
  if (body && body.message && body.message.text) {
    const chatId = body.message.chat.id;
    const messageText = body.message.text;

    // Format the echo message
    const reply = `You said '${messageText}'`;

    // Prepare the URL to call Telegram API
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Send the echo message back using fetch
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
        }),
      });
      return res.status(200).send('OK');
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
  return res.status(400).send('Bad Request');
};
