import React from 'react';
import styled from 'styled-components';
import { Mixins } from '../Utils';
import { NavigationHeader, NavigationItem, NavigationHeaderProps } from '.';

interface NavProps {
    to: string;
    label?: string;
    icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

export interface NavigationProps extends NavigationHeaderProps {
    header?: React.ReactElement;
    footer?: React.ReactElement;
    pages?: {
        [name: string]: {
            component: React.LazyExoticComponent<React.ComponentType>;
            navProps: NavProps;
        };
    };
}

export const Navigation: React.FC<NavigationProps> = ({
    label,
    logo,
    pages = {},
    header,
    footer,
    ...props
}) => (
    <Container {...props}>
        <NavigationHeader label={label} logo={logo} />
        {header}
        <Items>
            {Object.entries(pages).map(([key, { navProps }]) => (
                <NavigationItem key={key} {...navProps}>
                    {key}
                </NavigationItem>
            ))}
        </Items>
        {footer}
    </Container>
);

const Container = styled.nav`
    ${Mixins.flex('column')}
    ${Mixins.transition(['max-width'])}
    ${({ theme }) => `
        box-shadow: ${theme.depth[1]};
        background-color: ${theme.colors.primary};
    `}
    box-sizing: border-box;
    max-width: 255px;
    flex-shrink: 0;
    width: 255px;
    padding: 16px 0 0;
    z-index: 2;
    color: white;

    ${Mixins.media(
        'tablet',
        `
        max-width: 70px;
    `,
    )}
`;

const Items = styled.ul`
    ${Mixins.scroll}
    list-style-type: none;
    overflow: auto;
    padding: 0 8px;
    margin: 25px 0 15px;
    &::-webkit-scrollbar {
        background-color: transparent;
    }
`;
