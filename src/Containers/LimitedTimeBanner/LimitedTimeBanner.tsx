import React from 'react';
import styled from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { transition } from '@Utils/Mixins';

export interface BannerProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
    flat?: boolean;
    widthFitContent?: boolean;
}

export const LimitedTimeBanner: React.FC<BannerProps> = ({
    children,
    ...props
}): React.ReactElement => <BannerBox {...props}>{children}</BannerBox>;

const BannerBox = styled.div<BannerProps & MainInterface & ResponsiveInterface>`
    background-color: black;
    // Theme Stuff
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: white;
    width: 200px;
    height: 10px; 
    ${Main({
        padding: theme.dimensions.padding.container,
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

    ${({ widthFitContent }): string => `
    ${widthFitContent ? 'width:fit-content;' : ''}
    `}
`;

export default LimitedTimeBanner;