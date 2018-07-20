import { RichEmbed, Message, User, MessageReaction, Collector } from "discord.js"
import * as ccxt from 'ccxt'
import { exchs } from "./constants";

// checks if the message is a bot command. Any message that starts with the given prefix or a mention of the bot user is a command
export function isBotCommand(cnt: string, prefix: string, botID: string) : string | boolean {
    if (cnt.startsWith(prefix)) {
        return cnt.slice(prefix.length).trim()
    }

    const botMention = `<@${botID}>`
    if (cnt.startsWith(botMention)) {
        return cnt.slice(botMention.length).trim()
    }
    return false
}

// sends an embed for the exchanges chunk pages
// uses left and right emoji reactions arrow to navigate the list
export async function sendExchEmbed(page: number, u: User ): Promise<void> {
    if (page == 0) page = exchs.len()
    if (page > exchs.len()) page = 1
    

    let embed = new RichEmbed()
        .setColor(0x00c269)
        .setTitle("List of available exchanges")
        .setFooter(`Page No. ${page}`)

    const isNext = (r: MessageReaction, user: User) => "➡" === r.emoji.name && user.id === u.id
    const isPrevious = (r: MessageReaction, user: User) => "⬅" === r.emoji.name && user.id === u.id 

    try {
        for (const exch of exchs.get(page - 1)) {
            let exc: ccxt.Exchange = new (ccxt as any)[exch]()
            embed.addField(exc.name, `Link: ${exc.urls.www}\nCountries: ${exc.countries}\nCurrencies: ${Object.keys(exc.currencies).join(", ")}`)
        }

        // sends the embed as dm and reacts with arrows for navigation
        const m = await u.send({embed}) as Message
        await m.react("⬅")
        await m.react("➡")
        
        // creates a next and previous collector. Next collects request for next page of the list. Previous collects for previous page
        const next = m.createReactionCollector(isNext, { time: 60000, max: 2 })
        const previous = m.createReactionCollector(isPrevious, { time: 60000, max: 2 })

        // stops both collectors and deltes the message
        const stop = () => {
            next.stop()
            previous.stop()
            m.delete()
        }

        // callback for collect events
        const cb = (p: number) => (r: MessageReaction, rc: Collector<string, MessageReaction>) => {
            stop()
            return sendExchEmbed(p, u)
        }
    
        // reaction on collect
        next.on('collect', cb(page + 1))
        previous.on('collect', cb(page - 1))
        
    
    } catch (error) {
        console.log(error)
    }
}