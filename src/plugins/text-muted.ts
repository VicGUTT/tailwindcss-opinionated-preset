import tailwindPlugin from 'tailwindcss/plugin.js';

export default tailwindPlugin.withOptions(function () {
    return function ({ addComponents, theme }) {
        addComponents({
            '.text-muted': {
                color: `var(--text-muted, ${theme('colors.app.600')})`,

                '.dark &': {
                    color: `var(--text-muted-dark, ${theme('colors.app.400')})`,
                },
            },
        });
    };
});
