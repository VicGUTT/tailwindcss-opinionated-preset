import { describe, it, expect } from 'vitest';
import range from '../../src/utils/range.js';

describe('utils/range', () => {
    it('works', () => {
        expect(range(-1, 3)).toEqual([-1, 0, 1, 2, 3]);

        expect(range(0, 3)).toEqual([0, 1, 2, 3]);

        expect(range(1, 3)).toEqual([1, 2, 3]);
    });
});
