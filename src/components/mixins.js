import { css } from 'styled-components';

const SIZES = {
  tablet: 880
}

// https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md#media-templates

export const media = Object.keys(SIZES).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${SIZES[label]}px) {
            ${ css(...args) };
        }
    `;
    return acc;
}, {});

export const scroll = `
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: rgba(0,0,0,0.1);

        &-thumb {
            background-color: rgba(0,0,0,0.25);
            border-radius: 99px;
        }
    }
`;

export const transition = (items, duration = 300) => `transition: ${
    items.reduce((acc, item) => (
        `${acc}, ${item} ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
    ), '').slice(2)
};`;

export const position = (position, margin = 'auto', top = 0, right = top, bottom = top, left = right) => `
    position: ${ position };
    margin: ${ margin };
    top: ${ typeof(top) === 'string'? top: top + 'px' };
    right: ${ typeof(right) === 'string'? right: right + 'px' };
    bottom: ${ typeof(bottom) === 'string'? bottom: bottom + 'px' };
    left: ${ typeof(left) === 'string'? left: left + 'px' };
`;

const FLEX_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];
export const flex = (p1, p2, p3 = p2, override) => `
    display: flex;
    ${
        FLEX_DIRECTIONS.findIndex(item => item === p1) > -1 ? `
            ${ override || (p1 && p1 !== 'row')? `flex-direction: ${p1};`: '' }
            ${ override || (p2 && p2 !== 'flex-start')? `justify-content: ${p2};`: '' }
            ${ override || ((p3 && p3 !== 'flex-start') || (p2 && p2 !== 'flex-start'))? `align-items: ${p3 || p2};`: '' }
        ` : `
            ${ override || (p1 && p1 !== 'flex-start')? `justify-content: ${p1};`: '' }
            ${ override || ((p2 && p2 !== 'flex-start') || (p1 && p1 !== 'flex-start'))? `align-items: ${p2 || p1};`: '' }
        `
    }
`;