




/*

*************************
NO MOVER NADA DE AQUí!
*************************

*/


const { readdirSync } = require('fs')
const ascii = require('ascii-table')
let table = new ascii('Commands');
table.setHeading('Command', 'Load Status')

module.exports = (client) => {
  readdirSync('./comandos/').forEach(dir => {
    const command = readdirSync(`./comandos/${dir}/`).filter(file => file.endsWith('.js'));


    for (let file of command) {
      let pull = require(`../comandos/${dir}/${file}`)
      
      if(pull.name) {
        client.comandos.set(pull.name, pull)
        table.addRow(file, '✅');
      } else {
        table.addRow(file, '❌ -> falta help.name o help.name no es un string')
        continue;
      }
     
      if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias.pull.name));
 
      
    }
    
  })
  
  console.log(table.toString());
  
}
