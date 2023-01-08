import { type TailwindThemeValue } from '../types/tailwind.js';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default (() => ({
    DEFAULT: `var(--accent-color)`,
    ...defaultTheme.ringColor,
})) as TailwindThemeValue;
