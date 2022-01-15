import Template, { ThemeTemplateInterface } from './ThemeTemplate';

export interface DarkInterface extends ThemeTemplateInterface {
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
        reachIndicatorColors: {
            red: string;
            yellow: string;
            green: string;
        };
        bannerBackgroundColor: string;
    };
}

export const DarkTheme: DarkInterface = {
    ...Template,
    colors: {
        primary: '#EE2434',
        text: '#4a4a4a',
        input: {
            default: '#f5f5f5',
            success: '#f5fff5',
            error: '#fff5f5',
        },
        statusColors: {
            green: '#28af00',
            orange: '#f98300',
            red: '#ee2434',
        },
        background: '#ffffff',
        border: 'rgba(0,0,0,0.1)',
        occupancyStatusColors: {
            Vacant: '#28a745',
            Reserved: '#ffc107',
            Occupied: '#17a2b8',
        },
        editControlPanelColor: '#6c757d',
        chairTableBackground: '#6c757d',
        chairOccupiedBackground: '#EE2434',
        chairTableEditBackground: '#C4C4C4',
        bannerBackgroundColor : 'rgba(0,0,0,0.5)',
        PieChartColors: {
            Red: '#FF0000',
            Green: '#008000',
            Yellow: '#ffff00',
        },
        reachIndicatorColors: {
            red: '#f50707',
            yellow: '#d1b306',
            green: '#09d106',
        },
    },
};

