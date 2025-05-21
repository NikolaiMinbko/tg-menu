const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Устанавливаем команды (для меню 📋 — только в личке)
bot.telegram.setMyCommands([
  { command: 'menu', description: 'Открыть меню' },
]);

// При старте
bot.start((ctx) => {
  ctx.reply('Привет! Нажми на кнопку внизу, чтобы создать созвон 👇', {
    reply_markup: {
      keyboard: [['Создать созвон']],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// Команда /menu — тоже показывает кнопку
bot.command('menu', (ctx) => {
  ctx.reply('Выбери действие:', {
    reply_markup: {
      keyboard: [['Создать созвон']],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

// Обработка текста "Создать созвон"
bot.hears('Создать созвон', (ctx) => {
  const link = 'https://meet.jit.si/' + Date.now();
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
