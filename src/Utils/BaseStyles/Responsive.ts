// Styles for responsive components
export const Responsive = ({ media = {}, ...props }): string =>
    Object.entries(media).reduce(
        (acc, [breakpoint, styles]): string => `
        ${acc}
        @media (max-width: ${breakpoint}px) {
            ${typeof styles === 'function' ? styles(props) : styles}
        }
    `,
        '',
    );
export const ResponsiveProps: string[] = ['media'];
