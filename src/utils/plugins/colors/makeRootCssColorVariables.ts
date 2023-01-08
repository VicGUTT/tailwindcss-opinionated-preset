import {
    type ColorEntries,
    type ColorCollection,
    type ColorEntryKey,
    type ColorCollectionKey,
    type ColorEntryValue,
} from '../../../types/color.js';
import isString from '@vicgutt/isjs/isString';
import isFunction from '@vicgutt/isjs/isFunction';
import Color from '../../../Support/Color.js';
import ColorException from '../../../Exceptions/ColorException.js';
import walkColorCollection from '../../../utils/walkColorCollection.js';
import isColorEntries from '../../../utils/is/isColorEntries.js';

export default function makeRootCssColorVariables(
    collection: ColorCollection,
    originalColorCollection: ColorCollection = {},
    excludeColorNames: string[] = []
): Record<string, string> {
    const acc: Record<string, string> = {};

    const colors = ensureColorsAreCssVariablesProof(collection, originalColorCollection, excludeColorNames);

    walkColorCollection(
        colors,
        (color) => {
            acc[color.cssVarName] = color.toHslStringChannels();
        },
        excludeColorNames
    );

    return acc;
}

function ensureColorsAreCssVariablesProof(
    collection: ColorCollection,
    originalColorCollection: ColorCollection = {},
    excludeColorNames: string[] = []
): ColorCollection {
    return Object.entries(collection).reduce((acc, [name, values]) => {
        if (excludeColorNames.includes(name)) {
            return acc;
        }

        if (!isColorEntries(values)) {
            return acc;
        }

        Object.entries(values).forEach(([shade, value]) => {
            acc[name] = {
                ...((acc[name] as ColorEntries) ?? {}),
                [shade]: determineColorEntryValue({ name, shade, value }, originalColorCollection),
            };
        });

        return acc;
    }, {} as ColorCollection);
}

function determineColorEntryValue(
    entry: { name: ColorCollectionKey; shade: ColorEntryKey; value: ColorEntryValue },
    originalColorCollection: ColorCollection
): string {
    let color: Color | null = null;

    try {
        color = Color.make(entry.value);
    } catch (error) {
        /* c8 ignore start */
        if (!(error instanceof ColorException)) {
            throw error;
        }
        /* c8 ignore end */

        let originalEntries = originalColorCollection[entry.name];

        if (isFunction(originalEntries)) {
            originalEntries = originalEntries({});
        }

        if (isString(originalEntries)) {
            originalEntries = {
                [entry.shade]: originalEntries,
            };
        }

        const originalEntry = originalEntries?.[entry.shade];

        if (!originalEntry) {
            throw ColorException.valueUnsuitableAsRootProperty(JSON.stringify(entry));
        }

        return Color.make(originalEntry).toHslStringChannels();
    }

    return color.toHslStringChannels();
}
