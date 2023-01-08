import type tailwindPlugin from 'tailwindcss/plugin.js';
import { describe, it, expect } from 'vitest';
import cssMatcher from 'jest-matcher-css';
import plugin from '../../src/plugins/text-muted.js';
import colors from '../../src/plugins/colors.js';
import setSnapshotContent from '../__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from '../__utils/getSnapshotContent.js';
import generateCss from '../__utils/generateCss.js';
import html from '../__utils/html.js';

const toCss = async () => {
    return await generateCss(
        plugin as unknown as typeof tailwindPlugin,
        {
            content: [{ raw: html`<div class="text-muted"></div>` }],
            plugins: [colors],
        },
        { base: false, components: true, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins/text-muted', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin(undefined).handler === 'function').toEqual(true);
    });

    it('works', async () => {
        const actual = await toCss();

        // setSnapshotContent('/plugins/text-muted.css', actual);

        // @ts-expect-error shush
        expect(actual).toMatchCss(getSnapshotContent('/plugins/text-muted.css'));
    });
});
