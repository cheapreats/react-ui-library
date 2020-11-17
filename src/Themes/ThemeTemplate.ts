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

const Theme: ThemeTemplateInterface = {
    logo: 'https://scontent.fyvr5-1.fna.fbcdn.net/v/t1.0-9/29432778_207936176627967_6515661452525090864_n.png?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=Y4elB2T2_QAAX8A4bva&_nc_ht=scontent.fyvr5-1.fna&oh=7ce813a1e2bd2372bbd55cea07f2510e&oe=5FC584E4',
    name: 'CheaprEats',
    font: {
        family: '"Quicksand", sans-serif',
        lineHeight: 1.6,
        size: {
            default: '1rem',
            small: '0.85rem',
            h1: '2rem',
            h2: '1.75rem',
            h3: '1.55rem',
            h4: '1.4rem',
            h5: '1.3rem',
            h6: '1.2rem',
        },
    },
    dimensions: {
        padding: {
            container: '16px',
            default: '12px 20px',
            square: '12px',
            withBorder: '10.5px 18.5px',
        },
        multiSelect: {
            spacing: 5,
        },
        loading: {
            height: 4,
        },
        switch: {
            size: 30,
            spacing: 5,
        },
        radio: {
            size: 12,
            spacing: 3,
        },
        checkbox: {
            size: 12,
            spacing: 3,
        },
        radius: '8px',
        tag: {
            padding: '6px 12px',
            fontSize: '0.8rem',
        },
        navigation: {
            width: 225,
            icon: 30,
        },
        modal: {
            width: {
                large: '800px',
                default: '600px',
                small: '400px',
            },
        },
        select: {
            itemHeight: 41,
        },
    },
    media: {
        tabletLarge: 1024,
        tablet: 768,
        phone: 425,
    },
    speed: {
        fast: 150,
        normal: 250,
        slow: 400,
        page: 600,
    },
    depth: ['none', '0 1px 3px rgba(0,0,0,0.2)', '0 2px 6px rgba(0,0,0,0.3)'],
};

export default Theme;
