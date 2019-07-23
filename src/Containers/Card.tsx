import React, { ReactNode } from 'react';
import { Main, Responsive } from '@Utils/BaseStyles';
import { transition } from '@Utils/Mixins';
import styled from 'styled-components';

export interface CardProps {
    children?: ReactNode;
    animated?: boolean;
    flat?: boolean;
}

export const Card = ({ children, ...props }: CardProps) => {
    return <CardBox {...props}>{children}</CardBox>;
};

const CardBox = styled.div`
    // Base Styles
    ${Responsive}
    ${Main}

    overflow: hidden;
    background-color: white;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Theme Stuff
    ${({ theme }) => `
        padding: ${theme.dimensions.card.padding};
        border-radius: ${theme.dimensions.card.radius};
        font-family: ${theme.font.family};
        color: ${theme.colors.text};
    `}

    // Flat
    ${({ flat, theme }) => (flat ? '' : `box-shadow: ${theme.depth[1]};`)}

    // Animated
    ${({ animated, flat, theme }) =>
        animated
            ? `
        ${transition(['box-shadow'])}
        &:hover {
            box-shadow: ${
                flat ? `${theme.depth[1]};` : '0 2px 6px rgba(0,0,0,0.3)'
            };
        }
    `
            : ''}
`;

export default Card;
