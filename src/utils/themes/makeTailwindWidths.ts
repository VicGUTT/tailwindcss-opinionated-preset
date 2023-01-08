import { type TailwindThemeValue } from '../../types/tailwind.js';
import { width } from './tailwindSizes.js';

export default function makeTailwindWidths(values: Record<string, unknown> = {}): TailwindThemeValue {
    return ({ theme, breakpoints }) => ({
        ...theme('spacing'),
        ...breakpoints(theme('screens')),
        ...width,
        ...values,
    });
}
