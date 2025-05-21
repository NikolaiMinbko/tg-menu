const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Устанавливаем меню бота
bot.telegram.setMyCommands([
  { command: 'menu', description: 'Открыть меню' },
]);

// Команда /start
bot.start((ctx) => {
  ctx.reply('Привет! Жми на 📋 Меню рядом со скрепкой!');
});

// Команда /menu
bot.command('menu', (ctx) => {
  ctx.reply('Выбери действие:', Markup.inlineKeyboard([
    Markup.button.callback('Создать созвон', 'create_call')
  ]));
});

// Кнопка "Создать созвон"
bot.action('create_call', (ctx) => {
  const link = 'https://meet.jit.si/' + Date.now();
  ctx.reply(`Вот ссылка на созвон: ${link}`);
  ctx.answerCbQuery();
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
