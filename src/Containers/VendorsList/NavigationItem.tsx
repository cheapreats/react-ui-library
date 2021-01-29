import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { IconProps } from '@Containers/Accordion/AccordionItem';
import { Heading, HeadingProps } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface IWrapperProps {
    label?: string;
    selectedItem?: string; 
    icon?: StyledIcon;
    isSelected?: boolean;
}

export interface INavigationItemProps
    extends IWrapperProps, MainInterface,
        ResponsiveInterface,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    iconProps?: IconProps | { style: any };
    headingProps?: HeadingProps;
    onNavigate?: ( label?: string, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const NavigationItem: React.FC<INavigationItemProps> = ({
    icon,
    label,
    isSelected,
    iconProps,
    headingProps,
    onNavigate = ()=> console.log('nav'),
    ...props
}): React.ReactElement => (
    <Wrapper isSelected={isSelected} label={label} onClick={(event:React.MouseEvent<HTMLDivElement, MouseEvent>)=> onNavigate(label, event)} {...props}>
        <Icon as={icon} {...iconProps} />
        <Heading type="h6" {...headingProps}>
            {label}
        </Heading>
    </Wrapper>
);

const Wrapper = styled.div<IWrapperProps>`
    ${flex('row')};
    ${({ theme, isSelected }): string =>
        isSelected ?
            `
        border-bottom: solid 2px ${theme.colors.text};
    `: ''};
`;

const Icon = styled.svg`
    width: 30px;
    height: 30px;
`;
