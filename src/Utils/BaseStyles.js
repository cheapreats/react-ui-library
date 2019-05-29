// Styles all components are expected to have
export const Main = ({ margin = 0, padding = 0, style = '' }) => `
    // Positioning
    margin: ${ margin };
    padding: ${ padding };

    // Inline Styles
    ${ style }
`;
export const MainProps = ['margin', 'padding', 'style'];

// Styles for responsive components
export const Responsive = ({ media = {}, ...props }) => (
    Object.entries(media).reduce((acc, [ breakpoint, styles ]) => {
        acc += `
            @media (max-width: ${ breakpoint }px) {
                ${
                    typeof(styles) === 'function' ? styles(props) : styles
                }
            }
        `;
        return acc;
    }, '')
);
export const ResponsiveProps = ['media'];