const {
    Telegraf
} = require('telegraf')
require('dotenv').config() 
const text = require('./help')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => startFun(ctx))

bot.help((ctx) => randomPic(ctx,0,9))
function startFun(ctx){
    console.log(ctx.message)
    ctx.reply(`Это твой id: ${ctx.message.from.id}`)
    bot.telegram.sendMessage("420724113",`Пользователь ${ctx.message.from.first_name || ctx.message.from.username} воспользовался ботом \n id: ${ctx.message.from.id}`)
}
function randomPic(ctx, min, max) {
    let number = Math.floor(Math.random() * (max - min) + min);
    ctx.replyWithPhoto({
         source:`./img/image${number}.jpg`
    })
    console.log(number, ctx.message.from.first_name || ctx.message.from.last_name || ctx.message.from.id)
    // bot.telegram.sendMessage('493198854', 'ну в плане /start')
}

bot.hears('oh shit', (ctx) => ctx.reply('yes(((('))

bot.on('message',ctx=>replyMessage(ctx))

function replyMessage (ctx){
    
    if(ctx.message.text){
        ctx.reply(ctx.message.text)
    }
    else{
        ctx.reply('mmm')
    }
}

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
// 757788913