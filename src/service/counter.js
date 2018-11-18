export class Counter {
    constructor(base = 1) {
        this.counter = base
    }

    next() {
        return this.counter++
    }
}
