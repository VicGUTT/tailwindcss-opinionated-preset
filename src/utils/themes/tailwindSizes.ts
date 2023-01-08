// @see https://github.com/tailwindlabs/tailwindcss/blob/4dfb1e3f8776789a8680d791fc3a2bb5aefa0b98/stubs/defaultConfig.stub.js

const named = {
    full: '100%',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
};
const factional = {
    '1/2': '50%',

    '1/3': '33.333333%',
    '2/3': '66.666667%',

    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',

    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',

    '1/6': '16.666667%',
    '2/6': '33.333333%',
    '3/6': '50%',
    '4/6': '66.666667%',
    '5/6': '83.333333%',

    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
};
const common = {
    ...named,
    ...factional,
};
/**
 * Tested on: https://tailwindcss.com/blog/tailwindcss-v3-2
 *
 * On `<div class="max-w-3xl mx-auto pb-28">`:
 * max-width: 45ch;
 * max-width: 55ch;
 * max-width: 65ch;
 * max-width: 70ch;
 * max-width: 75ch;
 * max-width: clamp(45ch, 100%, 75ch);
 * width: clamp(45ch, 100%, 75ch);
 */
const prose = {
    'prose-xs': '45ch', // about 450px
    'prose-sm': '55ch', // about 550px
    prose: '65ch', // about 650px
    'prose-lg': '70ch', // about 700px
    'prose-xl': '75ch', // about 750px
    get 'prose-readable'() {
        return `clamp(${this['prose-xs']}, 100%, ${this['prose-xl']})`;
    },
};
const height = {
    ...common,
    screen: '100vh',
};
const width = {
    ...common,
    ...prose,
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: '85rem', // 1360px
    screen: '100vw',
};

export { named, factional, common, prose, height, width };
