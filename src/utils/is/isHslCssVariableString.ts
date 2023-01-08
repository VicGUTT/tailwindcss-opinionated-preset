import isString from '@vicgutt/isjs/isString';

export default function isHslCssVariableString(value: unknown): value is string {
    if (!isString(value)) {
        return false;
    }

    return value.toLowerCase().startsWith('hsl(var(--');
}
