const Discord = require("discord.js");
const client = new Discord.Client;
const serverStats = {
  guildID: '604946569963241482',
  memberCountID: '605066668665995275',
  voiceStatsID: '609079570012045323'
};
const fs = require("fs");
const ms = require("ms");

 client.commands = new Discord.Collection();
 //client.aliases = new Discord.Collection(); // Collection for all aliases of every command
 let config = require('./botconfig.json');
 let token = config.token;

//const Uploader = require("./utils/Uploader.js");

//client.uploader = new Uploader(client);


client.on('ready', () => {
  console.log('Go!');
  client.user.setStatus('idle');
  client.user.setGame('BETA 0.0.4');

  //client.uploader.loadCommands();
});

/*client.on('message', message => {
  if(!message.member.voiceChannel) return
  if (message.content === '!!video') {

    let videoo = new Discord.RichEmbed()
      .setAuthor(`${message.member.voiceChannel.name}`)
      .setDescription(`[Войти в sex комнату](https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id})`)
      .setColor('#66CED1');

    message.delete(0)
    message.channel.send(videoo);
  }
});*/



client.on("userUpdate", async(oldUser, newUser) => {
  let log = await client.channels.get('613086479358623754')
  if(oldUser.displayAvatarURL != newUser.displayAvatarURL) log.send(`Пользователь с ID ${newUser.id} изменил свой аватар\n${newUser.displayAvatarURL}`)
  if(oldUser.tag != newUser.tag) log.send(`Пользователь с ID ${newUser.id} изменил свой тэг\n ${oldUser.tag} => ${newUser.tag}`)
  if(oldUser.message != newUser.messgae) log.send(`Пользователь с ID ${newUser.id} изменил сообщениеЖ\n Старое: ${oldUser.message}\n Новое: ${oldUser.message}`)
})

 client.on('guildMemberAdd', member => {
   if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.memberCountID).setName(`🏆Всего участников : ${member.guild.members.filter(m => !m.user.bot).size}`);
 });

 client.on('guildMemberRemove', member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.memberCountID).setName(`🏆Всего участников : ${member.guild.memberCount}`);
 });

 client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;
  let voicetext = "⭐Голосовой онлайн: "
  let ch = client.channels.get("609079570012045323");
  if (newUserChannel && !oldUserChannel) {
      ch.setName(`${voicetext}${newMember.guild.members.filter(m => m.voiceChannel).size}`);
  };
  if (!newUserChannel && oldUserChannel) {
      ch.setName(`${voicetext}${newMember.guild.members.filter(m => m.voiceChannel).size}`);
  };
});


let i = 0;
function rainbow(){
    var rainbowArr = ["#f44242","#f44a41","#f45241","#f45e41","#f46a41","#f47941","#f48541","#f49141","#f49d41","#f4ac41","#f4b841","#f4c741","#f4d341","#f4df41","#f4ee41","#e8f441","#dff441","#d9f441","#d3f441","#caf441","#c1f441","#b8f441","#aff441","#a6f441","#9df441","#94f441","#88f441","#7cf441","#73f441","#6af441","#5bf441","#49f441","#41f455","#41f467","#41f476","#41f485","#41f491","#41f49d","#41f4ac","#41f4ca","#41f4df","#41f4f4","#41ebf4","#41dcf4","#41c7f4","#41b2f4","#419df4","#4182f4","#4176f4","#4161f4","#4149f4","#4c41f4","#6741f4","#7c41f4","#8e41f4","#a041f4","#c441f4","#cd41f4","#df41f4","#f441e8","#f441af","#f44185","#f4417c"]
    let rainbow = rainbowArr[i];
    i += 1;
    if(i == 63){
        i = 0;
    }
    return rainbow;
}
client.on("ready", ()=>{
setInterval(()=>{
        client.guilds.find("id","604946569963241482").roles.find("id","605699685914771456").setColor(rainbow());
    },10000)


});

client.on('message', message => {
  if (message.content === '!!help') {

    var embed = new RichEmbed()
    .setTitle('Список комманд:')
    .setDescription(`**!!video** - войти в комнату для трансляций`)
    .setColor('#66CED1');

    message.delete(0)
    message.channel.send(embed)
  }
  });


client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});


/*client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + 'ping')) {
      message.channel.sendMessage('Pong! Ваш пинг `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }
});*/

fs.readdir('./cmds', (err, files) => {
  if (err) console.log(err);
  var jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) console.log("Нет комманд для загрузки!!");
  console.log(`Найдено ${jsfiles.length} комманд`);
  jsfiles.forEach((f, i) => {
      var props = require(`./cmds/${f}`);
      console.log(`${i + 1}.${f} загружена!`);
    client.commands.set(props.help.name, props);
  });
});

/*const jsFiles = fs.readdirSync('./cmds').filter(f => f.endsWith('.js'));
for (const file of jsFiles) {
  const prop = require(`./cmds/${file}`);
  console.log(`${file} Загружен!`);
  client.commands.set(prop.help.name, props);
}*/




client.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);


});


client.login(token);
