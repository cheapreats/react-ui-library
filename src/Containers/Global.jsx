import React, { Fragment } from 'react';
import * as Themes from '../Themes';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalContext = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }

    ${ ({ style, theme }) => style ? style(theme) : '' }
`;

export const Global = ({ children, style, theme = 'default', extend = {} }) => {
    theme = { ...Themes[theme], ...extend };
    return (
        <ThemeProvider theme={ theme }>
            <Fragment>
                <GlobalContext style={ style }/>
                { children }
            </Fragment>
        </ThemeProvider>
    );
}