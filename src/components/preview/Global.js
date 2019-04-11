import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Theme } from './Theme';
import { scroll } from '../mixins';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalContext = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: ${ ({ theme }) => theme.colors.background };
        color: ${ ({ theme }) => theme.colors.font };
        font-family: ${ ({ theme }) => theme.font };
        ${ ({ style }) => style }
        ${ scroll }
    }
`;

export const Global = ({
    children,
    style,
    theme = 'default'
}) => (
    <ThemeProvider theme={Theme[theme]}>
        <Fragment>
            <GlobalContext style={ style }/>
            { children }
        </Fragment>
    </ThemeProvider>
);

Global.propTypes = {
    children: PropTypes.node,
    /** For adding additiona global styles */
    style: PropTypes.func,
    theme: PropTypes.oneOfType([
        'default',
        'dark'
    ])
};