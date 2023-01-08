import { type NumericHslChannels } from '../../types/color.js';
import isObject from '@vicgutt/isjs/isObject';
import isNumber from '@vicgutt/isjs/isNumber';

export default function isHslChannels(value: unknown): value is NumericHslChannels {
    if (!isObject(value)) {
        return false;
    }

    return isNumber(value.h) && isNumber(value.s) && isNumber(value.l);
}
