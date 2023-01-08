import { type TailwindThemeValue } from '../types/tailwind.js';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
    sans: ['"Mulish"', '"Muli"', ...defaultTheme.fontFamily.sans],
    mono: ['"Source code Pro"', ...defaultTheme.fontFamily.mono],
} as unknown as TailwindThemeValue;
