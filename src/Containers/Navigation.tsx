import React from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import {
    scroll,
    transition,
    flex,
    clickable,
    darken,
    media,
} from '@Utils/Mixins';
import { Paragraph as P, Heading as H } from '../Text';

const hydratePath = (
    path: string,
    params: { [name: string]: string },
): string =>
    path.replace(/(:[0-9A-Za-z]*)/g, (e): string => params[e.slice(1)]);

interface NavProps {
    to: string;
    label?: string;
    icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

export interface NavigationProps extends MainInterface, ResponsiveInterface {
    params?: { [name: string]: string };
    pages?: [
        string,
        {
            component: React.LazyExoticComponent<React.ComponentType>;
            navProps: NavProps;
        },
    ][];
    tag?: React.ReactElement | string;
    theme: DefaultTheme;
    label?: string;
}
const _Navigation: React.FC<NavigationProps> = ({
    params = {},
    pages = [],
    tag = 'a',
    children,
    theme,
    label,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        <Header>
            <Logo src={theme.logo} />
            <Heading
                lineHeight="1.2"
                size="1.1rem"
                color="white"
                margin="6px auto 0 0px"
                padding="0 12px 0 0"
                bold
            >
                {label || theme.name}
            </Heading>
        </Header>
        {children}
        <Items>
            {pages.map(
                ([key, { navProps }]): React.ReactElement => {
                    const { icon, to, ...args } = navProps;
                    return (
                        <Item key={key} {...args}>
                            <NavLink
                                as={tag as 'a'}
                                to={hydratePath(to, params)}
                            >
                                <Icon as={icon} />
                                <Paragraph
                                    margin="0 auto 0 12px"
                                    color="white"
                                    bold
                                >
                                    {navProps.label || key}
                                </Paragraph>
                            </NavLink>
                        </Item>
                    );
                },
            )}
        </Items>
    </Container>
);

export const Navigation = withTheme(_Navigation as never);

const Container = styled.nav`
    ${flex('column')}
    ${transition(['width'])}
    ${({ theme }): string => `
        box-shadow: ${theme.depth[1]};
        background-color: ${theme.colors.primary};
        max-width: ${theme.dimensions.navigation.width}px;
        width: ${theme.dimensions.navigation.width}px;
    `}
    ${media('tablet', 'width: auto;')}
    box-sizing: border-box;
    flex-shrink: 0;
    padding: 16px 8px 8px;
    color: white;
`;

const Header = styled.div`
    ${flex('center')}
`;

const Logo = styled.img`
    width: 46px;
    margin: 0 4px;
    height: auto;
`;

const Items = styled.ul`
    ${scroll}
    list-style-type: none;
    overflow: auto;
    padding: 0;
    margin: 25px 0 0;
`;

const Item = styled.li`
    color: white;
    margin-bottom: 8px;
`;

const NavLink = styled.a<{ to: string }>`
    ${transition(['background-color'])}
    ${flex('center')}

    ${({ theme }): string => `
        ${clickable(theme.colors.primary, 0.1)}
        border-radius: ${theme.dimensions.radius};
        &.active {
            background-color: ${darken(theme.colors.primary, 0.1)}
        }
    `}

    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
    padding: 8px 12px;
    height: 54px;
`;

const Icon = styled.svg`
    ${({ theme }): string => `
        width: ${theme.dimensions.navigation.icon}px;
    `}
`;

const Heading = styled(H)`
    ${media('tablet', `display: none`)}
`;
const Paragraph = styled(P)`
    ${media('tablet', `display: none`)}
`;
