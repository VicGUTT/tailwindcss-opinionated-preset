import { type ColorCollection } from '../../types/color.js';
import isObject from '@vicgutt/isjs/isObject';
import isColorEntries from './isColorEntries.js';

export default function isColorCollection(value: unknown): value is ColorCollection {
    if (!isObject(value)) {
        return false;
    }

    for (const val of Object.values(value)) {
        if (!isColorEntries(val)) {
            return false;
        }
    }

    return true;
}
