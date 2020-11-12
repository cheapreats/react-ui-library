import React from 'react';
import { NavLink as L, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Paragraph as P } from '../Text';
import { Mixins } from '../Utils';

const hydratePath = (path: string, params: NavigationParams) =>
    path.replace(/(:[0-9A-Za-z]*)/g, (e) => params[e.slice(1)]);

interface NavigationIconProps {
    icon?: StyledIcon;
    to?: string;
    type?: any | string | number | symbol;
}
interface NavigationParams {
    id: string;
}

export const NavigationItem: React.FC<NavigationIconProps> = ({
    children,
    icon,
    to = '',
    type,
    ...props
}) => {
    const params = useParams<NavigationParams>();
    const isExternal = to.startsWith('http');
    return (
        <Item as={type} {...props}>
            <NavLink
                to={hydratePath(to, params)}
                target={isExternal ? '_blank' : ''}
            >
                <Icon as={icon} />
                <Paragraph margin="0 auto 0 12px" color="white" bold>
                    {children}
                </Paragraph>
            </NavLink>
        </Item>
    );
};

const Item = styled.li`
    color: white;
    margin-bottom: 8px;
`;

const NavLink = styled(L)`
    ${Mixins.transition(['background-color'])}
    ${Mixins.flex('center')}

    ${({ theme }) => `
        ${Mixins.clickable(theme.colors.primary, 0.1)}
        border-radius: ${theme.dimensions.radius};
        &.active {
            background-color: ${Mixins.darken(theme.colors.primary, 0.1)}
        }
    `}

    box-sizing: border-box;
    text-decoration: none;
    color: white;
    padding: 8px 12px;
    height: 54px;
`;

const Icon = styled.svg`
    flex-shrink: 0;
    color: white;
    width: 30px;
    box-sizing: border-box;
    padding: 4px;
`;

const Paragraph = styled(P)`
    ${Mixins.transition(['max-width', 'margin', 'opacity'])}
    white-space: nowrap;
    max-width: 255px;
    overflow: hidden;
    ${Mixins.media(
        'tablet',
        `
        max-width: 0;
        opacity: 0;
        margin-left: 0;
    `,
    )}
`;
