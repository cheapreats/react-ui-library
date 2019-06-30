import theme from '@Themes/_ThemeTemplate';

const COLOR_RANGE = 255;
const FLEX_DIRECTIONS = [
    'row',
    'column',
    'reverse-row',
    'reverse-column'
];


export const styledSwitch = (value: any, ...args: any[]): string => {
    const len = args.length;
    for (let i = 0; i < len; i += 2) {
        if (value === args[i]) return args[i + 1];
    }

    // If even, no default so return nothing, else return the default
    if (len % 2) return args[len - 1];
    return '';
};


export const styledCondition = (...args: any[]): string => {
    const len = args.length;
    for (let i = 1; i < len; i += 2) {
        if (args[i - 1]) return args[i];
    }

    // If even, no default so return nothing, else return the default
    if (len % 2) return args[len - 1];
    return '';
}


/**
 * Darkens given color (Would support more in the future)
 * @param {string} color - HEX color
 * @param {number} [amount=0.1] - Percentage of darkening
 * @returns {string} Darkened color
 */
export const darken = (color: string, amount: number = 0.1): string => {
    let res = '#';
    color = color.slice(1);
    const val = Math.floor(COLOR_RANGE * amount);

    for (let i = 0; i < 6; i += 2) {
        const c = parseInt(color.slice(i, i + 2), 16);
        const num = Math.max(c - val, 0);
        res += num.toString(16).padStart(2, '0');
    }
    return res;
};


/**
 * Styles for clickable content
 * @param {string} color - background-color of content
 * @returns {string} The interactive styles for clickable content
 */
export const clickable = (color: string, amount = 0.1): string => `
    &:not(:disabled):hover {
        background-color: ${ darken(color, amount) };
    }

    &:not(:disabled):active {
        background-color: ${ darken(color, amount * 2) };
    }
`;


/**
 * Defined transition for specific property
 * @typedef {Object} TransitionOption
 * @property {string} property - The transition property that is being targetted
 * @property {string|number} duration - The duration (default in milliseconds)
 */
export type TransitionOptionType = {
    duration?: String | Number,
    prop: String
}

/**
 * Adds transitions in batch
 * @param {string[]|TransitionOption[]} items - The items to transition with optional configuration
 * @param {string|number} duration - The duration of transition
 * @returns {string} CSS style for transition for provided items
 */
export const transition = (
    items: (TransitionOptionType | string)[],
    duration: string | number = theme.speed.normal
): string => (
    `transition: ${
        items.reduce<string>(
            (acc: any, item: string | TransitionOptionType) => {
                const d = typeof(item) === 'string' ? duration : item.duration;
                const i = `${typeof(item) === 'string' ? item : item.prop} ${d + (typeof(d) === 'number' ? 'ms' : '')}`;
                return `${acc}, ${i} cubic-bezier(0.4, 0.0, 0.2, 1)`;
            }, ''
        ).slice(2)
    };`
);


/**
 * Positioning with defaulting built in
 * @param {string} [value='absolute'] - The CSS positioning used
 * @param {number|string} [margin=0] - The margin used
 * @param {number|string} [top='auto'] - CSS top attribute
 * @param {number|string} right - CSS right attribute (Defaults to top)
 * @param {number|string} bottom - CSS bottom attribute (Defaults to top)
 * @param {number|string} left - CSS left attribute (Defaults to right)
 * @returns {string} Styling for consistent and stable positioning
 */
export const position = (
    value: string = 'absolute',
    margin: number | string = 'auto',
    top: number | string = 0,
    right: number | string = top,
    bottom: number | string = top,
    left: number | string = right
): string => `
    position: ${ value };
    margin: ${ margin };
    top: ${ top };
    right: ${ right };
    bottom: ${ bottom };
    left: ${ left };
`;


/**
 * Flex display with common properties. Can have the following configurations
 * - Nothing => row, flex-start, flex-start
 * - One param => direction / justify + align
 * - Two param => (direction, justify + align) OR (justify, align)
 * - Three param => (direction, justify, align)
 * @param {string} param1 - First parameter
 * @param {string} param2 - Second parameter
 * @param {string} param3 - Third parameter
 * @returns {string} flex styles
 */
export const flex = (
    param1?: string,
    param2?: string,
    param3?: string
): string => {

    // No params
    if (!param1) return 'display: flex;';

    // One param
    if (!param2) {
        return `
            display: flex;
            ${FLEX_DIRECTIONS.includes(param1) ? `
                flex-direction: ${ param1 };
            ` : `
                justify-content: ${ param1 };
                align-items: ${ param1 };
            `}
        `;
    }

    // Two params
    if (!param3) {
        return `
            display: flex;
            ${FLEX_DIRECTIONS.includes(param1) ? `
                flex-direction: ${ param1 };
                justify-content: ${ param2 };
                align-items: ${ param2 };
            ` : `
                justify-content: ${ param1 };
                align-items: ${ param2 };
            `}
        `;
    }

    // Three params
    return `
        display: flex;
        flex-direction: ${ param1 };
        justify-content: ${ param2 };
        align-items: ${ param3 };
    `;
};

export const scroll = `
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #efefef;

        &-thumb {
            background-color: rgba(0,0,0,0.2);
            border-radius: 999px;
        }
    }
`;