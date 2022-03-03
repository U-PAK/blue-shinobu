const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v8');
const { clientId } = require("./config.json")
const commands = []
const fs = require('fs')
const slashcommandsFiles = fs.readdirSync(`./slashcmd/cmds/`).filter(file => file.endsWith("js"))

for(const file of slashcommandsFiles){
    const slash = require(`./slashcmd/cmds/${file}`)
    commands.push(slash.data.toJSON())

}

const rest = new REST({ version: "8"}).setToken(require('./config.json').token)

createSlash()

async function createSlash(){
    try {
        await rest.put(
            Routes.applicationCommands(clientId),{
                body: commands
            }
            
        )
        console.log("✅ Slash Commands cargados correctamente.")
    } catch (e) {
        console.error(e)
    
    }

}
