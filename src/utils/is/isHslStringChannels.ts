import isString from '@vicgutt/isjs/isString';

export default function isHslStringChannels(value: unknown): value is string {
    if (!isString(value)) {
        return false;
    }

    return value.toLowerCase().includes('deg') && value.endsWith('%');
}
