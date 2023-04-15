import { describe, it, expect } from 'vitest';
import tailwindColors from 'tailwindcss/colors.js';
import PaletteException from '../../src/Exceptions/PaletteException.js';
import Palette from '../../src/Support/Palette.js';
import Color from '../../src/Support/Color.js';

describe('Support/Palette', () => {
    it('works | string value', () => {
        expect(Palette.from('#fff')).toEqual({
            '50': '0.000deg 0.000% 95%',
            '100': '0.000deg 0.000% 90%',
            '200': '0.000deg 0.000% 80%',
            '300': '0.000deg 0.000% 70%',
            '400': '0.000deg 0.000% 60%',
            '500': '0.000deg 0.000% 50%',
            '600': '0.000deg 0.000% 40%',
            '700': '0.000deg 0.000% 30%',
            '800': '0.000deg 0.000% 20%',
            '900': '0.000deg 0.000% 14%',
            '950': '0.000deg 0.000% 11%',
            '1000': '0.000deg 0.000% 8%',
        });

        expect(Palette.from('red')).toEqual({
            '50': '0.000deg 100.000% 95%',
            '100': '0.000deg 100.000% 90%',
            '200': '0.000deg 100.000% 80%',
            '300': '0.000deg 100.000% 70%',
            '400': '0.000deg 100.000% 60%',
            '500': '0.000deg 100.000% 50%',
            '600': '0.000deg 100.000% 40%',
            '700': '0.000deg 100.000% 30%',
            '800': '0.000deg 100.000% 20%',
            '900': '0.000deg 100.000% 14%',
            '950': '0.000deg 100.000% 11%',
            '1000': '0.000deg 100.000% 8%',
        });

        expect(Palette.from(tailwindColors.pink[500])).toEqual({
            '50': '330.366deg 81.188% 95%',
            '100': '330.366deg 81.188% 90%',
            '200': '330.366deg 81.188% 80%',
            '300': '330.366deg 81.188% 70%',
            '400': '330.366deg 81.188% 60%',
            '500': '330.366deg 81.188% 50%',
            '600': '330.366deg 81.188% 40%',
            '700': '330.366deg 81.188% 30%',
            '800': '330.366deg 81.188% 20%',
            '900': '330.366deg 81.188% 14%',
            '950': '330.366deg 81.188% 11%',
            '1000': '330.366deg 81.188% 8%',
        });
    });

    it('works | object value', () => {
        expect(Palette.from({ 500: '#fff' })).toEqual({
            '50': '0.000deg 0.000% 95%',
            '100': '0.000deg 0.000% 90%',
            '200': '0.000deg 0.000% 80%',
            '300': '0.000deg 0.000% 70%',
            '400': '0.000deg 0.000% 60%',
            '500': '0.000deg 0.000% 50%',
            '600': '0.000deg 0.000% 40%',
            '700': '0.000deg 0.000% 30%',
            '800': '0.000deg 0.000% 20%',
            '900': '0.000deg 0.000% 14%',
            '950': '0.000deg 0.000% 11%',
            '1000': '0.000deg 0.000% 8%',
        });

        expect(Palette.from({ 500: 'red' })).toEqual({
            '50': '0.000deg 100.000% 95%',
            '100': '0.000deg 100.000% 90%',
            '200': '0.000deg 100.000% 80%',
            '300': '0.000deg 100.000% 70%',
            '400': '0.000deg 100.000% 60%',
            '500': '0.000deg 100.000% 50%',
            '600': '0.000deg 100.000% 40%',
            '700': '0.000deg 100.000% 30%',
            '800': '0.000deg 100.000% 20%',
            '900': '0.000deg 100.000% 14%',
            '950': '0.000deg 100.000% 11%',
            '1000': '0.000deg 100.000% 8%',
        });

        expect(Palette.from(tailwindColors.pink)).toEqual({
            '50': '330.366deg 81.188% 95%',
            '100': '330.366deg 81.188% 90%',
            '200': '330.366deg 81.188% 80%',
            '300': '330.366deg 81.188% 70%',
            '400': '330.366deg 81.188% 60%',
            '500': '330.366deg 81.188% 50%',
            '600': '330.366deg 81.188% 40%',
            '700': '330.366deg 81.188% 30%',
            '800': '330.366deg 81.188% 20%',
            '900': '330.366deg 81.188% 14%',
            '950': '330.366deg 81.188% 11%',
            '1000': '330.366deg 81.188% 8%',
        });
    });

    it('works | Color value', () => {
        expect(Palette.from(Color.make('#fff'))).toEqual({
            '50': '0.000deg 0.000% 95%',
            '100': '0.000deg 0.000% 90%',
            '200': '0.000deg 0.000% 80%',
            '300': '0.000deg 0.000% 70%',
            '400': '0.000deg 0.000% 60%',
            '500': '0.000deg 0.000% 50%',
            '600': '0.000deg 0.000% 40%',
            '700': '0.000deg 0.000% 30%',
            '800': '0.000deg 0.000% 20%',
            '900': '0.000deg 0.000% 14%',
            '950': '0.000deg 0.000% 11%',
            '1000': '0.000deg 0.000% 8%',
        });
    });

    it('ignores fully fledged palettes', () => {
        const colors = {
            50: 'string',
            100: 'string',
            200: 'string',
            300: 'string',
            400: 'string',
            500: 'string',
            600: 'string',
            700: 'string',
            800: 'string',
            900: 'string',
            950: 'string',
            1000: 'string',
        };

        expect(Palette.from(colors)).toEqual(colors);
    });

    it('thows an error when an invalid object value is provided', () => {
        expect(() => Palette.from({ 300: '#fff' })).toThrow(PaletteException);
        expect(() => Palette.from({ 300: '#fff' })).toThrow(
            /Could not generate any colors from the provided value: `{(.*)}`./
        );

        const pink = { ...tailwindColors.pink };

        // @ts-expect-error shush
        delete pink[500];

        expect(() => Palette.from(pink)).toThrow(PaletteException);
        expect(() => Palette.from(pink)).toThrow(/Could not generate any colors from the provided value: `{(.*)}`./);
    });
});
