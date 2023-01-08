import { type TailwindThemeKey, type TailwindThemeValue } from '../types/tailwind.js';
import screens from './screens.js';
import spacing from './spacing.js';
import height from './height.js';
import maxHeight from './maxHeight.js';
import minHeight from './minHeight.js';
import width from './width.js';
import maxWidth from './maxWidth.js';
import minWidth from './minWidth.js';
import fontFamily from './fontFamily.js';
import fontSize from './fontSize.js';
import ringColor from './ringColor.js';
import transitionDuration from './transitionDuration.js';
import transitionProperty from './transitionProperty.js';
import zIndex from './zIndex.js';

const overwrite: Record<TailwindThemeKey, TailwindThemeValue> = {
    screens,
};

const extend: Record<TailwindThemeKey, TailwindThemeValue> = {
    spacing,
    height,
    maxHeight,
    minHeight,
    width,
    maxWidth,
    minWidth,
    fontFamily,
    fontSize,
    ringColor,
    transitionDuration,
    transitionProperty,
    zIndex,
};

export { overwrite, extend };

export default {
    ...overwrite,
    ...extend,
} as Record<TailwindThemeKey, TailwindThemeValue>;
