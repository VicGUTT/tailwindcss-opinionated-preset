import { type DefaultPresetParams } from '../../src/types/preset.js';
import { describe, it, expect } from 'vitest';
import cssMatcher from 'jest-matcher-css';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import preset from '../../src/index.js';
import setSnapshotContent from '../__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from '../__utils/getSnapshotContent.js';
import html from '../__utils/html.js';

const toCss = async (params: DefaultPresetParams = {}) => {
    const classes = [
        'text-primary-500',
        'md:bg-primary-500',

        'mt-18',
        'md:mt-200',

        'min-w-screen-xs',
        'min-w-screen-3xl',

        'h-120',
        'h-170',
        'md:h-172',

        'max-h-120',
        'max-h-170',
        'md:max-h-172',

        'min-h-120',
        'min-h-170',
        'md:min-h-172',

        'w-120',
        'md:w-18',
        'w-prose',
        'w-prose-xl',
        'w-prose-readable',
        'w-17',
        'w-174',

        'max-w-120',
        'md:max-w-18',
        'max-w-prose',
        'max-w-prose-xl',
        'max-w-prose-readable',
        'max-w-17',
        'max-w-174',

        'min-w-120',
        'md:min-w-18',
        'min-w-prose',
        'min-w-prose-xl',
        'min-w-prose-readable',
        'min-w-17',
        'min-w-174',

        'z-1',
        '-z-1',

        'prose',
        'aspect-w-1',
        'line-clamp-1',
        '@container',
        'debug',

        'form-input',
        'form-multiselect',

        'container',
        'xs:container',
        'md:container',

        'h1',
        'sm:h1',

        'typography-overwrite-2xl',
        'debug-overwrite',
        'heading-overwrite',
    ];

    const result = await postcss(
        tailwindcss({
            content: [{ raw: html`<div class="${classes.join(' ')}"></div>` }],
            presets: [preset(params)],
        })
    ).process('@tailwind base; @tailwind components; @tailwind utilities;', {
        from: undefined,
    });

    return result.css;
};

expect.extend({
    toMatchCss: cssMatcher,
});

