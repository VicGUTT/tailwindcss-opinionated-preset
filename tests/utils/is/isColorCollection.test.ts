import { describe, it, expect } from 'vitest';
import isColorCollection from '../../../src/utils/is/isColorCollection.js';

describe('utils/is/isColorCollection', () => {
    it('works', () => {
        expect(isColorCollection('#fff')).toEqual(false);
        expect(isColorCollection({ white: '#fff' })).toEqual(false);
        expect(isColorCollection({ white: ['#fff'] })).toEqual(false);
        expect(isColorCollection({ 500: '#fff' })).toEqual(false);
        expect(isColorCollection({ 500: ['#fff'] })).toEqual(false);

        expect(isColorCollection({ white: { white: '#fff' } })).toEqual(true);
        expect(isColorCollection({ white: { 500: '#fff' } })).toEqual(true);

        expect(isColorCollection({ 500: { white: '#fff' } })).toEqual(true);
        expect(isColorCollection({ 500: { 500: '#fff' } })).toEqual(true);

        expect(isColorCollection({ white: { white: '#fff', 500: '#fff' } })).toEqual(true);
        expect(isColorCollection({ 500: { white: '#fff', 500: '#fff' } })).toEqual(true);
    });
});
