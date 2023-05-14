"use strict"
const { Client,Collection ,Events, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const news=require("./news");
const config =require("./config.json")
const commandsPath = path.join(__dirname,'commands')
const commandsFile = fs.readdirSync(commandsPath)
.filter(i => i.endsWith('.js'))
const moment = require("moment")


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.commands = new Collection();

for (let file of commandsFile){
    const fileName = path.join(commandsPath,file);
    const command=require(fileName);
    if ('data' in command  && 'execute' in command){
        client.commands.set(command.data.name,command)
    }else{
        console.warn('[WARNING] Data and Execute not set in some command files',file)
    }
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Client Events @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

client.once(Events.ClientReady,()=>{
    console.log('Applicaton is online');
    let cache = {}

    setInterval(async ()=>{
        const data = await news();
        const embed = new EmbedBuilder()
        .setTitle(data.title)
        .setDescription(data.description)
        .setURL(data.url)
        .setAuthor({name:data.author})
        .setThumbnail(data.media)
        .setTimestamp()
        .addFields(
            {name:"Published:",value:moment(data.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
            )

        if (!cache[data.title]){
        client.channels.fetch(config["feedChannelId"])
        .then(channel => 
            channel.send({embeds:[embed]})
            .catch(error =>console.log("[ERROR] could not send the message",error.name,error.message || "",error.code,config["feedChannelId"]))
                    
        ).catch(error => {
                console.log("[ERROR]",error.name,error.message || "",error.code,config["feedChannelId"])
            })
            
    }

        if (Object.keys(cache).length == 40) cache = {}
        cache[data.title] = embed


    }
    ,config["timeInMinutes"]*60*1000);
    // Try to keep this above 2 mins or 3 mins

})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Interaction Execution @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

client.on(Events.InteractionCreate, async interaction => {

    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return;
    if (command) {
        try{
            await command.execute(interaction);

        }catch(e){
            console.error('There was a error executing the command',e)
            if (interaction.replied || interaction.deferred){
                await interaction.followUp('There was a error executing the command',e)
            }
            else{
                await interaction.reply('There was a error executing the command',e)
            }

        }
    }
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Client Error Handling @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

client.on('error',(e)=>{
    console.error('Error',e)
})

client.on("rateLimit", e => {
	console.log("Rate Limited", e);
});

client.on("warn", e => {
	console.log("Warning", e);
});

//client.on("debug",(info)=>{
//    console.log(info)
//})

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Login @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

client.login(process.env.BOT_TOKEN)



