import { type ColorCollection } from '../types/color.js';
import { type WalkColorCollectionCallback } from '../types/misc.js';
import Color from '../Support/Color.js';
import isColorEntries from './is/isColorEntries.js';

export default function walkColorCollection(
    colors: ColorCollection,
    callback: WalkColorCollectionCallback,
    excludeNames: string[] = []
): void {
    Object.entries(colors).forEach(([name, values]) => {
        if (excludeNames.includes(name)) {
            return;
        }

        if (!isColorEntries(values)) {
            callback(Color.make(values).withMeta({ name }));

            return;
        }

        Object.entries(values).forEach(([shade, value]) => {
            callback(Color.make(value).withMeta({ name, shade }));
        });
    });
}
