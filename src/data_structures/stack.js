export class Stack {
    constructor() {
        this.container = []
    }

    get length() {
        return this.container.length;
    }

    push(val) {
        this.container.unshift(val)
    }

    pop() {
        if (this.container.length > 0) {
            return (Array.prototype.splice.call(this.container, 0, 1))[0]
        }
        return null
    }

    peek() {
        if (this.container.length > 0) {
            return this.container[0]
        }
        return null
    }
}
