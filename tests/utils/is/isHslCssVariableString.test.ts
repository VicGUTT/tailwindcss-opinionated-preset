import { describe, it, expect } from 'vitest';
import isHslCssVariableString from '../../../src/utils/is/isHslCssVariableString.js';

describe('utils/is/isHslCssVariableString', () => {
    it('works', () => {
        expect(isHslCssVariableString(' HSL(VAR(--hey))')).toEqual(false);
        expect(isHslCssVariableString('HSL(VAR(--hey))')).toEqual(true);
    });
});
