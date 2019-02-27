import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Theme } from './Theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalContext = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color ${ ({ theme }) => theme.colors.background };
        color: ${ ({ theme }) => theme.colors.font };
        font-family: ${ ({ theme }) => theme.font };
    }
`;

export const Global = ({
    children,
    theme = 'default'
}) => (
    <ThemeProvider theme={Theme[theme]}>
        <Fragment>
            <GlobalContext/>
            { children }
        </Fragment>
    </ThemeProvider>
);

Global.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.oneOfType([
        'default',
        'dark'
    ])
};