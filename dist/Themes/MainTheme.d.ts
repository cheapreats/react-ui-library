import { ThemeTemplateInterface } from './ThemeTemplate';
export interface MainThemeInterface extends ThemeTemplateInterface {
    colors: {
        primary: string;
        text: string;
        input: {
            default: string;
            success: string;
            error: string;
        };
        statusColors: {
            green: string;
            orange: string;
            red: string;
        };
        background: string;
        border: string;
        occupancyStatusColors: {
            Vacant: string;
            Reserved: string;
            Occupied: string;
        };
        PieChartColors: {
            Red: string;
            Green: string;
            Yellow: string;
        };
        editControlPanelColor: string;
        chairTableBackground: string;
        chairOccupiedBackground: string;
        chairTableEditBackground: string;
        bannerBackgroundColor: string;
    };
}
export declare const MainTheme: MainThemeInterface;
