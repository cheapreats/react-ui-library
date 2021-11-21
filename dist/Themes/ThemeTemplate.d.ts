export interface ThemeTemplateInterface {
    logo: string;
    name: string;
    font: {
        family: string;
        lineHeight: number;
        size: {
            default: string;
            small: string;
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            h6: string;
        };
    };
    dimensions: {
        padding: {
            container: string | number;
            default: string | number;
            square: string | number;
            withBorder: string | number;
        };
        multiSelect: {
            spacing: number;
        };
        loading: {
            height: number;
        };
        switch: {
            size: number;
            spacing: number;
        };
        radio: {
            size: string | number;
            spacing: number;
        };
        checkbox: {
            size: string | number;
            spacing: number;
        };
        radius: string | number;
        tag: {
            padding: string | number;
            fontSize: string;
        };
        navigation: {
            width: number;
            icon: number;
        };
        modal: {
            width: {
                large: string | number;
                default: string | number;
                small: string | number;
            };
        };
        select: {
            itemHeight: number;
        };
    };
    media: {
        tabletLarge: number;
        tablet: number;
        phone: number;
    };
    speed: {
        fast: number;
        normal: number;
        slow: number;
        page: number;
    };
    depth: string[];
}
declare const Theme: ThemeTemplateInterface;
export default Theme;
