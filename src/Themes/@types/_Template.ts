
export interface _TemplateInterface {
    font: {
        family: string,
        lineHeight: number,
        size: {
            default: string,
            small: string,
            h1: string,
            h2: string,
            h3: string,
            h4: string,
            h5: string,
            h6: string
        }
    },
    dimensions: {
        padding: {
            default: string | number,
            withBorder: string | number
        },
        switch: {
            size: number,
            spacing: number
        },
        radio: {
            size: string | number,
            spacing: number
        },
        radius: string | number
    },
    speed: {
        fast: number,
        normal: number,
        slow: number,
        page: number
    },
    depth: string[]
}