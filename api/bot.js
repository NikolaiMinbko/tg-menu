const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Устанавливаем команды
bot.telegram.setMyCommands([
  { command: 'menu', description: 'Открыть меню' },
]);

// При старте
bot.start((ctx) => {
  ctx.reply('Привет! Нажми на кнопку внизу, чтобы открыть меню 👇', {
    reply_markup: {
      keyboard: [['📲']],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// Команда /menu — тоже показывает кнопку
bot.command('menu', (ctx) => {
  ctx.reply('Выбери действие:', {
    reply_markup: {
      keyboard: [['📲']],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// Обработка текста "Создать созвон"
bot.hears('📲', (ctx) => {
  const link = 'https://telemost.yandex.ru/j/59675931749364';
  ctx.reply(`Вот ссылка на созвон: ${link}`);
});

// Webhook handler
module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).send('Internal Server Error');
  }
};
