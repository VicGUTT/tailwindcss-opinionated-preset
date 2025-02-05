import tailwindPlugin from 'tailwindcss/plugin.js';

export default tailwindPlugin.withOptions(function () {
    return function ({ addComponents }) {
        addComponents({
            '.container': {
                '@apply max-w-container mx-auto px-6 lg:px-8 2xl:px-0': {},
            },
        });
    };
});
