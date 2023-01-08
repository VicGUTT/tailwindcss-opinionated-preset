import { describe, it, expect } from 'vitest';
import parseCssVariable from '../../src/utils/parseCssVariable.js';

describe('utils/parseCssVariable', () => {
    it('works', () => {
        expect(parseCssVariable('var(--primary-100, #123)')).toEqual({
            key: '--primary-100',
            name: 'primary-100',
            defaultValue: '#123',
        });
        expect(parseCssVariable('var(--tertiary, #123)')).toEqual({
            key: '--tertiary',
            name: 'tertiary',
            defaultValue: '#123',
        });
        expect(parseCssVariable('var(--secondary-default)')).toEqual({
            key: '--secondary-default',
            name: 'secondary-default',
            defaultValue: null,
        });

        expect(parseCssVariable('var(  --primary-100  ,  #123  )')).toEqual({
            key: '--primary-100',
            name: 'primary-100',
            defaultValue: '#123',
        });
        expect(parseCssVariable('var(  --tertiary  ,  #123  )')).toEqual({
            key: '--tertiary',
            name: 'tertiary',
            defaultValue: '#123',
        });
        expect(parseCssVariable('var(  --secondary-default  )')).toEqual({
            key: '--secondary-default',
            name: 'secondary-default',
            defaultValue: null,
        });

        expect(parseCssVariable('var(--_tertiary_, #123)')).toEqual({
            key: '--_tertiary_',
            name: '_tertiary_',
            defaultValue: '#123',
        });
        expect(parseCssVariable('var(--134, #123)')).toEqual({ key: '--134', name: '134', defaultValue: '#123' });

        expect(parseCssVariable('var(--, #123)')).toEqual(null);
        expect(parseCssVariable('var(--   , #123)')).toEqual(null);
        expect(parseCssVariable('var(134, #123)')).toEqual(null);
    });
});
