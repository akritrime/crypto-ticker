import { Client } from 'discord.js'
import { TOKEN } from './constants'

import handlers from './handlers'

;(async function main() {
    const client = new Client()

    // check if the Bot TOKEN is set 
    if (!TOKEN) {
        console.log("Var TOKEN not set.")
        return
    }

    // register the event handlers
    for (let [_, handler] of Object.entries(handlers)) {
        handler(client)
    }

    await client.login(TOKEN)
    console.log("Bot logged in.")

})()