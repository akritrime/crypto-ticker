import { Client } from 'discord.js'
import { ready, pong, commands } from './handlers'

const { TOKEN } = process.env

;(async function main() {
    const client = new Client()

    // get the Bot TOKEN 
    if (!TOKEN) {
        console.log("Var TOKEN not set.")
        return
    }

    // register the event handlers
    ready(client)
    pong(client)
    commands(client)

    await client.login(TOKEN)
    console.log("Bot logged in.")

})()