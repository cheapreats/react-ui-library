import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { NavigationItem, INavigationItemProps } from './NavigationItem';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media, scroll } from '../../Utils/Mixins';


export interface INavigationBarItems {
    icon?: StyledIcon;
    label: string
};

export interface INavigationBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    navigationBarItems: INavigationBarItems[];
    navigationItemProps?: INavigationItemProps;
};

const FIRST_LABEL = 0;

export const NavigationBar: React.FC<INavigationBarProps> = ({
    navigationBarItems,
    navigationItemProps,
    ...props
}): React.ReactElement => {
    const [selectedItem, setSelectedItem] = useState(navigationBarItems[FIRST_LABEL].label);
    return (
        <Wrapper {...props}>
            {navigationBarItems.map(item => (
                <NavigationItem 
                    {...navigationItemProps}
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    selectedItem={selectedItem}
                    onClick={() => setSelectedItem(item.label)}
                />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${flex('row')};
    ${({ theme }): string => `
        border-bottom: 2px solid ${theme.colors.input.default};
    `};
    ${media(
        'phone',
        `
        ${flex('column', 'center')};
        ${scroll};
    `)};
`;