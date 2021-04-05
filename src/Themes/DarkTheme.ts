import Template, { ThemeTemplateInterface } from './ThemeTemplate';

export interface DarkInterface extends ThemeTemplateInterface {
}

export const DarkTheme: DarkInterface = {
    ...Template,
};
