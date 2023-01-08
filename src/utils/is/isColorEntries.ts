import { type ColorEntries } from '../../types/color.js';
import isObject from '@vicgutt/isjs/isObject';
import isString from '@vicgutt/isjs/isString';
import isFunction from '@vicgutt/isjs/isFunction';

export default function isColorEntries(value: unknown): value is ColorEntries {
    if (!isObject(value)) {
        return false;
    }

    for (const val of Object.values(value)) {
        if (!isString(val) && !isFunction(val)) {
            return false;
        }
    }

    return true;
}
