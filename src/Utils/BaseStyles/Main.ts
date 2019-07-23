// Styles all components are expected to have
export const Main = ({ margin = 0, padding = 0, inlineStyle = '' }): string => `
    // Positioning
    margin: ${margin};
    padding: ${padding};

    // Inline Styles
    ${inlineStyle};
`;

export const MainProps: string[] = ['margin', 'padding', 'inlineStyle'];
