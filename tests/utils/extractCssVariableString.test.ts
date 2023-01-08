import { describe, it, expect } from 'vitest';
import extractCssVariableString from '../../src/utils/extractCssVariableString.js';

describe('utils/extractCssVariableString', () => {
    it('works', () => {
        expect(extractCssVariableString('hsl(var(--yolo-500))')).toEqual('var(--yolo-500)');
        expect(extractCssVariableString('hsl(var(--yolo-500) / 0.5)')).toEqual('var(--yolo-500)');
        expect(extractCssVariableString('hsl(var(--yolo-500) / var(--tw-bg-opacity))')).toEqual('var(--yolo-500)');

        expect(extractCssVariableString('hsl(var(--yolo-500, #123))')).toEqual('var(--yolo-500, #123)');
        expect(extractCssVariableString('hsl(var(--yolo-500, #123) / 0.5)')).toEqual('var(--yolo-500, #123)');
        expect(extractCssVariableString('hsl(var(--yolo-500, #123) / var(--tw-bg-opacity))')).toEqual(
            'var(--yolo-500, #123)'
        );

        expect(extractCssVariableString('hsl(var(--yolo-500, 210deg 17.4% 82%))')).toEqual(
            'var(--yolo-500, 210deg 17.4% 82%)'
        );
        expect(extractCssVariableString('hsl(var(--yolo-500, 210deg 17.4% 82%) / 0.5)')).toEqual(
            'var(--yolo-500, 210deg 17.4% 82%)'
        );
        expect(extractCssVariableString('hsl(var(--yolo-500, 210deg 17.4% 82%) / var(--tw-bg-opacity))')).toEqual(
            'var(--yolo-500, 210deg 17.4% 82%)'
        );

        expect(extractCssVariableString('hsl(VAR(--yolo-500, 210deg 17.4% 82%))')).toEqual(null);
    });
});
