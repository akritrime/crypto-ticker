import { Client, Message } from 'discord.js'

import { CREATOR_ID, exchs } from './constants'
import { isBotCommand } from './utils'
import cmds from './commands'


// updates status when ever the bot comes online.
function ready(c: Client) {
    const cb = () => {
        c.user.setActivity('CryptoCurrencies', {
            type: 'WATCHING'
        })
        console.log("Bot is ready")
        exchs.init()
    }

    c.on('ready', cb)
}

// replies to only pings from the creator. Used for testing purposes
function pong(c: Client) {
    const cb = (m: Message) => {
        if (m.author.id === CREATOR_ID && m.content === "!ping") {
            m.channel.send('pong?')
        }
    }

    c.on('message', cb)
}

// detects and executes all the bot commands
function commands(c: Client) {
    const cb = (m: Message) => {
        if (m.author.bot) {
            return
        }
        
        // check if the message is a command 
        const txt = isBotCommand(m.content, ".ct", c.user.id)
        if (!txt) {
            if (txt === "") {
                m.channel.send("no command")
            }
            return
        }
        
        // after getting the command text without the invocation, split them into indivual words to get the all the keywords
        const cmd = (txt as string).split(" ").map(v => v.trim())
        
        // based on the first word of the text, get the command that needs to be executed from the cmds Map
        const command = cmds.get(cmd[0])
        if (command) {
            command.execute(m)
        } else {
            m.channel.send('Invalid command')
        }

    }

    c.on('message', cb)
}

export default {
    ready,
    pong,
    commands
}