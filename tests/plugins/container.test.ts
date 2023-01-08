import type tailwindPlugin from 'tailwindcss/plugin.js';
import { describe, it, expect } from 'vitest';
import cssMatcher from 'jest-matcher-css';
import plugin from '../../src/plugins/container.js';
import setSnapshotContent from '../__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from '../__utils/getSnapshotContent.js';
import generateCss from '../__utils/generateCss.js';
import html from '../__utils/html.js';

const toCss = async () => {
    return await generateCss(
        plugin as unknown as typeof tailwindPlugin,
        {
            content: [{ raw: html`<div class="container"></div>` }],
            theme: {
                extend: { maxWidth: { container: '85rem' } },
            },
            corePlugins: ['maxWidth', 'margin', 'padding'],
        },
        { base: false, components: true, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins/container', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin(undefined).handler === 'function').toEqual(true);
    });

    it('works', async () => {
        const actual = await toCss();

        // setSnapshotContent('/plugins/container.css', actual);

        // @ts-expect-error shush
        expect(actual).toMatchCss(getSnapshotContent('/plugins/container.css'));
    });
});
