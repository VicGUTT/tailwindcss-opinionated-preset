import type typography from '@tailwindcss/typography';
import type forms from '@tailwindcss/forms';
import { type screensPlugin, type outlinesPlugin } from '@vicgutt/tailwindcss-debug';
import { type ColorCollection } from './color.js';
import { type Styles } from './misc.js';

type DebugPluginParams = Partial<{
    screens: Partial<Parameters<typeof screensPlugin>[0]>;
    outlines: Partial<Parameters<typeof outlinesPlugin>[0]>;
}>;

export type HeadingPluginParams = Partial<{
    '.h1': Styles;
    '.h2': Styles;
    '.h3': Styles;
    '.h4': Styles;
    '.h5': Styles;
    '.h6': Styles;
}>;

export type PluginParams = {
    '@tailwindcss/forms'?: Parameters<typeof forms>[0] | false;
    '@tailwindcss/typography'?: Parameters<typeof typography>[0] | false;
    '@tailwindcss/container-queries'?: undefined | false;
    '@vicgutt/tailwindcss-debug'?: DebugPluginParams | false;
    // '@vicgutt/tailwindcss-feature-detection';
    // '@vicgutt/tailwindcss-font-face';

    base?: Record<string, unknown> | false;
    colors?: ColorCollection | false;
    container?: false;
    headings?: HeadingPluginParams | false;
};
