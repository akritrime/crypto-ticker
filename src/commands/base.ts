import { Message } from "discord.js";

export interface Command {
    name: string,
    execute: (m: Message, args?: string[]) => Promise<void>
}

export const m: Map<string, Command> = new Map()
