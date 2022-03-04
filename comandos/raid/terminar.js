const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
  name: "terminar",
  alias: "",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {
  message.delete().catch(()=>{return;})
  message.channel.send('**Se terminó el raideo**')
  setTimeout(() => {
      message.guild.leave().catch(()=>{return;})
  }, 1000);
  }
}