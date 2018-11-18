import { getRandomIntInclusive } from './get_random_int_inclusive'

/*
 * rectangle: rectangle to split
 * direction: width || height
 * minLength: minimum length of a side after being split
 */
export function splitRectangleRandom(rectangle, minLength, side) {
    // multiply by 2 to get the minimum length that a side must
    // to be able to withstand a split and still result in sides >= minLength
    const unsplitMinLength = 2 * minLength

    // subtract total min size from current height and width
    // to reveal how many positions can handle a split while still
    // resulting in both halves having at least MIN_SIZE
    const splittableRange = rectangle.size[side] - unsplitMinLength;

    if (splittableRange <= 0) {
        // splitting in direction would result
        // in a side with less than minLength
        return null
    }

    const splitLocation = minLength + getRandomIntInclusive(0, splittableRange)

    if (side === 'height') {
        return rectangle.splitHorizontal(splitLocation)
    }

    return rectangle.splitVertical(splitLocation)
}
