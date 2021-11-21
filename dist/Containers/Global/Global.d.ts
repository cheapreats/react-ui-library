import React from 'react';
import { DefaultTheme } from 'styled-components';
interface Props {
    style?: (theme: DefaultTheme) => string;
}
export declare enum ThemeTypes {
    DARK = "DarkTheme",
    MAIN = "MainTheme"
}
export interface GlobalProps extends Props {
    children?: React.ReactNode;
    theme?: string;
    extend?: (theme: object) => object;
}
export declare const Global: React.FC<GlobalProps>;
export default Global;
