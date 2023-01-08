import { type PluginAPI, type CSSRuleObject } from 'tailwindcss/types/config.js';
import { type HeadingPluginParams } from '../types/plugin.js';
import { type Styles } from '../types/misc.js';
import tailwindPlugin from 'tailwindcss/plugin.js';

let CACHE: CSSRuleObject | null = null;

export default tailwindPlugin.withOptions(function (styles: false | HeadingPluginParams | HeadingPluginParams[]) {
    return function (props) {
        if (styles === false) {
            return;
        }

        props.addComponents([
            makeStyles(props.theme),
            ...(!Array.isArray(styles) ? [styles] : styles),
            props.theme('headings', {}),
        ]);
    };
});

function makeStyles(theme: PluginAPI['theme']): CSSRuleObject {
    if (CACHE) {
        return CACHE;
    }

    const makeFontSize = (size: string, index: number, array: string[]) => {
        const fontSize = theme('fontSize')![size][0]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        const prevFontSize = theme('fontSize')![array[index + 1]][0]; // eslint-disable-line @typescript-eslint/no-non-null-assertion

        const fontValue = +fontSize.replace('rem', '');
        const prevFontValue = +prevFontSize.replace('rem', '');

        const min = fontValue * 0.65 < prevFontValue ? prevFontValue : fontValue * 0.65;

        return `clamp(${min.toFixed(3)}rem, ${(fontValue * 0.6).toFixed(3)}rem + 1.5vw, ${fontSize})`;
    };

    return (CACHE = ['5xl', '4xl', '3xl', '2xl', 'xl', 'base', 'sm'].reduce((acc, size, index, array) => {
        const level = index + 1;
        const name = `.h${level}`;

        if (level > 6) {
            return acc;
        }

        acc[name] = {
            fontWeight: 500,
            lineHeight: theme('fontSize')![size][1].lineHeight, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            fontSize: makeFontSize(size, index, array),
        };

        return acc;
    }, {} as Styles));
}
