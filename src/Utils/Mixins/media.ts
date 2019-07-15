import theme from '@Themes/ThemeTemplate';

export const media = (breakpoint: string | number, styles: string): string =>
    `@media (max-width: ${theme.media[breakpoint] || breakpoint}px) {
        ${styles}
    }`;
