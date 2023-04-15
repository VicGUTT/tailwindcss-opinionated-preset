import { describe, it, expect } from 'vitest';
import tailwindColors from 'tailwindcss/colors.js';
import isString from '@vicgutt/isjs/isString';
import isFunction from '@vicgutt/isjs/isFunction';
import makeThemeColorCollection from '../../../../src/utils/plugins/colors/makeThemeColorCollection.js';
import COLOR_NAMES_EXCLUSES from '../../../../src/constants/COLOR_NAMES_EXCLUSES.js';
import { ColorCollection } from '../../../../src/types/color.js';

const colors = {
    inherit: tailwindColors.inherit,
    current: tailwindColors.current,
    transparent: tailwindColors.transparent,
    black: tailwindColors.black,
    white: tailwindColors.white,
    primary: tailwindColors.pink,
    secondary: tailwindColors.amber,
};

describe('utils/plugins/colors/makeThemeColorCollection', () => {
    it('works', () => {
        expect(_(makeThemeColorCollection({ primary: colors.primary, secondary: colors.secondary }))).toEqual({
            primary: {
                '50': 'hsl(var(--primary-50, 327.273deg 73.333% 97.059%) / <alpha-value>)',
                '100': 'hsl(var(--primary-100, 325.714deg 77.778% 94.706%) / <alpha-value>)',
                '200': 'hsl(var(--primary-200, 325.909deg 84.615% 89.804%) / <alpha-value>)',
                '300': 'hsl(var(--primary-300, 327.407deg 87.097% 81.765%) / <alpha-value>)',
                '400': 'hsl(var(--primary-400, 328.615deg 85.526% 70.196%) / <alpha-value>)',
                '500': 'hsl(var(--primary-500, 330.366deg 81.188% 60.392%) / <alpha-value>)',
                '600': 'hsl(var(--primary-600, 333.333deg 71.429% 50.588%) / <alpha-value>)',
                '700': 'hsl(var(--primary-700, 335.060deg 77.570% 41.961%) / <alpha-value>)',
                '800': 'hsl(var(--primary-800, 335.821deg 74.444% 35.294%) / <alpha-value>)',
                '900': 'hsl(var(--primary-900, 335.888deg 69.032% 30.392%) / <alpha-value>)',
                '950': 'hsl(var(--primary-950, 336.164deg 83.908% 17.059%) / <alpha-value>)',
            },
            secondary: {
                '50': 'hsl(var(--secondary-50, 48.000deg 100.000% 96.078%) / <alpha-value>)',
                '100': 'hsl(var(--secondary-100, 48.000deg 96.491% 88.824%) / <alpha-value>)',
                '200': 'hsl(var(--secondary-200, 48.000deg 96.639% 76.667%) / <alpha-value>)',
                '300': 'hsl(var(--secondary-300, 45.943deg 96.685% 64.510%) / <alpha-value>)',
                '400': 'hsl(var(--secondary-400, 43.256deg 96.413% 56.275%) / <alpha-value>)',
                '500': 'hsl(var(--secondary-500, 37.692deg 92.126% 50.196%) / <alpha-value>)',
                '600': 'hsl(var(--secondary-600, 32.133deg 94.619% 43.725%) / <alpha-value>)',
                '700': 'hsl(var(--secondary-700, 25.965deg 90.476% 37.059%) / <alpha-value>)',
                '800': 'hsl(var(--secondary-800, 22.727deg 82.500% 31.373%) / <alpha-value>)',
                '900': 'hsl(var(--secondary-900, 21.714deg 77.778% 26.471%) / <alpha-value>)',
                '950': 'hsl(var(--secondary-950, 20.909deg 91.667% 14.118%) / <alpha-value>)',
            },
        });
    });

    it('can be instructed to not set default colors', () => {
        expect(
            _(
                makeThemeColorCollection(
                    { primary: colors.primary, secondary: colors.secondary },
                    { withDefaultCssVarValue: false }
                )
            )
        ).toEqual({
            primary: {
                '50': 'hsl(var(--primary-50) / <alpha-value>)',
                '100': 'hsl(var(--primary-100) / <alpha-value>)',
                '200': 'hsl(var(--primary-200) / <alpha-value>)',
                '300': 'hsl(var(--primary-300) / <alpha-value>)',
                '400': 'hsl(var(--primary-400) / <alpha-value>)',
                '500': 'hsl(var(--primary-500) / <alpha-value>)',
                '600': 'hsl(var(--primary-600) / <alpha-value>)',
                '700': 'hsl(var(--primary-700) / <alpha-value>)',
                '800': 'hsl(var(--primary-800) / <alpha-value>)',
                '900': 'hsl(var(--primary-900) / <alpha-value>)',
                '950': 'hsl(var(--primary-950) / <alpha-value>)',
            },
            secondary: {
                '50': 'hsl(var(--secondary-50) / <alpha-value>)',
                '100': 'hsl(var(--secondary-100) / <alpha-value>)',
                '200': 'hsl(var(--secondary-200) / <alpha-value>)',
                '300': 'hsl(var(--secondary-300) / <alpha-value>)',
                '400': 'hsl(var(--secondary-400) / <alpha-value>)',
                '500': 'hsl(var(--secondary-500) / <alpha-value>)',
                '600': 'hsl(var(--secondary-600) / <alpha-value>)',
                '700': 'hsl(var(--secondary-700) / <alpha-value>)',
                '800': 'hsl(var(--secondary-800) / <alpha-value>)',
                '900': 'hsl(var(--secondary-900) / <alpha-value>)',
                '950': 'hsl(var(--secondary-950) / <alpha-value>)',
            },
        });
    });

    it('can "not touch" a given color entry', () => {
        expect(
            _(makeThemeColorCollection(colors, { untouchableColorNames: [...COLOR_NAMES_EXCLUSES, 'secondary'] }))
        ).toEqual({
            inherit: tailwindColors.inherit,
            current: tailwindColors.current,
            transparent: tailwindColors.transparent,
            black: tailwindColors.black,
            white: tailwindColors.white,
            primary: {
                '50': 'hsl(var(--primary-50, 327.273deg 73.333% 97.059%) / <alpha-value>)',
                '100': 'hsl(var(--primary-100, 325.714deg 77.778% 94.706%) / <alpha-value>)',
                '200': 'hsl(var(--primary-200, 325.909deg 84.615% 89.804%) / <alpha-value>)',
                '300': 'hsl(var(--primary-300, 327.407deg 87.097% 81.765%) / <alpha-value>)',
                '400': 'hsl(var(--primary-400, 328.615deg 85.526% 70.196%) / <alpha-value>)',
                '500': 'hsl(var(--primary-500, 330.366deg 81.188% 60.392%) / <alpha-value>)',
                '600': 'hsl(var(--primary-600, 333.333deg 71.429% 50.588%) / <alpha-value>)',
                '700': 'hsl(var(--primary-700, 335.060deg 77.570% 41.961%) / <alpha-value>)',
                '800': 'hsl(var(--primary-800, 335.821deg 74.444% 35.294%) / <alpha-value>)',
                '900': 'hsl(var(--primary-900, 335.888deg 69.032% 30.392%) / <alpha-value>)',
                '950': 'hsl(var(--primary-950, 336.164deg 83.908% 17.059%) / <alpha-value>)',
            },
            secondary: tailwindColors.amber,
        });
    });

    it('can be instructed to not expose colors as a Tailwind "opacity value factory"', () => {
        expect(
            _(
                makeThemeColorCollection(
                    { primary: colors.primary, secondary: colors.secondary },
                    { colorWithOpacityValueFactory: false }
                )
            )
        ).toEqual({
            primary: {
                '50': 'hsl(var(--primary-50, 327.273deg 73.333% 97.059%) / <alpha-value>)',
                '100': 'hsl(var(--primary-100, 325.714deg 77.778% 94.706%) / <alpha-value>)',
                '200': 'hsl(var(--primary-200, 325.909deg 84.615% 89.804%) / <alpha-value>)',
                '300': 'hsl(var(--primary-300, 327.407deg 87.097% 81.765%) / <alpha-value>)',
                '400': 'hsl(var(--primary-400, 328.615deg 85.526% 70.196%) / <alpha-value>)',
                '500': 'hsl(var(--primary-500, 330.366deg 81.188% 60.392%) / <alpha-value>)',
                '600': 'hsl(var(--primary-600, 333.333deg 71.429% 50.588%) / <alpha-value>)',
                '700': 'hsl(var(--primary-700, 335.060deg 77.570% 41.961%) / <alpha-value>)',
                '800': 'hsl(var(--primary-800, 335.821deg 74.444% 35.294%) / <alpha-value>)',
                '900': 'hsl(var(--primary-900, 335.888deg 69.032% 30.392%) / <alpha-value>)',
                '950': 'hsl(var(--primary-950, 336.164deg 83.908% 17.059%) / <alpha-value>)',
            },
            secondary: {
                '50': 'hsl(var(--secondary-50, 48.000deg 100.000% 96.078%) / <alpha-value>)',
                '100': 'hsl(var(--secondary-100, 48.000deg 96.491% 88.824%) / <alpha-value>)',
                '200': 'hsl(var(--secondary-200, 48.000deg 96.639% 76.667%) / <alpha-value>)',
                '300': 'hsl(var(--secondary-300, 45.943deg 96.685% 64.510%) / <alpha-value>)',
                '400': 'hsl(var(--secondary-400, 43.256deg 96.413% 56.275%) / <alpha-value>)',
                '500': 'hsl(var(--secondary-500, 37.692deg 92.126% 50.196%) / <alpha-value>)',
                '600': 'hsl(var(--secondary-600, 32.133deg 94.619% 43.725%) / <alpha-value>)',
                '700': 'hsl(var(--secondary-700, 25.965deg 90.476% 37.059%) / <alpha-value>)',
                '800': 'hsl(var(--secondary-800, 22.727deg 82.500% 31.373%) / <alpha-value>)',
                '900': 'hsl(var(--secondary-900, 21.714deg 77.778% 26.471%) / <alpha-value>)',
                '950': 'hsl(var(--secondary-950, 20.909deg 91.667% 14.118%) / <alpha-value>)',
            },
        });
    });
});

function _(collection: ColorCollection): ColorCollection {
    return Object.entries(collection).reduce((acc, [name, entries]) => {
        if (isString(entries)) {
            acc[name] = entries;

            return acc;
        }

        Object.entries(entries).forEach(([key, value]) => {
            if (isFunction(value)) {
                value = value({ opacityValue: '<alpha-value>' });
            }

            acc[name] = {
                ...(acc[name] ?? {}),
                [key]: value,
            };
        });

        return acc;
    }, {});
}
