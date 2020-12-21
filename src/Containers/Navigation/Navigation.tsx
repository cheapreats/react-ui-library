import React from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';

export interface NavigationProps {
    header?: React.ReactElement;
    subHeader?: React.ReactElement;
    footer?: React.ReactElement;
}

export const Navigation: React.FC<NavigationProps> = ({
    children,
    header,
    subHeader,
    footer,
    ...props
}) => (
    <Container {...props}>
        {header}
        {subHeader}
        <Items>{children}</Items>
        {footer}
    </Container>
);

const Container = styled.nav`
    ${Mixins.flex('column')}
    ${Mixins.transition(['max-width'])}
    ${({ theme }) => `
        box-shadow: ${theme.depth[1]};
        background-color: ${theme.colors.primary};
        color:${theme.colors.background};
    `}
    box-sizing: border-box;
    max-width: 255px;
    flex-shrink: 0;
    width: 255px;
    padding: 16px 0 0;
    z-index: 2;

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
