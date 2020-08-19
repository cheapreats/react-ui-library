import Template, { ThemeTemplateInterface } from './ThemeTemplate';

export interface MainThemeInterface extends ThemeTemplateInterface {
    colors: {
        primary: string;
        text: string;
        input: {
            default: string;
            success: string;
            error: string;
        };
        status: {
            prepared: string;
            preparing: string;
            placed: string;
            cancelled: string;
            complete: string;
        };
        background: string;
        border: string;
    };
}

export const MainTheme: MainThemeInterface = {
    ...Template,
    colors: {
        primary: '#EE2434',
        text: '#4a4a4a',
        input: {
            default: '#f5f5f5',
            success: '#f5fff5',
            error: '#fff5f5',
        },
        status: {
            prepared: '#28af00',
            preparing: '#f98300',
            placed: '#ee2434',
            cancelled: '#ee2434',
            complete: '#28af00',
        },
        background: '#ffffff',
        border: 'rgba(0,0,0,0.1)',
    },
};
