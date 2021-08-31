const {
    Telegraf
} = require('telegraf')
require('dotenv').config() 
const text = require('./help')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => console.log(ctx.message) || ctx.reply(`Это твой id: ${ctx.message.from.id}`))
bot.help((ctx) => ctx.reply(text.commands))
bot.hears('oh shit', (ctx) => ctx.reply('yes(((('))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
