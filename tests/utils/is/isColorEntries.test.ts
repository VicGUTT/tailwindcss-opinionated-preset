import { describe, it, expect } from 'vitest';
import isColorEntries from '../../../src/utils/is/isColorEntries.js';

describe('utils/is/isColorEntries', () => {
    it('works | string value', () => {
        const value = '#fff';

        expect(isColorEntries(value)).toEqual(false);
        expect(isColorEntries({ white: [value] })).toEqual(false);
        expect(isColorEntries({ 500: [value] })).toEqual(false);
        expect(isColorEntries({ white: { white: value } })).toEqual(false);
        expect(isColorEntries({ white: { 500: value } })).toEqual(false);
        expect(isColorEntries({ 500: { white: value } })).toEqual(false);
        expect(isColorEntries({ 500: { 500: value } })).toEqual(false);
        expect(isColorEntries({ white: { white: value, 500: value } })).toEqual(false);
        expect(isColorEntries({ 500: { white: value, 500: value } })).toEqual(false);

        expect(isColorEntries({ white: value })).toEqual(true);
        expect(isColorEntries({ 500: value })).toEqual(true);
    });

    it('works | value factory', () => {
        const value = () => '#fff';

        expect(isColorEntries(value)).toEqual(false);
        expect(isColorEntries({ white: [value] })).toEqual(false);
        expect(isColorEntries({ 500: [value] })).toEqual(false);
        expect(isColorEntries({ white: { white: value } })).toEqual(false);
        expect(isColorEntries({ white: { 500: value } })).toEqual(false);
        expect(isColorEntries({ 500: { white: value } })).toEqual(false);
        expect(isColorEntries({ 500: { 500: value } })).toEqual(false);
        expect(isColorEntries({ white: { white: value, 500: value } })).toEqual(false);
        expect(isColorEntries({ 500: { white: value, 500: value } })).toEqual(false);

        expect(isColorEntries({ white: value })).toEqual(true);
        expect(isColorEntries({ 500: value })).toEqual(true);
    });
});
