import {exchanges} from 'ccxt'

export const CREATOR_ID = "399951813237014528" //akreitrime#7920
export const { TOKEN } = process.env
// list of all the exchanges from ccxt, divided into groups of 10.
// To prevent runnning the same code each time someone wants a list of the exchanges
class ExchangeList {
    list: string[][] = []

    init() {
        let exch_chunks = []

        let chunk = []
        for (const exch of exchanges) {
            chunk.push(exch)
            if (chunk.length == 10) {
                exch_chunks.push(chunk)
                chunk = []
            }
        }

        if (chunk.length > 0) exch_chunks.push(chunk)
        this.list = exch_chunks
    }

    get(i: number): string[] {
        return this.list[i]
    }

    len(): number {
        return this.list.length
    }
}

export const exchs = new ExchangeList()
// export exchs