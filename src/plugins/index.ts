import { type PluginParams } from '../types/plugin.js';
import isUndefined from '@vicgutt/isjs/isUndefined';
import isString from '@vicgutt/isjs/isString';
import base from './base.js';
import colors from './colors.js';
import container from './container.js';
import headings from './headings.js';

export default {
    '@tailwindcss/forms'(params: PluginParams['@tailwindcss/forms'] = {}) {
        return plugin('@tailwindcss/forms', params);
    },
    '@tailwindcss/typography'(params: PluginParams['@tailwindcss/typography'] = {}) {
        return plugin('@tailwindcss/typography', params);
    },
    '@tailwindcss/aspect-ratio'(params: PluginParams['@tailwindcss/aspect-ratio'] = undefined) {
        return plugin('@tailwindcss/aspect-ratio', params);
    },
    '@tailwindcss/container-queries'(params: PluginParams['@tailwindcss/container-queries'] = undefined) {
        return plugin('@tailwindcss/container-queries', params);
    },
    '@vicgutt/tailwindcss-debug'(params: PluginParams['@vicgutt/tailwindcss-debug'] = {}) {
        return plugin('@vicgutt/tailwindcss-debug', params);
    },
    // require('@vicgutt/tailwindcss-feature-detection')(
    //     require('@vicgutt/tailwindcss-feature-detection/dist/defaults')
    // ),
    // require('@vicgutt/tailwindcss-font-face')({
    //     fontDir: './public/fonts/Mulish',
    //     fontPath: '/fonts/Mulish',
    // }),

    base(params: PluginParams['base'] = {}) {
        return plugin(base, params);
    },
    colors(params: PluginParams['colors'] = {}) {
        return plugin(colors, params);
    },
    container(params: PluginParams['container'] = undefined) {
        return plugin(container, params);
    },
    headings(params: PluginParams['headings'] = {}) {
        return plugin(headings, params);
    },
};

// eslint-disable-next-line @typescript-eslint/ban-types
function plugin(key: string | Function, params: unknown) {
    if (params === false) {
        return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    }

    if (isUndefined(params)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return isString(key) ? require(key) : key();
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return isString(key) ? require(key)(params) : key(params);
}
