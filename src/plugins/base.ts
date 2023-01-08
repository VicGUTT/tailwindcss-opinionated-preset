import { type CSSRuleObject } from 'tailwindcss/types/config.js';
import { type Styles } from '../types/misc.js';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindPlugin from 'tailwindcss/plugin.js';

let defaultStyles: Styles[] = [];

export default tailwindPlugin.withOptions(function (styles: false | Styles | Styles[]) {
    return function (props) {
        if (styles === false) {
            return;
        }

        props.addBase(makeStyles(styles));
        props.addBase(props.theme('base', {}));
    };
});

/**
 * @see https://github.com/tailwindlabs/tailwindcss/blob/ca6b21a6bc33dbffbfa2d7ead19dec93a885e932/src/plugins/preflight.js
 * @see https://github.com/tailwindlabs/tailwindcss/blob/1dc4a76cc78457d04e212c9cc1d816a6abf8bf96/src/corePlugins.js#L462
 */
function makeStyles(styles: Styles | Styles[] = {}): CSSRuleObject[] {
    if (!defaultStyles.length) {
        defaultStyles = [
            postcss.parse(readFile('sanitize'), { from: resolvePath('sanitize') }),
            postcss.parse(readFile('opinionated'), { from: resolvePath('opinionated') }),
        ];
    }

    return [...defaultStyles, ...(!Array.isArray(styles) ? [styles || {}] : styles)];
}

function resolvePath(fileName: string) {
    let _path = `${__dirname}/../src/css/base/${fileName}.css`;

    if (process.env.NODE_ENV === 'test') {
        _path = `${__dirname}/../css/base/${fileName}.css`;
    }

    return path.resolve(_path);
}

function readFile(fileName: string) {
    return fs.readFileSync(resolvePath(fileName), 'utf8');
}
