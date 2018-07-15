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