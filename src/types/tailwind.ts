import { type ResolvableTo, type RecursiveKeyValuePair } from 'tailwindcss/types/config.js';

export type TailwindThemeKey = string;
export type TailwindThemeValue = ResolvableTo<RecursiveKeyValuePair>;
