import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// команда /start
bot.start(ctx => {
  ctx.reply('Привет! Используй команду /call чтобы получить кнопку для созвона.');
});

// команда /call
bot.command('call', ctx => {
  ctx.reply('Нажми кнопку, чтобы присоединиться к созвону:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📞 Присоединиться к созвону', url: 'https://meet.jit.si/your-call-link' }]
      ]
    }
  });
});

// основной обработчик для webhook
export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка в handler:', err);
    res.status(500).send('Ошибка сервера');
  }
}
