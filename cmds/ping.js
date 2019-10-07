const Discord = require("discord.js");
module.exports.run = (client, message, args) => { 
    const embed = new Discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor('Ping-Pong! 🏓')
    .setDescription(`${Date.now() - message.createdTimestamp}`+ ' ms')
    .setTimestamp()
    message.channel.send(embed);
};
module.exports.help = {
    name: "ping"
};