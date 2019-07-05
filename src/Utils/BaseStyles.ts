// Styles all components are expected to have
export const Main = ({ margin = 0, padding = 0, inlineStyle = '' }): string => `
    // Positioning
    margin: ${margin};
    padding: ${padding};

    // Inline Styles
    ${inlineStyle}
`;
export const MainProps: string[] = ['margin', 'padding', 'inlineStyle'];

// Styles for responsive components
export const Responsive = ({ media = {}, ...props }): string => (
    Object.entries(media).reduce((acc, [breakpoint, styles]): string => `
        ${acc}
        @media (max-width: ${breakpoint}px) {
            ${typeof (styles) === 'function' ? styles(props) : styles}
        }
    `, '')
);
export const ResponsiveProps: string[] = ['media'];
