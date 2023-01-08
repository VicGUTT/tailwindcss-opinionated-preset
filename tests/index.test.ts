import { describe, it, expect } from 'vitest';
import resolveConfig from 'tailwindcss/resolveConfig.js';
import preset from '../src/index.js';
import setSnapshotContent from './__utils/setSnapshotContent.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import getSnapshotContent from './__utils/getSnapshotContent.js';

describe('index', () => {
    it('works', () => {
        const config = JSON.stringify(resolveConfig(preset()), undefined, 4);

        // setSnapshotContent('index.json', config);

        expect(config).toEqual(getSnapshotContent('index.json'));
    });
});
