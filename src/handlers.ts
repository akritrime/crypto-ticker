import { Client, Message } from 'discord.js'
import { CREATOR_ID } from './constants'
import { isBotCommand } from './utils'

// updates status when ever the bot comes online.
export function ready(c: Client) {
    const cb = () => {
        c.user.setActivity('CryptoCurrencies', {
            type: 'WATCHING'
        })
        console.log("Bot is ready")
    }

    c.on('ready', cb)
}

// replies to only pings from the creator. Used for testing purposes
export function pong(c: Client) {
    const cb = (m: Message) => {
        if (m.author.id === CREATOR_ID && m.content === "!ping") {
            m.channel.send('pong?')
        }
    }

    c.on('message', cb)
}

// detects and executes all the bot commands
export function commands(c: Client) {
    const cb = (m: Message) => {

        const cmd = isBotCommand(m.content, ".ct", c.user.id)
        if (!cmd) {
            if (cmd === "") {
                m.channel.send("no command")
            }
            return
        }
        
        console.log(cmd)
        m.channel.send("received the message.")
    }

    c.on('message', cb)
}