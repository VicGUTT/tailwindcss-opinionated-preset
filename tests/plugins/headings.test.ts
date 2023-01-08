import type tailwindPlugin from 'tailwindcss/plugin.js';
import { type Styles } from '../../src/types/misc.js';
import { describe, it, expect } from 'vitest';
import cssMatcher from 'jest-matcher-css';
import plugin from '../../src/plugins/headings.js';
import setSnapshotContent from '../__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from '../__utils/getSnapshotContent.js';
import generateCss from '../__utils/generateCss.js';
import html from '../__utils/html.js';

const toCss = async (styles: Styles = {}, headings: Styles = {}) => {
    return await generateCss(
        plugin(styles) as unknown as typeof tailwindPlugin,
        {
            content: [{ raw: html`<div class="h1 h2 h3 h4 h5 h6 "></div>` }],
            theme: {
                headings,
            },
        },
        { base: false, components: true, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins/headings', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin({}).handler === 'function').toEqual(true);
    });

    it('works', async () => {
        const actual = await toCss();

        // setSnapshotContent('/plugins/headings.css', actual);

        // @ts-expect-error shush
        expect(actual).toMatchCss(getSnapshotContent('/plugins/headings.css'));
    });

    it('can be disabled', async () => {
        const actual = await toCss(false);

        // @ts-expect-error shush
        expect(actual).toMatchCss('');
    });

    it('accepts user provided styles | options', async () => {
        let actual = await toCss({
            h6: {
                display: 'none',
                backgroundColor: 'red',
            },
            '::-webkit-scrollbar': {
                height: '3.33px',
                width: '3.33px',
            },
        });

        // @ts-expect-error shush
        expect(actual).toMatchCss(`
            ${getSnapshotContent('/plugins/headings.css')}
            h6 {
                display: none;
                background-color: red;
            }
            ::-webkit-scrollbar {
                height: 3.33px;
                width: 3.33px;
            }
        `);

        actual = await toCss([
            {
                span: {
                    fontFamily: 'Roboto, "Other font"',
                    height: 'auto',
                },
            },
            {
                '::-webkit-scrollbar': {
                    height: '7.77px',
                    width: '7.77px',
                },
            },
        ]);

        // @ts-expect-error shush
        expect(actual).toMatchCss(`
            ${getSnapshotContent('/plugins/headings.css')}
            span {
                font-family: Roboto, "Other font";
                height: auto;
            }
            ::-webkit-scrollbar {
                height: 7.77px;
                width: 7.77px;
            }
        `);
    });

    it('accepts user provided styles | theme', async () => {
        let actual = await toCss(
            {},
            {
                h6: {
                    display: 'none',
                    backgroundColor: 'red',
                },
                '::-webkit-scrollbar': {
                    height: '3.33px',
                    width: '3.33px',
                },
            }
        );

        // @ts-expect-error shush
        expect(actual).toMatchCss(`
            ${getSnapshotContent('/plugins/headings.css')}
            h6 {
                display: none;
                background-color: red;
            }
            ::-webkit-scrollbar {
                height: 3.33px;
                width: 3.33px;
            }
        `);

        actual = await toCss({}, [
            {
                span: {
                    fontFamily: 'Roboto, "Other font"',
                    height: 'auto',
                },
            },
            {
                '::-webkit-scrollbar': {
                    height: '7.77px',
                    width: '7.77px',
                },
            },
        ]);

        // @ts-expect-error shush
        expect(actual).toMatchCss(`
            ${getSnapshotContent('/plugins/headings.css')}
            span {
                font-family: Roboto, "Other font";
                height: auto;
            }
            ::-webkit-scrollbar {
                height: 7.77px;
                width: 7.77px;
            }
        `);
    });
});
