/*
Si quieres añadir un nuevo comando en SlashCommand ve a la carpeta ./slashcmd/cmds y agrega un archivo en extensión (.js)

Despues agrega el siguiente contenido al archivo:


Cuando termines tu comando ejecuta el comando en la terminal: node slashcmds.js para registrar tu nuevo comando en los servidores en los que está el Bot dandole la petición directamente a la API de Discord. (Suele demorar un rato en guardarse en todos los servidores)
*/

const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")


module.exports = {

    data: new SlashCommandBuilder()
    .setName("Nombre de tu comando")
    .setDescription("Descripción de tu comando")
    //Funciones  (Las funciones las puedes encontrar en: https://discord.js.org/#/docs/builders/stable/class/SlashCommandBuilder)
    ,

    async run(client, interaction){
    try{

        //await interaction.reply('Hola')




    }catch (e) {
            console.error(e);
            
            try {
            return;
            } catch (e) {}
            }
        }
    }