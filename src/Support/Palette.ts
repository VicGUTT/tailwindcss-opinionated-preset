import { ColorParam, type ColorEntries, type PaletteColorEntries } from '../types/color.js';
import Color from './Color.js';
import PaletteException from '../Exceptions/PaletteException.js';
import isColorEntries from '../utils/is/isColorEntries.js';

const paletteKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];

export default class Palette {
    protected constructor(protected readonly _color: Color) {}

    public static from(color: Color | ColorParam | ColorEntries): PaletteColorEntries {
        if (color instanceof Color) {
            return new this(color)._generate();
        }

        if (isColorEntries(color)) {
            return Palette._fromColorEntries(color);
        }

        return new this(Color.make(color))._generate();
    }

    protected static _fromColorEntries(entries: ColorEntries): PaletteColorEntries {
        if (JSON.stringify(Object.keys(entries).map((key) => +key)) === JSON.stringify(paletteKeys)) {
            return entries as PaletteColorEntries;
        }

        if (500 in entries) {
            return new this(Color.make(entries[500]))._generate();
        }

        throw PaletteException.couldNotGenerateAPalette(JSON.stringify(entries));
    }

    protected _generate(): PaletteColorEntries {
        const hueAndSaturation = this._color.toHslStringChannels().split(' ', 2).join(' ');

        return {
            50: `${hueAndSaturation} 95%`,
            100: `${hueAndSaturation} 90%`,
            200: `${hueAndSaturation} 80%`,
            300: `${hueAndSaturation} 70%`,
            400: `${hueAndSaturation} 60%`,
            500: `${hueAndSaturation} 50%`,
            600: `${hueAndSaturation} 40%`,
            700: `${hueAndSaturation} 30%`,
            800: `${hueAndSaturation} 20%`,
            900: `${hueAndSaturation} 14%`,
            950: `${hueAndSaturation} 11%`,
            1000: `${hueAndSaturation} 8%`,
        };
    }
}
