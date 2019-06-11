import React, { ReactNode, CSSProperties } from "react";
import { Fragment } from 'react';
import * as Themes from '@Themes';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalContext = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        ${({ theme }) => `
            color: ${ theme.colors.text };
            font-family: ${ theme.font.family };
        `}
    }

    ${({ style, theme }) => style ? style(theme) : ''}
`;

export interface GlobalProps {
    children?: ReactNode,
    theme?: string,
    style?: CSSProperties,
    extend?: (theme: object) => object
}

export const Global = ({
    children,
    theme = 'MainTheme',
    style,
    extend
}: GlobalProps) => {
    theme = extend ? extend(Themes[theme]) : Themes[theme];
    return (
        <ThemeProvider theme={ theme }>
            <Fragment>
                <GlobalContext style={ style }/>
                { children }
            </Fragment>
        </ThemeProvider>
    );
};

export default Global;
