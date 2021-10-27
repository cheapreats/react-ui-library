import { DefaultTheme, InterpolationFunction } from 'styled-components';

export const media =
    (
        breakpoint: string | number,
        styles: string,
    ): InterpolationFunction<{ theme: DefaultTheme }> =>
    ({ theme }): string =>
        `@media (max-width: ${theme.media[breakpoint] || breakpoint}px) {
            ${styles}
        }`;
