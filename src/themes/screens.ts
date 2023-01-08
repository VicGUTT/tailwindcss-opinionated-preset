import { type TailwindThemeValue } from '../types/tailwind.js';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
    '2xs': '200px',
    xs: '320px',
    sm: defaultTheme.screens.sm, // '640px'
    md: defaultTheme.screens.md, // '768px'
    lg: defaultTheme.screens.lg, // '1024px'
    xl: defaultTheme.screens.xl, // '1280px'
    '2xl': defaultTheme.screens['2xl'], // '1536px'
    '3xl': '1920px',
} as TailwindThemeValue;
