export default function range(min: number, max: number): number[] {
    if (min <= 0) {
        max = max + Math.abs(min / 1) + 1;
    }

    return [...Array(max).keys()].map((i) => i + min);
}
