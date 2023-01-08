import { type PluginParams } from '../types/plugin.js';
import { type ColorCollection, type PaletteColorEntries } from '../types/color.js';
import tailwindPlugin from 'tailwindcss/plugin.js';
import merge from 'lodash.merge';
import isObject from '@vicgutt/isjs/isObject';
import COLOR_NAMES_EXCLUSES from '../constants/COLOR_NAMES_EXCLUSES.js';
import DEFAULT_COLORS from '../constants/DEFAULT_COLORS.js';
import Palette from '../Support/Palette.js';
import makeThemeColorCollection from '../utils/plugins/colors/makeThemeColorCollection.js';
import makeRootCssColorVariables from '../utils/plugins/colors/makeRootCssColorVariables.js';

export default tailwindPlugin.withOptions(
    function (options?: PluginParams['colors']) {
        if (options === false) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {};
        }

        if (!isObject(options)) {
            options = {};
        }

        return ({ addBase, theme }) => {
            let colors = merge(merge({}, DEFAULT_COLORS), merge(merge({}, options), theme('colors')));

            colors = transformColors(colors, COLOR_NAMES_EXCLUSES);

            addBase({
                ':root': makeRootCssColorVariables(
                    colors,
                    theme('__opinionatedPresetProvidedColors'),
                    COLOR_NAMES_EXCLUSES
                ),
            });
        };
    },
    // @ts-expect-error shush
    function (options?: PluginParams['colors']) {
        if (options === false) {
            return {};
        }

        if (typeof options !== 'object') {
            options = {};
        }

        let colors = merge(merge({}, DEFAULT_COLORS), options);

        colors = merge(colors, transformColors(colors, COLOR_NAMES_EXCLUSES));

        return {
            theme: {
                colors: makeThemeColorCollection(colors, {
                    untouchableColorNames: COLOR_NAMES_EXCLUSES,
                    withDefaultCssVarValue: false,
                }),
                __opinionatedPresetProvidedColors: colors,
            },
        };
    }
);

function transformColors(collection: ColorCollection, untouchableColorNames: string[] = []) {
    return Object.entries(collection).reduce((acc, [key, values]) => {
        if (untouchableColorNames.includes(key)) {
            return acc;
        }

        acc[key] = Palette.from(values);

        return acc;
    }, {} as Record<string, PaletteColorEntries>);
}
