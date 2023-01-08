import { describe, it, expect } from 'vitest';
import parseHslStringChannels from '../../src/utils/parseHslStringChannels.js';

describe('utils/parseHslStringChannels', () => {
    it('works', () => {
        expect(parseHslStringChannels('215.000deg 13.793% 34.118%')).toEqual({ h: 215.0, s: 13.793, l: 34.118 });
        expect(parseHslStringChannels('200.406deg 98.010% 39.412%')).toEqual({ h: 200.406, s: 98.01, l: 39.412 });
        expect(parseHslStringChannels('141.892deg 69.159% 58.039%')).toEqual({ h: 141.892, s: 69.159, l: 58.039 });
        expect(parseHslStringChannels('0.000deg 90.604% 70.784%')).toEqual({ h: 0.0, s: 90.604, l: 70.784 });
        expect(parseHslStringChannels('174.667deg 83.851% 31.569%')).toEqual({ h: 174.667, s: 83.851, l: 31.569 });
        expect(parseHslStringChannels('0.000deg 0.000% 37.255%')).toEqual({ h: 0.0, s: 0.0, l: 37.255 });
    });
});
