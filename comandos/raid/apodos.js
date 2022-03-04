const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
  timeout: 60000,
  name: "massnick",
  alias: "apodos",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {


    message.delete().catch(()=>{
        return;
    })
    const nicknames = args.join(' ')
    await message.guild.members.cache.map(async member =>{
        await member.setNickname(nicknames).catch(()=>{return;})
      })
    
    
    
  }
}