describe('presets/default', () => {
    it('works', async () => {
        const actual = await toCss();

        // setSnapshotContent('presets/default.css', actual);

        // Colors
        expect(actual.includes('.text-primary-500 {')).toEqual(true);
        expect(actual.includes('.md\\:bg-primary-500')).toEqual(true);

        // Spacing
        expect(actual.includes('.mt-18')).toEqual(true);
        expect(actual.includes('.md\\:mt-200')).toEqual(true);

        // Screens
        expect(actual.includes('min-w-screen-xs')).toEqual(true);
        expect(actual.includes('min-w-screen-3xl')).toEqual(true);

        // Font family
        expect(actual.includes('font-family: "Mulish", "Muli", ui-sans-serif')).toEqual(true);
        expect(actual.includes('font-family: "Source code Pro", ui-monospace')).toEqual(true);

        // Height
        expect(actual.includes('.h-120')).toEqual(true);
        expect(actual.includes('.md\\:h-172')).toEqual(true);
        expect(!actual.includes('.h-170')).toEqual(true);

        // Max height
        expect(actual.includes('.max-h-120')).toEqual(true);
        expect(actual.includes('.md\\:max-h-172')).toEqual(true);
        expect(!actual.includes('.max-h-170')).toEqual(true);

        // Min height
        expect(actual.includes('.min-h-120')).toEqual(true);
        expect(actual.includes('.md\\:min-h-172')).toEqual(true);
        expect(!actual.includes('.min-h-170')).toEqual(true);

        // Width
        expect(actual.includes('.w-120')).toEqual(true);
        expect(actual.includes('.md\\:w-18')).toEqual(true);
        expect(actual.includes('.w-prose')).toEqual(true);
        expect(actual.includes('.w-prose-xl')).toEqual(true);
        expect(actual.includes('.w-prose-readable')).toEqual(true);
        expect(actual.includes('.w-17')).toEqual(true);
        expect(!actual.includes('.w-174')).toEqual(true);

        // Max width
        expect(actual.includes('.max-w-120')).toEqual(true);
        expect(actual.includes('.md\\:max-w-18')).toEqual(true);
        expect(actual.includes('.max-w-prose')).toEqual(true);
        expect(actual.includes('.max-w-prose-xl')).toEqual(true);
        expect(actual.includes('.max-w-prose-readable')).toEqual(true);
        expect(actual.includes('.max-w-17')).toEqual(true);
        expect(!actual.includes('.max-w-174')).toEqual(true);

        // Min width
        expect(actual.includes('.min-w-120')).toEqual(true);
        expect(actual.includes('.md\\:min-w-18')).toEqual(true);
        expect(actual.includes('.min-w-prose')).toEqual(true);
        expect(actual.includes('.min-w-prose-xl')).toEqual(true);
        expect(actual.includes('.min-w-prose-readable')).toEqual(true);
        expect(actual.includes('.min-w-17')).toEqual(true);
        expect(!actual.includes('.min-w-174')).toEqual(true);

        // Ring color
        expect(actual.includes('--tw-ring-color: rgb(147 197 253 / 0.5);')).toEqual(true);

        // Transition duration
        expect(actual.includes('transition-duration: 200ms;')).toEqual(true);

        // Z index
        expect(actual.includes('.z-1')).toEqual(true);
        expect(actual.includes('.-z-1')).toEqual(true);

        // @tailwindcss/forms
        expect(
            actual.includes(
                "[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select {"
            )
        ).toEqual(true);

        // @tailwindcss/typography
        expect(actual.includes('.prose :where([class~="lead"]):not(:where([class~="not-prose"] *)) {')).toEqual(true);
        expect(actual.includes('--tw-prose-headings: #111827;')).toEqual(true);

        // @tailwindcss/line-clamp
        expect(actual.includes('.line-clamp-1 {')).toEqual(true);

        // @tailwindcss/container-queries
        expect(actual.includes('.\\@container {\n  container-type: inline-size;')).toEqual(true);

        // @vicgutt/tailwindcss-debug
        expect(actual.includes('.debug *:after, .debug *:before {')).toEqual(true);
        expect(actual.includes('body::before {')).toEqual(true);
        expect(actual.includes('content: "3xl (1920px)";')).toEqual(true);

        // // @vicgutt/feature-detection
        // expect(actual.includes('.flexgap .flexgap\\:gap-0')).toEqual(true);
        // expect(actual.includes('.flexgap .xs\\:flexgap\\:gap-0')).toEqual(true);

        // // @vicgutt/font-face
        // expect(actual.includes('@font-face {')).toEqual(true);
        // expect(actual.includes("font-family: 'Mulish';")).toEqual(true);
        // expect(actual.includes('font-weight: 200;')).toEqual(true);
        // expect(actual.includes('font-style: normal;')).toEqual(true);
        // expect(actual.includes('font-display: swap;')).toEqual(true);
        // expect(
        //     actual.includes(
        //         "src: url('/fonts/Muli/Mulish-normal-200-714ff6b8da35e70d2d828b2c3e3ff36a.woff2') format('woff2');"
        //     )
        // ).toEqual(true);
        // expect(
        //     actual.includes(
        //         'unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;'
        //     )
        // ).toEqual(true);

        // plugins/base
        expect(
            actual.replace(/\s/g, '').replace(/;/g, '').includes(':where(:root){--accent-color:hsl(var(--primary-500))')
        ).toEqual(true);
        expect(actual.includes('@media (prefers-reduced-motion: reduce) {')).toEqual(true);
        expect(actual.includes('::selection')).toEqual(true);
        expect(actual.includes('::-webkit-scrollbar-thumb:hover')).toEqual(true);

        // plugins/container
        expect(
            actual.includes(
                '.container {\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 85rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n} @media (min-width: 640px) {'
            )
        ).toEqual(true);
        expect(actual.includes('.xs\\:container')).toEqual(true);
        expect(actual.includes('.md\\:container')).toEqual(true);

        // plugins/headings
        expect(actual.includes('.h1')).toEqual(true);
        expect(actual.includes('.sm\\:h1')).toEqual(true);

        // @ts-expect-error shush
        expect(actual).toMatchCss(getSnapshotContent('presets/default.css'));
    });

    it('can disable individual plugins', async () => {
        // @tailwindcss/forms
        expect((await toCss({ plugins: { '@tailwindcss/forms': false } })).includes("[type='datetime-local']")).toEqual(
            false
        );

        // @tailwindcss/typography
        expect(
            (await toCss({ plugins: { '@tailwindcss/typography': false } })).includes('.prose :where([class~="lead"])')
        ).toEqual(false);

        // @tailwindcss/container-queries
        expect(
            (await toCss({ plugins: { '@tailwindcss/container-queries': false } })).includes('.\\@container')
        ).toEqual(false);

        // @vicgutt/tailwindcss-debug
        expect(
            (await toCss({ plugins: { '@vicgutt/tailwindcss-debug': false } })).includes('content: "3xl (1920px)";')
        ).toEqual(false);

        // // @vicgutt/feature-detection
        // try {
        //     await toCss({ plugins: {'@tailwindcss/feature-detection': false} });
        // } catch (error) {
        //     expect(
        //         error.message.includes(
        //             'Your config mentions the "flexgap" variant, but "flexgap" doesn\'t appear to be a variant'
        //         )
        //     ).toEqual(true);
        // }

        // // @vicgutt/font-face
        // expect((await toCss({ plugins: {'@vicgutt/font-face': false} })).includes('@font-face')).toEqual(false);

        // plugins/base
        expect((await toCss({ plugins: { base: false } })).includes('@media (prefers-reduced-motion: reduce)')).toEqual(
            false
        );

        // plugins/headings
        expect((await toCss({ plugins: { headings: false } })).includes('.h1')).toEqual(false);

        // // plugins/components
        // expect((await toCss({ plugins: {base: false} })).includes('.h1')).toEqual(false);
    });

    it('can customize individual plugins', async () => {
        // @tailwindcss/forms
        let actual = await toCss({ plugins: { '@tailwindcss/forms': { strategy: 'class' } } });

        expect(actual.includes("[type='datetime-local']")).toEqual(false);
        expect(actual.includes('.form-input')).toEqual(true);
        expect(actual.includes('.form-multiselect')).toEqual(true);

        // @tailwindcss/typography
        actual = await toCss({ plugins: { '@tailwindcss/typography': { className: 'typography-overwrite' } } });

        expect(actual.includes('.prose-2xl')).toEqual(false);
        expect(actual.includes('.typography-overwrite-2xl')).toEqual(true);

        // @tailwindcss/line-clamp && @tailwindcss/container-queries -> have no options

        // @vicgutt/tailwindcss-debug
        actual = await toCss({
            plugins: { '@vicgutt/tailwindcss-debug': { screens: { selector: '.debug-overwrite' } } },
        });

        expect(actual.includes('body::before {')).toEqual(false);
        expect(actual.includes('.debug-overwrite::before {')).toEqual(true);

        // // @vicgutt/feature-detection
        // actual = await toCss({
        //     featureDetection: [
        //         {
        //             name: 'flexgap',
        //             strategy: 'atRule',
        //             atRule: {
        //                 name: 'supports',
        //                 params: '(hey: hello) and (123: abc)',
        //             },
        //         },
        //     ],
        // });

        // expect(actual.includes('.flexgap .flexgap\\:gap-0')).toEqual(false);
        // expect(actual.includes('@supports (hey: hello) and (123: abc) {')).toEqual(true);
        // expect(actual.includes('.flexgap\\:gap-0')).toEqual(true);

        // // @vicgutt/font-face
        // actual = await toCss({
        //     fontFace: {
        //         defaultFontFaceRules: {
        //             xzy: 123,
        //         },
        //     },
        // });

        // expect(actual.includes('@font-face')).toEqual(true);
        // expect(actual.includes("font-family: 'Mulish';")).toEqual(true);
        // expect(actual.includes('xzy: 123')).toEqual(true);

        // plugins/base
        actual = await toCss({ plugins: { base: { '#base-overwrite': { abc: '123' } } } });

        expect(actual.includes('#base-overwrite {')).toEqual(true);
        expect(actual.includes('abc: 123')).toEqual(true);

        // plugins/headings
        actual = await toCss({ plugins: { headings: { '.h1': { abc: '456' } } } });

        // expect(/\.h1 {(\s+|.*)+abc: 456;/g.test(actual)).toEqual(true);
        expect(actual.includes('.h1 {')).toEqual(true);
        expect(actual.includes('abc: 456')).toEqual(true);
    });
});
