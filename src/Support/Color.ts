import {
    type NumericHslChannels,
    type HslChannels,
    type ColorParam,
    type ColorMeta,
    type PaletteColorEntries,
    type ColorEntryValueFactory,
} from '../types/color.js';
import { ColorInput, TinyColor } from '@ctrl/tinycolor';
import isUndefined from '@vicgutt/isjs/isUndefined';
import isFunction from '@vicgutt/isjs/isFunction';
import Palette from './Palette.js';
import ColorException from '../Exceptions/ColorException.js';
import extractHslStringChannels from '../utils/extractHslStringChannels.js';
import parseHslStringChannels from '../utils/parseHslStringChannels.js';
import extractCssVariableString from '../utils/extractCssVariableString.js';
import parseCssVariable from '../utils/parseCssVariable.js';
import isHslStringChannels from '../utils/is/isHslStringChannels.js';
import isCssVariableString from '../utils/is/isCssVariableString.js';
import isHslCssVariableString from '../utils/is/isHslCssVariableString.js';

export default class Color {
    protected readonly _rawValue: ColorInput;
    protected readonly _tinyColor: TinyColor;
    protected _meta: Partial<ColorMeta> = {};

    protected constructor(value: ColorInput) {
        const color = new TinyColor(value);

        if (!color.isValid) {
            throw ColorException.invalidColor(JSON.stringify(value));
        }

        this._rawValue = value;
        this._tinyColor = color;
    }

    public static make(value: ColorParam): Color {
        if (isFunction(value)) {
            value = value({});
        }

        if (isHslStringChannels(value)) {
            return Color.fromHslStringChannels(value);
        }

        if (isCssVariableString(value)) {
            return Color.fromCssVariableString(value);
        }

        if (isHslCssVariableString(value)) {
            return Color.fromHslCssVariableString(value);
        }

        return new this(value);
    }

    public static fromHslChannels(value: HslChannels): Color {
        return new this(value);
    }
    public static fromHslStringChannels(value: string): Color {
        return new this(parseHslStringChannels(extractHslStringChannels(value.trim().toLocaleLowerCase()) ?? value));
    }
    public static fromCssVariableString(value: string): Color {
        return new this(parseCssVariable(value.trim().toLocaleLowerCase())?.defaultValue ?? value);
    }
    public static fromHslCssVariableString(value: string): Color {
        value = value.trim().toLocaleLowerCase();
        value = extractCssVariableString(value) ?? value;
        value = parseCssVariable(value)?.defaultValue ?? value;

        if (isHslStringChannels(value)) {
            return new this(parseHslStringChannels(value));
        }

        return new this(value);
    }

    get name(): string {
        const name = this._meta.name ?? (this.toTinyColor().toName() || null);

        if (!name) {
            throw ColorException.missingName(JSON.stringify(this.rawValue));
        }

        return name;
    }
    get shade(): string | number | null {
        return this._meta.shade ?? null;
    }
    get rawValue(): ColorInput {
        return this._rawValue;
    }
    get cssVarName(): string {
        return this.shade ? `--${this.name}-${this.shade}` : `--${this.name}`;
    }

    public withMeta(meta: Partial<ColorMeta>): Color {
        this._meta = meta;

        return this;
    }

    public toTinyColor(): TinyColor {
        return this._tinyColor;
    }
    public toHslChannels(): NumericHslChannels {
        const hsl = this.toTinyColor().toHsl();

        return {
            h: +hsl.h.toFixed(3),
            s: +hsl.s.toFixed(3),
            l: +hsl.l.toFixed(3),
        };
    }
    public toHslStringChannels(): string {
        const hsl = this.toTinyColor().toHsl();

        return `${hsl.h.toFixed(3)}deg ${(hsl.s * 100).toFixed(3)}% ${(hsl.l * 100).toFixed(3)}%`;
    }
    public toCssVariableString(withDefaultValue = true): string {
        if (!withDefaultValue) {
            return `var(${this.cssVarName})`;
        }

        return `var(${this.cssVarName}, ${this.toHslStringChannels()})`;
    }
    public toHslCssVariableString(withDefaultValue = true, opacityValue: string | number = 1): string {
        return `hsl(${this.toCssVariableString(withDefaultValue)} / ${opacityValue})`;
    }
    public toPalette(): PaletteColorEntries {
        return Palette.from(this);
    }

    /**
     * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
     */
    public toColorWithOpacityValue(withDefaultCssVarValue = true) {
        /**
         * Note: In JS (plugins, ...) files (not CSS files),
         * when `theme('colors.primary.200')` is used, the actual
         * place holder value `hsl(var(--abc) / <alpha-value>)` will
         * be printed out.
         */
        return `hsl(${this.toCssVariableString(withDefaultCssVarValue)} / <alpha-value>)`;
    }

    /**
     * @see https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo
     */
    public toColorWithOpacityValueFactory(withDefaultCssVarValue = true): ColorEntryValueFactory {
        const cssVar = this.toCssVariableString(withDefaultCssVarValue);

        return ({ opacityValue }) => {
            if (isUndefined(opacityValue)) {
                return `hsl(${cssVar})`;
            }

            return `hsl(${cssVar} / ${opacityValue})`;
        };
    }
}
