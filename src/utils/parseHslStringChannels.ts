import { type HslChannels } from '../types/color.js';

export default function parseHslStringChannels(value: string): HslChannels {
    const parts = value.split(' ').map((part) => {
        part = part.trim();

        if (part.endsWith('deg')) {
            return +part.replace('deg', '');
        }

        if (part.endsWith('%')) {
            return +part.replace('%', '');
        }

        return part;
    });

    return { h: parts[0], s: parts[1], l: parts[2] };
}
