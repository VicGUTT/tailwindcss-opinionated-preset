import { describe, it, expect } from 'vitest';
import isCssVariableString from '../../../src/utils/is/isCssVariableString.js';

describe('utils/is/isCssVariableString', () => {
    it('works', () => {
        expect(isCssVariableString(' VAR(--hey)')).toEqual(false);
        expect(isCssVariableString('VAR(--hey)')).toEqual(true);
    });
});
