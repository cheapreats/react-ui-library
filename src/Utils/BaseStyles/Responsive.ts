// Styles for responsive components
export interface ResponsiveInterface {
    media?: {
        [name: string]: Function;
    };
}

export const Responsive = ({
    media = {},
    ...props
}: ResponsiveInterface): string =>
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
