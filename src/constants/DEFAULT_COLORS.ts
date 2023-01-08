import { type ColorCollection } from '../types/color.js';
import tailwindColors from 'tailwindcss/colors.js';

const DEFAULT_COLORS: Readonly<ColorCollection> = Object.freeze({
    // Generic colors
    inherit: tailwindColors.inherit,
    current: tailwindColors.current,
    transparent: tailwindColors.transparent,
    black: tailwindColors.black,
    white: tailwindColors.white,

    // App colors
    app: tailwindColors.gray,

    // Brand colors
    primary: tailwindColors.pink,
    secondary: tailwindColors.amber,
    tertiary: tailwindColors.sky,
    // quaternary
    // quinary
    // senary
    // septenary
    // octonary
    // nonary
    // denary
    // - none -
    // duodenary

    // Contextual colors
    info: tailwindColors.blue,
    success: tailwindColors.green,
    warning: tailwindColors.orange,
    error: tailwindColors.red,
});

export default DEFAULT_COLORS;
