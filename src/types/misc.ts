import type Color from '../Support/Color.js';

export type Styles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export type ParsedCssVariable = Readonly<{
    key: string;
    name: string;
    defaultValue: string | null;
}>;

export type WalkColorCollectionCallback = (color: Color) => void;

export type MakeThemeColorCollectionOptions = {
    untouchableColorNames?: string[];
    withDefaultCssVarValue?: boolean;
    colorWithOpacityValueFactory?: boolean;
};
