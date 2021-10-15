/* import React from 'react';
import styled from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { transition } from '@Utils/Mixins';

export interface MenuItemCardProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
    flat?: boolean;
    widthFitContent?: boolean;
    sale?: boolean;
    souldout?: boolean;
}


export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    children,
    ...props
}): React.ReactElement => <MenuItemCardBox {...props}>{children}</MenuItemCardBox>;

const MenuItemCardBox = styled.div<MenuItemCardProps & MainInterface & ResponsiveInterface>`
    background-color: white;
    // Theme Stuff
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    width: 350px;
    height: 300px; 
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

    // Sale
        
    // Soldout

    // Base Styles
    ${Responsive}

    ${({ widthFitContent }): string => `
    ${widthFitContent ? 'width:fit-content;' : ''}
    `}
`;

export default MenuItemCard;

*/