import React from "react";
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
    children?: React.ReactNode,
    theme?: string,
    style?: React.CSSProperties,
    extend?: (theme: object) => object
}

export const Global: React.FunctionComponent<GlobalProps> = ({
    children,
    theme = 'MainTheme',
    style,
    extend
}): React.ReactElement => {
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
