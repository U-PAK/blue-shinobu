/*
Si quieres añadir un comando al Bot ve a la carpeta: ./comandos/raid y agrega un archivo en extensión (.js)

Despues agrega el siguiente contenido al archivo:

*/

const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js')



module.exports = {
  name: "Nombre de tu comando",
  alias: "Alías de tu comando",
  run: async (client, message, args) => {

    //message.reply('Hola')
  }
}
