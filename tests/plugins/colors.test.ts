import type tailwindPlugin from 'tailwindcss/plugin.js';
import { type PluginParams } from '../../src/types/plugin.js';
import { describe, it, expect } from 'vitest';
import tailwindColors from 'tailwindcss/colors.js';
import cssMatcher from 'jest-matcher-css';
import plugin from '../../src/plugins/colors.js';
import makeThemeColorCollection from '../../src/utils/plugins/colors/makeThemeColorCollection.js';
import setSnapshotContent from '../__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from '../__utils/getSnapshotContent.js';
import generateCss from '../__utils/generateCss.js';
import html from '../__utils/html.js';

const toCss = async (options?: PluginParams['colors']) => {
    return await generateCss(
        plugin(options) as unknown as typeof tailwindPlugin,
        {
            content: [
                {
                    raw: html`
                        <div
                            class="
                                text-white
                                bg-white

                                text-primary-900
                                text-primary-900/50
                                text-primary-1000
                                text-primary-1000/50
                                bg-primary-500
                                bg-primary-500/50

                                text-amber-900
                                text-amber-900/50
                                text-amber-1000
                                text-amber-1000/50
                                bg-amber-500
                                bg-amber-500/50

                                text-yolo-900
                                text-yolo-900/50
                                text-yolo-1000
                                text-yolo-1000/50
                                bg-yolo-500
                                bg-yolo-500/50

                                text-opacity-50
                                bg-opacity-50
                            "
                        ></div>
                    `,
                },
            ],
            theme: {
                extend: {
                    colors: makeThemeColorCollection({
                        amber: tailwindColors.amber,
                    }),
                },
            },
            corePlugins: ['textColor', 'backgroundColor', 'textOpacity', 'backgroundOpacity'],
        },
        { base: true, components: false, utilities: true }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins/colors', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin(undefined).handler === 'function').toEqual(true);
    });

    it('works', async () => {
        const actual = await toCss({
            // accepts user provided styles
            yolo: tailwindColors.teal,
        });

        // setSnapshotContent('/plugins/colors.css', actual);

        // @ts-expect-error shush
        expect(actual).toMatchCss(getSnapshotContent('/plugins/colors.css'));
    });

    it('can be disabled', async () => {
        const actual = await toCss(false);

        // @ts-expect-error shush
        expect(actual).toMatchCss(`
            .bg-white {
                --tw-bg-opacity: 1;
                background-color: rgb(255 255 255 / var(--tw-bg-opacity))
            }
            .bg-amber-500 {
                --tw-bg-opacity: 1;
                background-color: hsl(var(--amber-500, 37.692deg 92.126% 50.196%) / var(--tw-bg-opacity))
            }
            .bg-amber-500\\/50 {
                background-color: hsl(var(--amber-500, 37.692deg 92.126% 50.196%) / 0.5)
            }
            .bg-opacity-50 {
                --tw-bg-opacity: 0.5
            }
            .text-white {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity))
            }
            .text-amber-900 {
                --tw-text-opacity: 1;
                color: hsl(var(--amber-900, 21.714deg 77.778% 26.471%) / var(--tw-text-opacity))
            }
            .text-amber-900\\/50 {
                color: hsl(var(--amber-900, 21.714deg 77.778% 26.471%) / 0.5)
            }
            .text-opacity-50 {
                --tw-text-opacity: 0.5
            }
        `);
    });
});
