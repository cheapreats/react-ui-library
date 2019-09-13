// Styles all components are expected to have
export interface MainInterface {
    margin?: string | number;
    padding?: string | number;
    inlineStyle?: string | Function;
}

export const Main = ({
    margin = 0,
    padding = 0,
    inlineStyle = '',
    ...props
}: MainInterface): string => `
    // Positioning
    margin: ${margin};
    padding: ${padding};

    // Inline Styles
    ${
        typeof inlineStyle === 'function'
            ? inlineStyle({ ...props, margin, padding })
            : inlineStyle
    };
`;

export const MainProps: string[] = ['margin', 'padding', 'inlineStyle'];
