import TinyQueue from 'tiny-queue'

export class PriorityQueue {
    private tinyQ: TinyQueue

    constructor() {
        this.tinyQ = new TinyQueue<number>([], (a, b) => { return a - b })
    }

    public push(element: number): void {
        this.tinyQ.push(element)
    }

    public pop(): number {
        return this.tinyQ.pop()
    }
}