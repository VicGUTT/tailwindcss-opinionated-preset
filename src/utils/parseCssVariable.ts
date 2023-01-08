import { type ParsedCssVariable } from '../types/misc.js';

export default function parseCssVariable(value: string): ParsedCssVariable | null {
    const matches = value.match(/var\(([a-zA-Z-0-9-_\s]+),?(.*)\)/);
    let key = matches?.[1];
    let defaultValue = matches?.[2] ?? null;

    if (!key) {
        return null;
    }

    key = key.trim();

    if (!key.startsWith('--') || key === '--') {
        return null;
    }

    if (defaultValue) {
        defaultValue = defaultValue.trim();
    }

    if (!defaultValue) {
        defaultValue = null;
    }

    return { key, name: key.replace('--', ''), defaultValue };
}
