export default function extractHslStringChannels(value: string): string | null {
    return value.match(/hsl\((.*)\)/)?.[1] ?? null;
}
