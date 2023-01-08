import { describe, it, expect } from 'vitest';
import extractHslStringChannels from '../../src/utils/extractHslStringChannels.js';

describe('utils/extractHslStringChannels', () => {
    it('works', () => {
        expect(extractHslStringChannels('hsl(215.000deg 13.793% 34.118%)')).toEqual('215.000deg 13.793% 34.118%');
        expect(extractHslStringChannels('hsl(200.406deg 98.010% 39.412%)')).toEqual('200.406deg 98.010% 39.412%');
        expect(extractHslStringChannels('hsl(141.892deg 69.159% 58.039%)')).toEqual('141.892deg 69.159% 58.039%');
        expect(extractHslStringChannels('hsl(0.000deg 90.604% 70.784%)')).toEqual('0.000deg 90.604% 70.784%');
        expect(extractHslStringChannels('hsl(174.667deg 83.851% 31.569%)')).toEqual('174.667deg 83.851% 31.569%');
        expect(extractHslStringChannels('hsl(0.000deg 0.000% 37.255%)')).toEqual('0.000deg 0.000% 37.255%');
    });
});
