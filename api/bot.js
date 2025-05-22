import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
  ctx.reply('Привет! Используй команду /call чтобы получить кнопку для созвона.');
});

// Команда /call — отправляет сообщение с inline-кнопкой
bot.command('call', ctx => {
  ctx.reply('Нажми кнопку, чтобы присоединиться к созвону:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📞 Присоединиться к созвону', url: 'https://meet.jit.si/your-call-link' }]
      ]
    }
  });
});

bot.launch();
console.log('Бот запущен');
