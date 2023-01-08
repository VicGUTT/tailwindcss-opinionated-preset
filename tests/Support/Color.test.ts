import { describe, it, expect } from 'vitest';
import { TinyColor } from '@ctrl/tinycolor';
import Color from '../../src/Support/Color.js';
import ColorException from '../../src/Exceptions/ColorException.js';

describe('Support/Color', () => {
    it('throw an exception when an invalid color is passed in', () => {
        // @ts-expect-error Yeah yeah I know the constructor is protected
        expect(() => new Color('nope')).toThrow(ColorException);
        // @ts-expect-error Yeah yeah I know the constructor is protected
        expect(() => new Color('nope')).toThrow('The provided color `"nope"` is invalid.');
    });

    it('::make | throws an exception when an invalid color is passed in', () => {
        expect(() => Color.make('nope')).toThrow(ColorException);
        expect(() => Color.make('nope')).toThrow('The provided color `"nope"` is invalid.');
    });

    it('::make | constructs in instance of itself from a given string value', () => {
        const color = Color.make('#fff');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#ffffff');
    });

    it('::make | constructs in instance of itself from a given HSL channels object value', () => {
        const color = Color.make({ h: 0, s: 0, l: 1 });

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#ffffff');
    });

    it('::make | constructs in instance of itself from a given HSL string channels value', () => {
        const color = Color.make('0deg 0% 100%');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#ffffff');
    });

    it('::make | constructs in instance of itself from a given CSS variable string value containing a default value', () => {
        const color = Color.make('VAR(--hey, #fff)');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#ffffff');
    });

    it('::make | constructs in instance of itself from a given HSL CSS variable string value containing a default value', () => {
        const color = Color.make('HSL(VAR(--hey, #fff))');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#ffffff');
    });

    it('::make | constructs in instance of itself from a given value factory', () => {
        const color = Color.make((...params) => `#fff${params.join('').replace('[object Object]', '')}`);

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#ffffff');
    });

    // it('::make | constructs in instance of itself from a given color entries', () => {
    //     // ...
    // });

    it('::fromHslChannels | constructs in instance of itself', () => {
        const color = Color.fromHslChannels({ h: 210, s: 17, l: 82 });

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#c9d1d9');
    });

    it('::fromHslStringChannels | constructs in instance of itself', () => {
        const color = Color.fromHslStringChannels('hsl(210deg 17% 82%)');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#c9d1d9');
    });

    it('::fromHslStringChannels | throw an exception when invalid HSL string channels are passed in', () => {
        expect(() => Color.fromHslStringChannels('nope')).toThrow(ColorException);
        expect(() => Color.fromHslStringChannels('nope')).toThrow('The provided color `{"h":"nope"}` is invalid.');

        expect(() => Color.fromHslStringChannels('hsl(nope)')).toThrow(ColorException);
        expect(() => Color.fromHslStringChannels('hsl(nope)')).toThrow('The provided color `{"h":"nope"}` is invalid.');
    });

    it('::fromCssVariableString | constructs in instance of itself', () => {
        const color = Color.fromCssVariableString('var(--primary-100, #c9d1d9)');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#c9d1d9');
    });

    it('::fromCssVariableString | throw an exception when invalid CSS variables are passed in', () => {
        expect(() => Color.fromCssVariableString('nope')).toThrow(ColorException);
        expect(() => Color.fromCssVariableString('nope')).toThrow('The provided color `"nope"` is invalid.');

        expect(() => Color.fromCssVariableString('var(nope)')).toThrow(ColorException);
        expect(() => Color.fromCssVariableString('var(nope)')).toThrow('The provided color `"var(nope)"` is invalid.');

        expect(() => Color.fromCssVariableString('var(--primary-100)')).toThrow(ColorException);
        expect(() => Color.fromCssVariableString('var(--primary-100)')).toThrow(
            'The provided color `"var(--primary-100)"` is invalid.'
        );
    });

    it('::fromHslCssVariableString | constructs in instance of itself', () => {
        let color = Color.fromHslCssVariableString('hsl(var(--primary-100, #c9d1d9) / var(--tw-bg-opacity))');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#c9d1d9');

        color = Color.fromHslCssVariableString('hsl(var(--primary-100, 210deg 17.4% 82%) / var(--tw-bg-opacity))');

        expect(color instanceof Color).toEqual(true);
        expect(color.toTinyColor().toHexString()).toEqual('#c9d1d9');

        expect(() => Color.fromHslCssVariableString('hsl(ar(--primary-100, #c9d1d9))')).toThrow(
            'The provided color `"hsl(ar(--primary-100, #c9d1d9))"` is invalid.'
        );
        expect(() => Color.fromHslCssVariableString('hsl(var(--primary-100))')).toThrow(
            'The provided color `"var(--primary-100)"` is invalid.'
        );
    });

    it(".name | can retrieve the color's given or determined name when possible", () => {
        expect(Color.make('#fff').name).toEqual('white');
        expect(Color.make('white').name).toEqual('white');

        expect(Color.make('#c9d1d9').withMeta({ name: 'yolo' }).name).toEqual('yolo');
    });

    it('.name | it throws an error when no name was given or none could be determined', () => {
        expect(() => Color.make('#c9d1d9').name).toThrow(ColorException);
        expect(() => Color.make('#c9d1d9').name).toThrow(
            'The color `"#c9d1d9"` was not provided a name, nor could one be determined.'
        );
    });

    it(".shade | can retrieve the color's given shade if any", () => {
        expect(Color.make('#fff').shade).toEqual(null);
        expect(Color.make('#fff').withMeta({ shade: 500 }).shade).toEqual(500);
        expect(Color.make('#fff').withMeta({ shade: 'yolo' }).shade).toEqual('yolo');
    });

    it(".rawValue | can retrieve the color's raw value", () => {
        expect(Color.make('#fff').rawValue).toEqual('#fff');
        expect(Color.make({ h: 123, s: 12, l: 19 }).rawValue).toEqual({ h: 123, s: 12, l: 19 });
        expect(Color.make({ h: '329', s: '54', l: '32' }).rawValue).toEqual({ h: '329', s: '54', l: '32' });
    });

    it(".cssVarName | can retrieve the color's determined CSS variable name when possible", () => {
        expect(Color.make('#fff').cssVarName).toEqual('--white');
        expect(Color.make('white').cssVarName).toEqual('--white');

        expect(Color.make('#c9d1d9').withMeta({ name: 'yolo' }).cssVarName).toEqual('--yolo');
        expect(Color.make('#c9d1d9').withMeta({ name: 'yolo', shade: 500 }).cssVarName).toEqual('--yolo-500');
        expect(Color.make('#c9d1d9').withMeta({ name: 'yolo', shade: 'yep' }).cssVarName).toEqual('--yolo-yep');
    });

    it('.cssVarName | it throws an error when no name was given or none could be determined', () => {
        expect(() => Color.make('#c9d1d9').cssVarName).toThrow(ColorException);
        expect(() => Color.make('#c9d1d9').cssVarName).toThrow(
            'The color `"#c9d1d9"` was not provided a name, nor could one be determined.'
        );
    });

    it('@toTinyColor | can be converted to an instance of "TinyColor"', () => {
        const color = Color.make('#fff').toTinyColor();

        expect(color instanceof TinyColor).toEqual(true);
        expect(color.toHexString()).toEqual('#ffffff');
    });

    it('@toHslChannels | can be converted to HSL channels', () => {
        expect(Color.make('#fff').toHslChannels()).toEqual({ h: 0, s: 0, l: 1 });
        expect(Color.make('#000').toHslChannels()).toEqual({ h: 0, s: 0, l: 0 });
        expect(Color.make('red').toHslChannels()).toEqual({ h: 0, s: 1, l: 0.5 });
        expect(Color.make('#c9d1d9').toHslChannels()).toEqual({ h: 210, s: 0.174, l: 0.82 });
    });

    it('@toHslStringChannels | can be converted to HSL string channels', () => {
        expect(Color.make('#fff').toHslStringChannels()).toEqual('0.000deg 0.000% 100.000%');
        expect(Color.make('#000').toHslStringChannels()).toEqual('0.000deg 0.000% 0.000%');
        expect(Color.make('red').toHslStringChannels()).toEqual('0.000deg 100.000% 50.000%');
        expect(Color.make('#c9d1d9').toHslStringChannels()).toEqual('210.000deg 17.391% 81.961%');
    });

    it('@toCssVariableString | can be converted to an HSL string channels', () => {
        expect(Color.make('#fff').toCssVariableString(false)).toEqual('var(--white)');
        expect(Color.make('#fff').toCssVariableString(true)).toEqual('var(--white, 0.000deg 0.000% 100.000%)');

        expect(Color.make('#fff').withMeta({ name: 'yolo' }).toCssVariableString(false)).toEqual('var(--yolo)');
        expect(Color.make('#fff').withMeta({ name: 'yolo' }).toCssVariableString(true)).toEqual(
            'var(--yolo, 0.000deg 0.000% 100.000%)'
        );
    });

    it('@toHslCssVariableString | can be converted to an HSL string channels', () => {
        expect(Color.make('#fff').toHslCssVariableString(false)).toEqual('hsl(var(--white) / 1)');
        expect(Color.make('#fff').toHslCssVariableString(true)).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / 1)'
        );

        expect(Color.make('#fff').toHslCssVariableString(true, 0.5)).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / 0.5)'
        );
        expect(Color.make('#fff').toHslCssVariableString(true, '<yolo>')).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / <yolo>)'
        );

        expect(Color.make('#fff').withMeta({ name: 'white' }).toHslCssVariableString(true, 0.5)).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / 0.5)'
        );
        expect(Color.make('#fff').withMeta({ name: 'white' }).toHslCssVariableString(true, '<yolo>')).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / <yolo>)'
        );

        expect(Color.make('#fff').withMeta({ name: 'yo' }).toHslCssVariableString(true, 0.5)).toEqual(
            'hsl(var(--yo, 0.000deg 0.000% 100.000%) / 0.5)'
        );
        expect(Color.make('#fff').withMeta({ name: 'yo' }).toHslCssVariableString(true, '<yolo>')).toEqual(
            'hsl(var(--yo, 0.000deg 0.000% 100.000%) / <yolo>)'
        );
    });

    it('@toPalette | can be converted to a "palette"', () => {
        expect(Color.make('#fff').toPalette()).toEqual({
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
            '1000': '0.000deg 0.000% 8%',
        });
    });

    it('@toColorWithOpacityValue | can be converted to a Tailwind compatible "color with opacity value" string', () => {
        expect(Color.make('#fff').toColorWithOpacityValue(false)).toEqual('hsl(var(--white) / <alpha-value>)');
        expect(Color.make('#fff').toColorWithOpacityValue(true)).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / <alpha-value>)'
        );

        expect(Color.make('#fff').withMeta({ name: 'yolo' }).toColorWithOpacityValue(false)).toEqual(
            'hsl(var(--yolo) / <alpha-value>)'
        );
        expect(Color.make('#fff').withMeta({ name: 'yolo' }).toColorWithOpacityValue(true)).toEqual(
            'hsl(var(--yolo, 0.000deg 0.000% 100.000%) / <alpha-value>)'
        );
    });

    it('@toColorWithOpacityValueFactory | can be converted to a Tailwind compatible "color with opacity value" factory function', () => {
        expect(Color.make('#fff').toColorWithOpacityValueFactory(false)({})).toEqual('hsl(var(--white))');
        expect(Color.make('#fff').toColorWithOpacityValueFactory(true)({})).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%))'
        );

        expect(Color.make('#fff').withMeta({ name: 'yolo' }).toColorWithOpacityValueFactory(false)({})).toEqual(
            'hsl(var(--yolo))'
        );
        expect(Color.make('#fff').withMeta({ name: 'yolo' }).toColorWithOpacityValueFactory(true)({})).toEqual(
            'hsl(var(--yolo, 0.000deg 0.000% 100.000%))'
        );

        expect(Color.make('#fff').toColorWithOpacityValueFactory(false)({ opacityValue: 0.5 })).toEqual(
            'hsl(var(--white) / 0.5)'
        );
        expect(Color.make('#fff').toColorWithOpacityValueFactory(true)({ opacityValue: 0.5 })).toEqual(
            'hsl(var(--white, 0.000deg 0.000% 100.000%) / 0.5)'
        );

        expect(
            Color.make('#fff').withMeta({ name: 'yolo' }).toColorWithOpacityValueFactory(false)({ opacityValue: 0.5 })
        ).toEqual('hsl(var(--yolo) / 0.5)');
        expect(
            Color.make('#fff').withMeta({ name: 'yolo' }).toColorWithOpacityValueFactory(true)({ opacityValue: 0.5 })
        ).toEqual('hsl(var(--yolo, 0.000deg 0.000% 100.000%) / 0.5)');
    });
});
