import { type TailwindThemeValue } from '../types/tailwind.js';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
    visibility: 'visibility',
    DEFAULT: `visibility, ${defaultTheme.transitionProperty.DEFAULT}`,
} as TailwindThemeValue;
