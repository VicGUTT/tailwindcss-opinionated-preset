import { type Config } from 'tailwindcss';
import { type DefaultPresetParams } from '../../src/types/preset.js';
import plugins from '../plugins/index.js';
import { overwrite, extend } from '../themes/index.js';

export default function defaultPreset(params: DefaultPresetParams = {}): Config {
    return {
        darkMode: 'class',
        content: [
            // './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
            // './storage/framework/views/*.php',
            './app/View/**/*.php',
            './resources/**/*.{blade.php,js,ts,vue,css}',
        ],
        theme: {
            // fontFace: [
            //     'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
            // ],
            ...overwrite,
            extend,
        },
        corePlugins: {
            container: false,
        },
        plugins: [
            plugins['@tailwindcss/forms'](params.plugins?.['@tailwindcss/forms']),
            plugins['@tailwindcss/typography'](params.plugins?.['@tailwindcss/typography']),
            plugins['@tailwindcss/aspect-ratio'](params.plugins?.['@tailwindcss/aspect-ratio']),
            plugins['@tailwindcss/line-clamp'](params.plugins?.['@tailwindcss/line-clamp']),
            plugins['@tailwindcss/container-queries'](params.plugins?.['@tailwindcss/container-queries']),
            plugins['@vicgutt/tailwindcss-debug'](params.plugins?.['@vicgutt/tailwindcss-debug']),

            plugins.base(params.plugins?.base),
            plugins.colors(params.plugins?.colors),
            plugins.container(params.plugins?.container),
            plugins.headings(params.plugins?.headings),
        ],
    };
}
