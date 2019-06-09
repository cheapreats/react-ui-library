import { _TemplateInterface } from './@types/_Template';

const Theme: _TemplateInterface = {
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
            h6: '1.2rem'
        }
    },
    dimensions: {
        padding: {
            default: '12px 20px',
            withBorder: '10.5px 18.5px'
        },
        switch: {
            size: 30,
            spacing: 5
        },
        radio: {
            size: 16,
            spacing: 4,
        },
        radius: '8px'
    },
    speed: {
        fast: 150,
        normal: 250,
        slow: 400,
        page: 600
    },
    depth: [
        'none',
        '0 1px 3px rgba(0,0,0,0.2)'
    ]
};

export default Theme;