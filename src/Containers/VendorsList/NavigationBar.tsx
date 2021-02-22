import React from 'react';
import styled from 'styled-components';
import { NavigationItem, INavigationItemProps } from './NavigationItem';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface INavigationBarProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    navigationBarItems: INavigationItemProps[];
    navigationItemProps?: INavigationItemProps;
    selectedNavLabel?: string;
}

export const NavigationBar: React.FC<INavigationBarProps> = ({
    navigationBarItems,
    navigationItemProps,
    selectedNavLabel,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        {navigationBarItems.map((item) => (
            <NavigationItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isSelected={selectedNavLabel === item.label}
                onNavigate={item.onNavigate}
                {...navigationItemProps}
            />
        ))}
    </Wrapper>
);

const Wrapper = styled.div`
    ${flex('row')};
    padding: 10px 0;
    ${media('phone', flex('column', 'center'))}
`;
