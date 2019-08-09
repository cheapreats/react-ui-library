import React from 'react';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { transition } from '@Utils/Mixins';
import styled from 'styled-components';

export interface CardProps {
    animated?: boolean;
    flat?: boolean;
}

export const Card: React.FunctionComponent<CardProps> = ({
    children,
    ...props
}): React.ReactElement => <CardBox {...props}>{children}</CardBox>;

const CardBox = styled.div<CardProps & MainInterface & ResponsiveInterface>`
    overflow: hidden;
    background-color: white;

    // Theme Stuff
    ${({ theme, ...props }): string => `
        border-radius: ${theme.dimensions.card.radius};
        font-family: ${theme.font.family};
        color: ${theme.colors.text};
        ${Main({
        padding: theme.dimensions.card.padding,
        ...props,
    })}
    `}

    // Flat
    box-shadow: ${({ flat, theme }): string => theme.depth[flat ? 0 : 1]};

    // Animated
    ${({ animated, flat, theme }): string =>
        animated
            ? `
        ${transition(['box-shadow'])}
        &:hover {
            box-shadow: ${theme.depth[flat ? 1 : 2]};
        }
    `
            : ''}

    // Base Styles
    ${Responsive}
`;

export default Card;
