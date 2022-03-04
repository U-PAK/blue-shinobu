const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 60000,
    data: new SlashCommandBuilder()
    .setName("terminar")
    .setDescription("Saca al bot del server para terminar el raideo."),
    
    async run(client, interaction){
try{

interaction.reply({content: "**Se ha terminado el raideo.**", ephemeral: true})
setTimeout(()=>{
    interaction.guild.leave().catch(()=>{return;})
}, 3000)




}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}