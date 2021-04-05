import React from 'react';

import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';
import { flex } from '@Utils/Mixins';
import * as Themes from '@Themes';

interface Props {
    style?: (theme: DefaultTheme) => string;
}

export enum ThemeTypes {
    DARK = 'DarkTheme',
    MAIN = 'MainTheme',
}

const GlobalContext = createGlobalStyle<Props>`
    body {
        margin: 0;
        padding: 0;
        ${flex('column')}
        ${({ theme }): string => `
            color: ${theme.colors.text};
            font-family: ${theme.font.family};
        `}
    }

    #modal {
        z-index: 1;
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
    theme = ThemeTypes.MAIN,
    style,
    extend,
}): React.ReactElement => (
    <ThemeProvider theme={extend ? extend(Themes[theme]) : Themes[theme]}>
        <>
            <GlobalContext style={style} />
            {children}
        </>
    </ThemeProvider>
);

export default Global;
