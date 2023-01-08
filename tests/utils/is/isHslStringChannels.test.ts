import { describe, it, expect } from 'vitest';
import isHslStringChannels from '../../../src/utils/is/isHslStringChannels.js';

describe('utils/is/isHslStringChannels', () => {
    it('works', () => {
        expect(isHslStringChannels('123deg, 10%, 10')).toEqual(false);
        expect(isHslStringChannels('123, 10%, 10%')).toEqual(false);
        expect(isHslStringChannels('123DEG, 10%, 10%')).toEqual(true);
        expect(isHslStringChannels('123deg  10%  10%')).toEqual(true);
        expect(isHslStringChannels('123deg 10% 10%')).toEqual(true);
    });
});
