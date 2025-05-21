const { Telegraf, Markup } = require('telegraf');

// Создаем бота
const bot = new Telegraf(process.env.BOT_TOKEN);

// Обработка команды /menu
bot.command('menu', (ctx) => {
  return ctx.reply('Меню:', Markup.inlineKeyboard([
    Markup.button.callback('Созвон', 'create_call')
  ]));
});

// Кнопка "Созвон"
bot.action('create_call', async (ctx) => {
  const link = 'https://meet.jit.si/' + generateRoomName();
  await ctx.reply('Вот ссылка на созвон:', Markup.inlineKeyboard([
    Markup.button.url('Присоединиться', link)
  ]));
  await ctx.answerCbQuery();
});

// Генератор ссылки
function generateRoomName() {
  const adjectives = ['fast', 'cool', 'silent', 'bright'];
  const nouns = ['tiger', 'eagle', 'lion', 'panther'];
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return `${rand(adjectives)}-${rand(nouns)}-${Date.now()}`;
}

// Vercel Webhook handler
module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка в Webhook:', err);
    res.status(500).send('Something went wrong');
  }
};
