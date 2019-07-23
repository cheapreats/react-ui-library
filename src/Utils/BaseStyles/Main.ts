// Styles all components are expected to have
export interface MainInterface {
    margin?: string | number;
    padding?: string | number;
    inlineStyle?: string;
}

export const Main = ({
    margin = 0,
    padding = 0,
    inlineStyle = '',
}: MainInterface): string => `
    // Positioning
    margin: ${margin};
    padding: ${padding};

    // Inline Styles
    ${inlineStyle};
`;

export const MainProps: string[] = ['margin', 'padding', 'inlineStyle'];
