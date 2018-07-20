import * as ccxt from 'ccxt'

import { m } from './base'
import { Message, DMChannel } from 'discord.js'
import { sendExchEmbed } from '../utils';
import { exchs } from '../constants';

// `exchanges`
// shows a list of all available exchanges
const e = {
    name: 'exchanges',
    execute: async (m: Message, args?: string[]) => {
        if (!(m.channel instanceof DMChannel)) {
            m.channel.send(`${m.author} Please check your dm.`)
        }
        // console.log(m.author)
        sendExchEmbed(1, m.author)
    }
}

m.set(e.name, e)

export default m