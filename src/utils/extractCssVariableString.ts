export default function extractCssVariableString(value: string): string | null {
    return value.match(/var\((.*?)\)/)?.[0] ?? null;
}
