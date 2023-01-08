import { describe, it, expect } from 'vitest';
import walkColorCollection from '../../src/utils/walkColorCollection.js';

describe('utils/walkColorCollection', () => {
    it('works', () => {
        const colors = {
            white: '#fff',
            primary: {
                '50': '#fdf2f8',
                '100': '#fce7f3',
                '200': '#fbcfe8',
                '300': '#f9a8d4',
                '400': '#f472b6',
                500: '#ec4899',
                600: '#db2777',
                700: '#be185d',
                800: '#9d174d',
                900: '#831843',
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allParams: any[] = [];

        walkColorCollection(colors, (color) => {
            allParams.push({
                name: color.name,
                shade: color.shade,
                rawValue: color.rawValue,
                cssVarName: color.cssVarName,
                hslStringChannels: color.toHslStringChannels(),
                colorWithOpacityValue: color.toColorWithOpacityValue(),
            });
        });

        expect(JSON.stringify(allParams)).toEqual(
            JSON.stringify([
                {
                    name: 'white',
                    shade: null,
                    rawValue: '#fff',
                    cssVarName: '--white',
                    hslStringChannels: '0.000deg 0.000% 100.000%',
                    colorWithOpacityValue: 'hsl(var(--white, 0.000deg 0.000% 100.000%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '50',
                    rawValue: '#fdf2f8',
                    cssVarName: '--primary-50',
                    hslStringChannels: '327.273deg 73.333% 97.059%',
                    colorWithOpacityValue: 'hsl(var(--primary-50, 327.273deg 73.333% 97.059%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '100',
                    rawValue: '#fce7f3',
                    cssVarName: '--primary-100',
                    hslStringChannels: '325.714deg 77.778% 94.706%',
                    colorWithOpacityValue: 'hsl(var(--primary-100, 325.714deg 77.778% 94.706%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '200',
                    rawValue: '#fbcfe8',
                    cssVarName: '--primary-200',
                    hslStringChannels: '325.909deg 84.615% 89.804%',
                    colorWithOpacityValue: 'hsl(var(--primary-200, 325.909deg 84.615% 89.804%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '300',
                    rawValue: '#f9a8d4',
                    cssVarName: '--primary-300',
                    hslStringChannels: '327.407deg 87.097% 81.765%',
                    colorWithOpacityValue: 'hsl(var(--primary-300, 327.407deg 87.097% 81.765%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '400',
                    rawValue: '#f472b6',
                    cssVarName: '--primary-400',
                    hslStringChannels: '328.615deg 85.526% 70.196%',
                    colorWithOpacityValue: 'hsl(var(--primary-400, 328.615deg 85.526% 70.196%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '500',
                    rawValue: '#ec4899',
                    cssVarName: '--primary-500',
                    hslStringChannels: '330.366deg 81.188% 60.392%',
                    colorWithOpacityValue: 'hsl(var(--primary-500, 330.366deg 81.188% 60.392%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '600',
                    rawValue: '#db2777',
                    cssVarName: '--primary-600',
                    hslStringChannels: '333.333deg 71.429% 50.588%',
                    colorWithOpacityValue: 'hsl(var(--primary-600, 333.333deg 71.429% 50.588%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '700',
                    rawValue: '#be185d',
                    cssVarName: '--primary-700',
                    hslStringChannels: '335.060deg 77.570% 41.961%',
                    colorWithOpacityValue: 'hsl(var(--primary-700, 335.060deg 77.570% 41.961%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '800',
                    rawValue: '#9d174d',
                    cssVarName: '--primary-800',
                    hslStringChannels: '335.821deg 74.444% 35.294%',
                    colorWithOpacityValue: 'hsl(var(--primary-800, 335.821deg 74.444% 35.294%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '900',
                    rawValue: '#831843',
                    cssVarName: '--primary-900',
                    hslStringChannels: '335.888deg 69.032% 30.392%',
                    colorWithOpacityValue: 'hsl(var(--primary-900, 335.888deg 69.032% 30.392%) / <alpha-value>)',
                },
            ])
        );
    });

    it('will transform HSL string channels into a Hex value', () => {
        const colors = {
            white: '#fff',
            primary: {
                500: '330.366deg 81.188% 60.392%',
                600: '#db2777',
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allParams: any = [];

        walkColorCollection(colors, (color) => {
            allParams.push({
                name: color.name,
                shade: color.shade,
                rawValue: color.rawValue,
                cssVarName: color.cssVarName,
                hslStringChannels: color.toHslStringChannels(),
                colorWithOpacityValue: color.toColorWithOpacityValue(),
            });
        });

        expect(JSON.stringify(allParams)).toEqual(
            JSON.stringify([
                {
                    name: 'white',
                    shade: null,
                    rawValue: '#fff',
                    // value: '#fff',
                    cssVarName: '--white',
                    hslStringChannels: '0.000deg 0.000% 100.000%',
                    colorWithOpacityValue: 'hsl(var(--white, 0.000deg 0.000% 100.000%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '500',
                    rawValue: { h: 330.366, s: 81.188, l: 60.392 },
                    // value: '#ec4899',
                    cssVarName: '--primary-500',
                    hslStringChannels: '330.366deg 81.188% 60.392%',
                    colorWithOpacityValue: 'hsl(var(--primary-500, 330.366deg 81.188% 60.392%) / <alpha-value>)',
                },
                {
                    name: 'primary',
                    shade: '600',
                    rawValue: '#db2777',
                    // value: '#db2777',
                    cssVarName: '--primary-600',
                    hslStringChannels: '333.333deg 71.429% 50.588%',
                    colorWithOpacityValue: 'hsl(var(--primary-600, 333.333deg 71.429% 50.588%) / <alpha-value>)',
                },
            ])
        );
    });

    it('can exclude given color names', () => {
        const colors = {
            inherit: 'inherit',
            current: 'currentColor',
            white: '#fff',
            primary: {
                500: '330.366deg 81.188% 60.392%',
                600: '#db2777',
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allParams: any = [];

        walkColorCollection(
            colors,
            (color) => {
                allParams.push({
                    name: color.name,
                    shade: color.shade,
                    rawValue: color.rawValue,
                    cssVarName: color.cssVarName,
                    hslStringChannels: color.toHslStringChannels(),
                    colorWithOpacityValue: color.toColorWithOpacityValue(),
                });
            },
            ['inherit', 'current', 'primary']
        );

        expect(JSON.stringify(allParams)).toEqual(
            JSON.stringify([
                {
                    name: 'white',
                    shade: null,
                    rawValue: '#fff',
                    // value: '#fff',
                    cssVarName: '--white',
                    hslStringChannels: '0.000deg 0.000% 100.000%',
                    colorWithOpacityValue: 'hsl(var(--white, 0.000deg 0.000% 100.000%) / <alpha-value>)',
                },
            ])
        );
    });
});
