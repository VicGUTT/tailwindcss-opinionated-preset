// import defaultConfig from 'tailwindcss/stubs/defaultConfig.stub';

import range from '../range.js';

type Job = {
    passes: (key: number, maxValue: number) => boolean;
    handle: (key: number, maxValue: number) => number;
};

const rem = 4;

const jobs: Record<string, Job> = {
    computeByHalf: {
        passes: (key) => key <= 20,
        handle: (key) => key / 2,
    },
    computeByOne: {
        passes: (key) => key > 10 && key <= 20,
        handle: (key) => key,
    },
    computeByTwo: {
        passes: (key) => key >= 20 && key < 100 && key % 2 === 0,
        handle: (key) => key + 2,
    },
    computeByFour: {
        passes: (key, maxValue) => key >= 100 && key % 4 === 0 && key < maxValue,
        handle: (key) => key + 4,
    },
};

export default function computeTailwindAdditionalSpacing(maxValue = 200) {
    const _jobs = Object.values(jobs);

    return range(0, maxValue).reduce(
        (acc, key) => {
            for (const job of _jobs) {
                if (!job.passes(key, maxValue)) {
                    continue;
                }

                const computed = job.handle(key, maxValue);

                acc[computed] = value(computed);
            }

            return acc;
        },
        {} as Record<number, string>
    );
}

function value(computed: number): string {
    return `${computed / rem}rem`;
}
