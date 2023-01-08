import { type Config as TailwindConfig } from 'tailwindcss';
import type tailwindPlugin from 'tailwindcss/plugin.js';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

export default async function generateCss(
    plugin: typeof tailwindPlugin,
    config: TailwindConfig | { [key: string]: string } = {},
    {
        // layers
        base = false,
        components = false,
        utilities = true,
    }: {
        base?: boolean;
        components?: boolean;
        utilities?: boolean;
    } = {
        base: false,
        components: false,
        utilities: true,
    }
) {
    const process = `
        ${base ? '@tailwind base;' : ''}
        ${components ? '@tailwind components;' : ''}
        ${utilities ? '@tailwind utilities;' : ''}
    `;

    const result = await postcss(
        tailwindcss({
            ...config,
            // @ts-expect-error shush
            corePlugins: config.corePlugins ?? [],
            // @ts-expect-error shush
            plugins: [...(config.plugins ?? []), plugin],
        })
    ).process(process, {
        from: undefined,
    });

    return result.css;
}
