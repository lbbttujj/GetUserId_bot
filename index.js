const {
    Telegraf, Markup
} = require('telegraf')
require('dotenv').config() 
const text = require('./help')
const fs = require('fs')
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => startFun(ctx))
bot.help((ctx) => randomPic(ctx,0,11))




function startFun(ctx){
    console.log(ctx.message)
    ctx.reply(`Это твой id: ${ctx.message.from.id}`)
    bot.telegram.sendMessage(`420724113`,`Пользователь ${ctx.message.from.first_name || ctx.message.from.username} воспользовался ботом \n id: ${ctx.message.from.id}`)
    writeText(ctx.message.from.id,ctx.message.from.first_name)
}
function randomPic(ctx, min, max) {
    let number = Math.floor(Math.random() * (max - min) + min);
    ctx.replyWithPhoto({
         source:`./img/image${number}.jpg`
    })
    console.log(number, ctx.message.from.first_name || ctx.message.from.last_name || ctx.message.from.id)
}

bot.hears('oh shit', (ctx) => ctx.reply('yes(((('))

var preMessage = ''
bot.hears('/all_user', async (ctx) => {
    await  readText(ctx);
    await ctx.replyWithHTML('<i>Кому написать?</i>',Markup.inlineKeyboard(
        [
            [Markup.button.callback('Alex','Alex')],
            [Markup.button.callback('Ivan','Ivan')],
            [Markup.button.callback('Eugene','Eugene')],
            [Markup.button.callback('Danila','Danila')],
            [Markup.button.callback('Anita','Anita')]
        ]
    ))

})

bot.action('Alex', async(ctx) =>{
    preMessage ='757788913'
    ctx.reply('Сообщения будут отправлены Alex')
    ctx.answerCbQuery()
})
bot.action('Ivan',async (ctx) =>{
    preMessage ='420724113'
    ctx.reply('Сообщения будут отправлены Ivan')
    ctx.answerCbQuery()
})
bot.action('Eugene', async(ctx) =>{
    preMessage ='493198854'
    ctx.reply('Сообщения будут отправлены Eugene')
    ctx.answerCbQuery()

})
bot.action('Danila',async (ctx) =>{
    preMessage ='694584052'
    ctx.reply('Сообщения будут отправлены Danila')
    ctx.answerCbQuery()

})
bot.action('Anita',async (ctx) =>{
    preMessage ='418127078'
    ctx.reply('Сообщения будут отправлены Anita')
    ctx.answerCbQuery()

})
bot.action('stop',async (ctx) =>{
    preMessage =''
    ctx.reply('Отправка сообщений прекращена')
    ctx.answerCbQuery()


})

bot.on('message',ctx=>replyMessage(ctx))

function replyMessage (ctx){
    
    if(ctx.message.text){
        // ctx.reply(ctx.message.text)
        if(Number(ctx.message.text[0])){
           
            let aMessage = ctx.message.text.split('');
            let aId = aMessage.slice(0,9);
            let aTextMessage = aMessage.slice(9)
            let sId = aId.join('');
            let sTextMessage = aTextMessage.join('');

            bot.telegram.sendMessage(`${sId}`,`${sTextMessage}`)

        }
        else if(preMessage!=''){
            bot.telegram.sendMessage(`${preMessage}`,`${ctx.message.text}`)
            ctx.replyWithHTML('<i>Чтобы прекратить отправку сообщений этому пользователю нажми сюда</i>',Markup.inlineKeyboard(
                [
                    [Markup.button.callback('stop','stop')]
                 
                ]
            ))
        }
        else{
            ctx.reply(ctx.message.text)
        }
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





function writeText(id, name){
    let memory ='';
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) throw err;
      
       memory=`${memory} \n ${data}`  


    fs.writeFile('data.txt', `${memory}\n id = ${id} name = ${name}`, (err, data) => {
      if (err) throw err;
    
    });
    });
}
function readText (ctx){
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) throw err;
  
    ctx.reply(data)
  });
}

