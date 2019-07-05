import React, { Fragment } from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import * as Themes from '@Themes';

const GlobalContext = createGlobalStyle`
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

export interface GlobalProps {
    children?: React.ReactNode;
    theme?: string;
    style?: React.CSSProperties;
    extend?: (theme: object) => object;
}

export const Global: React.FunctionComponent<GlobalProps> = ({
    children,
    theme = 'MainTheme',
    style,
    extend,
}): React.ReactElement => (
    <ThemeProvider theme={extend ? extend(Themes[theme]) : Themes[theme]}>
        <Fragment>
            <GlobalContext style={style} />
            { children }
        </Fragment>
    </ThemeProvider>
);

export default Global;
