import { type ColorInput, type HSL } from '@ctrl/tinycolor';

export type HslChannels = HSL;
export type NumericHslChannels = {
    h: number;
    s: number;
    l: number;
};

export type ColorEntryKey = string | number;
export type ColorEntryValueFactory = (params: { opacityValue?: number }) => string;
export type ColorEntryValue = string | ColorEntryValueFactory;
export type ColorEntries = Record<ColorEntryKey, ColorEntryValue>;
export type ColorCollectionKey = string | number;
export type ColorCollection = Record<ColorCollectionKey, ColorEntries | ColorEntryValue>;

export type ColorParam = ColorInput | ColorEntryValue /*  | ColorEntries */;
export type ColorMeta = {
    name: string;
    shade: string | number | null;
};

export type PaletteColorEntries = {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
};
