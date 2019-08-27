import React, { Fragment } from 'react';

import {
    createGlobalStyle,
    ThemeProvider,
    DefaultTheme,
} from 'styled-components';
import * as Themes from '@Themes';

interface Props {
    style?: (theme: DefaultTheme) => string;
}

const GlobalContext = createGlobalStyle<Props>`
    body {
        margin: 0;
        padding: 0;
        ${({ theme }): string => `
            color: ${theme.colors.text};
            font-family: ${theme.font.family};
        `}
    }

    ${({ style, theme }): string => (style ? style(theme) : '')}
`;

export interface GlobalProps extends Props {
    children?: React.ReactNode;
    theme?: string;
    extend?: (theme: object) => object;
}

export const Global: React.FC<GlobalProps> = ({
    children,
    theme = 'MainTheme',
    style,
    extend,
}): React.ReactElement => (
    <ThemeProvider theme={extend ? extend(Themes[theme]) : Themes[theme]}>
        <Fragment>
            <GlobalContext style={style} />
            {children}
        </Fragment>
    </ThemeProvider>
);

export default Global;
