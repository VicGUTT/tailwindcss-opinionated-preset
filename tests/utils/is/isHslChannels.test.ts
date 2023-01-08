import { describe, it, expect } from 'vitest';
import isHslChannels from '../../../src/utils/is/isHslChannels.js';

describe('utils/is/isHslChannels', () => {
    it('works', () => {
        expect(isHslChannels('nope')).toEqual(false);
        expect(isHslChannels(['nope'])).toEqual(false);
        expect(isHslChannels(undefined)).toEqual(false);
        expect(isHslChannels(() => {})).toEqual(false); // eslint-disable-line @typescript-eslint/no-empty-function

        expect(isHslChannels({ h: '123', s: 10, l: 12 })).toEqual(false);
        expect(isHslChannels({ h: 123, s: 10, l: 12 })).toEqual(true);
    });
});
