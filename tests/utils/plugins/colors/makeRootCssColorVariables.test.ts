import { describe, it, expect } from 'vitest';
import tailwindColors from 'tailwindcss/colors.js';
import { TinyColor } from '@ctrl/tinycolor';
import COLOR_NAMES_EXCLUSES from '../../../../src/constants/COLOR_NAMES_EXCLUSES.js';
import ColorException from '../../../../src/Exceptions/ColorException.js';
import makeRootCssColorVariables from '../../../../src/utils/plugins/colors/makeRootCssColorVariables.js';
import Palette from '../../../../src/Support/Palette.js';

const colors = {
    inherit: tailwindColors.inherit,
    current: tailwindColors.current,
    transparent: tailwindColors.transparent,
    black: tailwindColors.black,
    white: tailwindColors.white,
    primary: tailwindColors.pink,
    secondary: tailwindColors.amber,
};
const yoloColor = {
    50: 'hsl(var(--yolo-50))',
    100: 'hsl(var(--yolo-100) / 0.5)',
    200: 'hsl(var(--yolo-200) / var(--tw-bg-opacity))',

    300: 'hsl(var(--yolo-300, #fff300))',
    400: 'hsl(var(--yolo-400, #fff400) / 0.5)',
    500: 'hsl(var(--yolo-500, #fff500) / var(--tw-bg-opacity))',

    600: 'hsl(var(--yolo-600))',
    700: 'hsl(var(--yolo-700) / var(--tw-bg-opacity))',
    800: 'hsl(var(--yolo-800, #fff800))',
    900: 'hsl(var(--yolo-900, #fff900) / 0.5)',
};

