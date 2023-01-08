import type tailwindPlugin from 'tailwindcss/plugin.js';
import { describe, it, expect } from 'vitest';
import cssMatcher from 'jest-matcher-css';
import postcss from 'postcss'; // eslint-disable-line @typescript-eslint/no-unused-vars
import discardComments from 'postcss-discard-comments'; // eslint-disable-line @typescript-eslint/no-unused-vars
import colors from 'tailwindcss/colors.js';
import plugin from '../../src/plugins/base.js';
import setSnapshotContent from '../__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from '../__utils/getSnapshotContent.js';
import generateCss from '../__utils/generateCss.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCss = async (styles: any = {}, base: any = {}) => {
    return await generateCss(
        plugin(styles) as unknown as typeof tailwindPlugin,
        {
            content: [{ raw: '' }],
            theme: {
                extend: {
                    colors: {
                        primary: colors.pink,
                        app: colors.gray,
                    },
                },
                base,
            },
        },
        { base: true, components: false, utilities: false }
    );
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('plugins/base', () => {
    it('is a TailwindCSS plugin function', () => {
        expect(typeof plugin === 'function').toEqual(true);
        expect(typeof plugin({}).handler === 'function').toEqual(true);
    });

    it('works', async () => {
        // const actual = postcss(discardComments({ removeAll: true })).process(await toCss()).css;
        const actual = await toCss();

        // setSnapshotContent('/plugins/base.css', actual);

        // @ts-expect-error shush
        expect(actual).toMatchCss(getSnapshotContent('/plugins/base.css'));
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
            ${getSnapshotContent('/plugins/base.css')}
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
            ${getSnapshotContent('/plugins/base.css')}
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
            ${getSnapshotContent('/plugins/base.css')}
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
            ${getSnapshotContent('/plugins/base.css')}
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
