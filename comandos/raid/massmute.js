const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
    timeout: 60000,
  name: "massmute",
  alias: "",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {

    message.delete().catch(()=>{
        return;
    })

  message.guild.members.cache.forEach(member => {
    if(member.user.id == message.user.id){
      return;
    }else{
      member.timeout(3600000, '☣️ⱠegiønSquad☣️').catch(e=>{ 
       return;
      })
    }

  })
  }
}
