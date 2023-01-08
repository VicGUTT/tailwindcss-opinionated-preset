import { type ColorEntries, type ColorCollection } from '../../../types/color.js';
import { type MakeThemeColorCollectionOptions } from '../../../types/misc.js';
import merge from 'lodash.merge';
import walkColorCollection from '../../walkColorCollection.js';

export default function makeThemeColorCollection(
    collection: ColorCollection,
    options: MakeThemeColorCollectionOptions = {}
): ColorCollection {
    const acc: ColorCollection = merge({}, collection);

    options = {
        untouchableColorNames: [],
        withDefaultCssVarValue: true,
        colorWithOpacityValueFactory: true,
        ...options,
    };

    walkColorCollection(
        collection,
        (color) => {
            const values = acc[color.name] as ColorEntries;

            acc[color.name] = {
                ...values,
                [color.shade as string | number]: options.colorWithOpacityValueFactory
                    ? color.toColorWithOpacityValueFactory(options.withDefaultCssVarValue)
                    : color.toColorWithOpacityValue(options.withDefaultCssVarValue),
            };
        },
        options.untouchableColorNames
    );

    return acc;
}
