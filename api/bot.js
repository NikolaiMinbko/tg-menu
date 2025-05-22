import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Телефонные эмодзи — можно дополнять список при необходимости
const PHONE_EMOJIS = ['📞', '📱', '☎️', '📲', '📳'];
const replyParams = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📞 Присоединиться к созвону', url: 'https://telemost.yandex.ru/j/65919061289353' }]
      ]
    }
  };

bot.start(ctx => {
  ctx.reply('Привет! Используй команду /call или Phone Emoji чтобы получить кнопку для созвона.');
});

bot.command('call', ctx => {
  ctx.reply('Нажми кнопку, чтобы присоединиться к созвону:', replyParams);
});

const privateReplies = [
  '🤖 Я — групповой тип. В личке чувствую себя неловко... как на семейных ужинах 😬',
  '🧢 Брат, этот бот в личке не работает. Зови в чат — там и разрулим 💪',
  '🔒 Доступ запрещён. Этот бот не работает соло — только фиты в группах 🎤',
  '👀 Что ты тут забыл? Бот тусуется только в группах. В ЛС — режим Целищева "ничего не понимаю".',
  '🚫 Согласно внутреннему регламенту, бот не обрабатывает личные сообщения. Спасибо за понимание. 👨‍💼',
  '🧩 Ты нашёл секретное логово бота... Но оно пустое. Приходи в группу — там вся магия ✨'
];

bot.on('message', (ctx, next) => {
  if (ctx.chat?.type === 'private') {
    const randomReply = privateReplies[Math.floor(Math.random() * privateReplies.length)];
    return ctx.reply(randomReply);
  }
  return next();
});

bot.on(['text', 'sticker'], (ctx) => {
  const message = ctx.message;

  if (message.text && PHONE_EMOJIS.some(e => message.text.includes(e))) {
    return ctx.reply('Нажми кнопку, чтобы присоединиться к созвону:', replyParams);
  }

  if (message.sticker && PHONE_EMOJIS.includes(message.sticker.emoji)) {
    return ctx.reply('Нажми кнопку, чтобы присоединиться к созвону:', replyParams);
  }
});

export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка в handler:', err);
    res.status(500).send('Ошибка сервера');
  }
}
