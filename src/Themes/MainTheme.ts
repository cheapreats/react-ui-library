import Template, { _ThemeTemplateInterface } from './_ThemeTemplate';

export interface MainThemeInterface extends _ThemeTemplateInterface {
    colors: {
        primary: string,
        text: string,
        input: {
            default: string,
            success: string,
            error: string
        }
    }
}

export const MainTheme = {
    ...Template,
    colors: {
        primary: '#EE2434',
        text: '#4a4a4a',
        input: {
            default: '#f5f5f5',
            success: '#f5fff5',
            error: '#fff5f5'
        }
    }
};