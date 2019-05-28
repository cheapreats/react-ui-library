import React, { Fragment } from 'react';
import * as Themes from '@Themes';
import Template from '@Themes/_Template';
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

export const Global = ({ children, style, theme = 'default', extend = {} }) => {
    theme = { ...Template, ...Themes[theme], ...extend };
    return (
        <ThemeProvider theme={ theme }>
            <Fragment>
                <GlobalContext style={ style }/>
                { children }
            </Fragment>
        </ThemeProvider>
    );
}