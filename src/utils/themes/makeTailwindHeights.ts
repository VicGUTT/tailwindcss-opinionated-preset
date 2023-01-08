import { type TailwindThemeValue } from '../../types/tailwind.js';
import { height } from './tailwindSizes.js';

export default function makeTailwindHeights(values: Record<string, unknown> = {}): TailwindThemeValue {
    return ({ theme }) => ({
        ...theme('spacing'),
        ...height,
        ...values,
    });
}
