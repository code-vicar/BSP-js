export class Rectangle  {
    constructor({
        origin,
        size,
    }) {
        this._origin = {
            ...origin
        }
        this._size = {
            ...size
        }
    }

    get origin() {
        return this._origin
    }

    get size() {
        return this._size
    }

    updateOrigin({
        x,
        y
    } = this._origin) {
        this._origin = {
            x,
            y
        }
        return this
    }

    updateSize({
        height,
        width
    } = this._size) {
        this._size = {
            height,
            width
        }
        return this
    }

    splitHorizontal(splitPositionY) {
        if (splitPositionY <= 0 || (splitPositionY >= this.size.height)) {
            throw new Error('Split position is out of range of rectangle size')
        }
        const first = new Rectangle({
            origin: this.origin,
            size: {
                height: splitPositionY,
                width: this.size.width,
            },
        })

        const second = new Rectangle({
            origin: {
                x: this.origin.x,
                y: this.origin.y + splitPositionY
            },
            size: {
                height: this.size.height - splitPositionY,
                width: this.size.width
            }
        })

        return [
            first,
            second
        ]
    }

    splitVertical(splitPositionX) {
        if (splitPositionX <= 0 || (splitPositionX >= this.size.width)) {
            throw new Error('Split position is out of range of rectangle size')
        }
        const first = new Rectangle({
            origin: this.origin,
            size: {
                height: this.size.height,
                width: splitPositionX,
            },
        })

        const second = new Rectangle({
            origin: {
                x: this.origin.x + splitPositionX,
                y: this.origin.y
            },
            size: {
                height: this.size.height,
                width: this.size.width - splitPositionX
            }
        })

        return [
            first,
            second
        ]
    }
}
