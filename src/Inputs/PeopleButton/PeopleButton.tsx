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

    /**
     * Handles Icon properties
     */
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    /**
     * Determines the size of the icon
     */
    iconSize?: string;
    /**
     * Handles button properties, css of button when not highlighted
     */
    primary?: boolean;
    /**
     * OnClick Handler
     */
    onClick?: React.MouseEventHandler;
    /**
     * Whether the button is disabled or not, If true then disabled
     */
    disabled?: boolean;
    /**
     * Vertical Line divider for PeopleButton
     */
    VerticalLine?:boolean,
}

/**
 * Button to display reservation summary
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
            <VerticalLine/>
            <Datepicker name="date" label="" />
        </StyledButton>
    );
};

/**
 * Styled button with css
 */
const StyledButton = styled.button<ButtonProps>`
    // Theme
    ${({
theme,
 ...props
}): string => `
        display: flex;
        align-items:center;
        margin:10px;
        padding:10px;
        ${clickable(theme.colors.background)}
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

/**
 * Props for Icon
 */
interface IconProps {
    hasText?: React.ReactNode;
    iconSize: string;
    as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

/**
 * const for Icon
 */
const Icon = styled.svg<IconProps>`
    ${transition(['transform', 'opacity'])};
    ${({ iconSize }) => `
        height: ${iconSize};
        width: ${iconSize};
    `}
    margin-right: ${({ hasText }): number => (hasText ? 8 : 0)}px;
`;

/**
 * const for Vertical line Divider
 */
const VerticalLine = styled.div`
    border-left: solid 1px #000000;
    height: 20px;
    margin-left: 20px; 
    margin-right: 20px; 
    color: ${({ theme }) => theme.colors.text};  
    `;


export default PeopleButton;
