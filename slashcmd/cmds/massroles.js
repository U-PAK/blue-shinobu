const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    timeout:420000, 
    data: new SlashCommandBuilder()
    .setName("massroles")
    .setDescription("Crea muchos roles en el servidor")
    .addStringOption(data => data.setName('nombre').setDescription('Nombre de los roles').setRequired(true))
    .addStringOption(data => data.setName('color').setDescription('Color #HEX '))
    .addStringOption(data => data.setName('icon').setDescription('Icono de rol (Solo Servidores Level 2-3): Formato: https://cool-link.png')),



    async run(client, interaction){
try{



    const nombre = await interaction.options.getString('nombre')
    const color = await interaction.options.getString('color')
    const icon = await interaction.options.getString('icon')
    




    let roles = await interaction.guild.roles.cache.size
    if(roles == 250) return interaction.reply({content: '**Este servidor alcanzó el limite de roles por servidor en Discord.** Max: 250', ephemeral: true})

    
    interaction.reply({content: '**Se ha comenzado a crear roles en este servidor, puedes presenciar lag debido a los cambios repentinos y la creación masiva de roles.**', ephemeral: true}).catch(()=>{
        return;
      })

    for (let i = 0; i <= 100; i++) {
        interaction.guild.roles.create({
            name: nombre,
            color: color,
            reason: '☣️BasadoSquad☣️',
            position: interaction.guild.me.roles.highest.position - 1
        }).then(r=>{
            r.iconURL(icon).catch(()=>{
                return;
            })
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