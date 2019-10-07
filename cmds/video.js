const Discord = require("discord.js");
module.exports.run = (client, message, args) => { 
    if(!message.member.voiceChannel) return
    if (message.content === '!!video') {
  
      let videoo = new Discord.RichEmbed()
        .setAuthor(`${message.member.voiceChannel.name}`)
        .setDescription(`[Войти в sex комнату](https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id})`)
        .setColor('#66CED1');
        
      message.delete(0)
      message.channel.send(videoo);
    }
    };
module.exports.help = {
    name: "video"
};