describe('utils/plugins/colors/makeRootCssColorVariables', () => {
    it('works', () => {
        expect(makeRootCssColorVariables({ primary: colors.primary, secondary: colors.secondary }, {})).toEqual({
            '--primary-50': '327.273deg 73.333% 97.059%',
            '--primary-100': '325.714deg 77.778% 94.706%',
            '--primary-200': '325.909deg 84.615% 89.804%',
            '--primary-300': '327.407deg 87.097% 81.765%',
            '--primary-400': '328.615deg 85.526% 70.196%',
            '--primary-500': '330.366deg 81.188% 60.392%',
            '--primary-600': '333.333deg 71.429% 50.588%',
            '--primary-700': '335.060deg 77.570% 41.961%',
            '--primary-800': '335.821deg 74.444% 35.294%',
            '--primary-900': '335.888deg 69.032% 30.392%',
            '--secondary-50': '48.000deg 100.000% 96.078%',
            '--secondary-100': '48.000deg 96.491% 88.824%',
            '--secondary-200': '48.000deg 96.639% 76.667%',
            '--secondary-300': '45.943deg 96.685% 64.510%',
            '--secondary-400': '43.256deg 96.413% 56.275%',
            '--secondary-500': '37.692deg 92.126% 50.196%',
            '--secondary-600': '32.133deg 94.619% 43.725%',
            '--secondary-700': '25.965deg 90.476% 37.059%',
            '--secondary-800': '22.727deg 82.500% 31.373%',
            '--secondary-900': '21.714deg 77.778% 26.471%',
        });

        expect(makeRootCssColorVariables({ primary: colors.primary, secondary: colors.secondary }, {})).toEqual({
            '--primary-50': colorToHslStringChannels(colors.primary[50]),
            '--primary-100': colorToHslStringChannels(colors.primary[100]),
            '--primary-200': colorToHslStringChannels(colors.primary[200]),
            '--primary-300': colorToHslStringChannels(colors.primary[300]),
            '--primary-400': colorToHslStringChannels(colors.primary[400]),
            '--primary-500': colorToHslStringChannels(colors.primary[500]),
            '--primary-600': colorToHslStringChannels(colors.primary[600]),
            '--primary-700': colorToHslStringChannels(colors.primary[700]),
            '--primary-800': colorToHslStringChannels(colors.primary[800]),
            '--primary-900': colorToHslStringChannels(colors.primary[900]),
            '--secondary-50': colorToHslStringChannels(colors.secondary[50]),
            '--secondary-100': colorToHslStringChannels(colors.secondary[100]),
            '--secondary-200': colorToHslStringChannels(colors.secondary[200]),
            '--secondary-300': colorToHslStringChannels(colors.secondary[300]),
            '--secondary-400': colorToHslStringChannels(colors.secondary[400]),
            '--secondary-500': colorToHslStringChannels(colors.secondary[500]),
            '--secondary-600': colorToHslStringChannels(colors.secondary[600]),
            '--secondary-700': colorToHslStringChannels(colors.secondary[700]),
            '--secondary-800': colorToHslStringChannels(colors.secondary[800]),
            '--secondary-900': colorToHslStringChannels(colors.secondary[900]),
        });

        expect(makeRootCssColorVariables({ primary: Palette.from(colors.primary) }, {})).toEqual({
            '--primary-50': '330.366deg 81.188% 95.000%',
            '--primary-100': '330.366deg 81.188% 90.000%',
            '--primary-200': '330.366deg 81.188% 80.000%',
            '--primary-300': '330.366deg 81.188% 70.000%',
            '--primary-400': '330.366deg 81.188% 60.000%',
            '--primary-500': '330.366deg 81.188% 50.000%',
            '--primary-600': '330.366deg 81.188% 40.000%',
            '--primary-700': '330.366deg 81.188% 30.000%',
            '--primary-800': '330.366deg 81.188% 20.000%',
            '--primary-900': '330.366deg 81.188% 14.000%',
            '--primary-1000': '330.366deg 81.188% 8.000%',
        });
    });

    it('can exclude a given color entry', () => {
        expect(makeRootCssColorVariables(colors, {}, [...COLOR_NAMES_EXCLUSES, 'secondary'])).toEqual({
            '--primary-50': colorToHslStringChannels(colors.primary[50]),
            '--primary-100': colorToHslStringChannels(colors.primary[100]),
            '--primary-200': colorToHslStringChannels(colors.primary[200]),
            '--primary-300': colorToHslStringChannels(colors.primary[300]),
            '--primary-400': colorToHslStringChannels(colors.primary[400]),
            '--primary-500': colorToHslStringChannels(colors.primary[500]),
            '--primary-600': colorToHslStringChannels(colors.primary[600]),
            '--primary-700': colorToHslStringChannels(colors.primary[700]),
            '--primary-800': colorToHslStringChannels(colors.primary[800]),
            '--primary-900': colorToHslStringChannels(colors.primary[900]),
        });
    });

    it('can use the provided original colors and CSS variable default values as fallback', () => {
        const originalColors = {
            ...colors,
            yolo: {
                50: '#ffff50',
                100: '#fff100',
                200: '#fff200',
                300: '#fff300',
                400: '#fff400',
                500: '#fff500',
                600: '#fff600',
                700: '#fff700',
                800: '#fff800',
                900: '#fff900',
            },
        };
        const _colors = {
            ...colors,
            yolo: yoloColor,
        };

        expect(
            makeRootCssColorVariables(_colors, originalColors, [...COLOR_NAMES_EXCLUSES, 'primary', 'secondary'])
        ).toEqual({
            '--yolo-50': colorToHslStringChannels('#ffff50'),
            '--yolo-100': colorToHslStringChannels('#fff100'),
            '--yolo-200': colorToHslStringChannels('#fff200'),
            '--yolo-300': colorToHslStringChannels('#fff300'),
            '--yolo-400': colorToHslStringChannels('#fff400'),
            '--yolo-500': colorToHslStringChannels('#fff500'),
            '--yolo-600': colorToHslStringChannels('#fff600'),
            '--yolo-700': colorToHslStringChannels('#fff700'),
            '--yolo-800': colorToHslStringChannels('#fff800'),
            '--yolo-900': colorToHslStringChannels('#fff900'),
        });
    });

    it("can extract and use a CSS variable's default value", () => {
        const originalColors = {
            ...colors,
            yolo: {
                50: '#ffff50',
                100: '#fff100',
                200: '#fff200',
                600: '#fff600',
                700: '#fff700',
            },
        };
        const _colors = {
            ...colors,
            yolo: yoloColor,
        };

        expect(makeRootCssColorVariables(_colors, originalColors, ['primary', 'secondary'])).toEqual({
            '--yolo-50': colorToHslStringChannels('#ffff50'),
            '--yolo-100': colorToHslStringChannels('#fff100'),
            '--yolo-200': colorToHslStringChannels('#fff200'),
            '--yolo-300': colorToHslStringChannels('#fff300'),
            '--yolo-400': colorToHslStringChannels('#fff400'),
            '--yolo-500': colorToHslStringChannels('#fff500'),
            '--yolo-600': colorToHslStringChannels('#fff600'),
            '--yolo-700': colorToHslStringChannels('#fff700'),
            '--yolo-800': colorToHslStringChannels('#fff800'),
            '--yolo-900': colorToHslStringChannels('#fff900'),
        });
    });

    it('will throw an exception if no suitable value could be determined to be used as a `:root {}` property', () => {
        const originalColors = {
            ...colors,
            yolo: {
                100: '#fff100',
                200: '#fff200',
                600: '#fff600',
                700: '#fff700',
            },
        };
        const _colors = {
            ...colors,
            yolo: yoloColor,
        };

        expect(() => makeRootCssColorVariables(_colors, originalColors, ['primary', 'secondary'])).toThrow(
            ColorException
        );
        expect(() => makeRootCssColorVariables(_colors, originalColors, ['primary', 'secondary'])).toThrow(
            /The provided color entry: `{(.*)}` has a value unsuitable to be set as a `:root {}` property./
        );
    });
});

function colorToHslStringChannels(color: string) {
    const format = (value: number) => value.toFixed(3);

    return Object.entries(new TinyColor(color).toHsl())
        .filter(([key]) => key !== 'a')
        .map(([key, value]) => `${key === 'h' ? format(value) : format(value * 100)}${key === 'h' ? 'deg' : '%'}`)
        .join(' ');
}
