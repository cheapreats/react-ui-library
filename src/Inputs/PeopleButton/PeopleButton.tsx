import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { UserCircle } from '@styled-icons/fa-solid/UserCircle';
import {
    Main,
    MainInterface,
    ResponsiveInterface,
} from '@Utils/BaseStyles';
import { clickable, transition } from '@Utils/Mixins';
import {Datepicker} from "@Inputs";

export interface ButtonProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLButtonElement> {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    iconSize?: string;
    contentColor?: string;
    color?: string;
    primary?: boolean;
    full?: boolean;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;

}

/**
 * A people button to display reservation
 * @param children
 * @param icon
 * @param disabled
 * @param props
 * @constructor
 */
export const PeopleButton: React.FC<ButtonProps> = ({
    children,
    iconSize = '14px',
    disabled,
    ...props
}): React.ReactElement => {
    return (
        <StyledButton {...props} disabled={disabled} >
                    <Icon
                        iconSize={iconSize}
                        as={UserCircle}
                        hasText={children}
                    />
            {children}
            <div style={{borderLeft: "1px solid #000000 ", height:20, marginLeft: 20, marginRight: 20, color: "black",}}/>
            <Datepicker name="date" label="" />
        </StyledButton>
    );
};

const StyledButton = styled.button<ButtonProps>`
    // Theme Stuff
    ${({
theme,
color = 'background',
contentColor = 'text',
 ...props
}): string => `
        font-family: ${theme.font.family};
        background-color: ${theme.colors[color] || color};
        color: ${theme.colors[contentColor] || contentColor};
        display: flex;
        align-items:center;
        margin:10px;
        padding:10px;
        ${clickable(theme.colors[color] || color)}
        ${Main({
    padding: theme.dimensions.padding.withBorder,
    ...props,
})}
    `}
    // Primary button
    ${({ primary, theme }): string =>
    primary
        ? `
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};  
      `: ''}
`;

interface IconProps {
    hasText?: React.ReactNode;
    iconSize: string;
    as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

const Icon = styled.svg<IconProps>`
    ${transition(['transform', 'opacity'])};
    ${({ iconSize }) => `
        height: ${iconSize};
        width: ${iconSize};
    `}
    margin-right: ${({ hasText }): number => (hasText ? 8 : 0)}px;
`;

export default PeopleButton;
