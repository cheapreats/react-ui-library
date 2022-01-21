import React from 'react';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Paragraph as P } from '../../Text';
import { Mixins } from '../../Utils';
export interface _NavigationItemProps {
    icon?: StyledIcon;
    type?: any | string | number | symbol;
    isSelected?: boolean
    onClick?: () => void
}

export const NavigationItem: React.FC<_NavigationItemProps> = ({
    children,
    icon,
    type,
    isSelected = false,
    onClick = () => null,
    ...props
}) => {
    const theme = useTheme();
    return (
        <Item onClick={onClick} as={type} isSelected={isSelected} {...props}>
            <Icon as={icon} />
            <Paragraph
                margin="0 auto 0 12px"
                color={theme.colors.background}
                bold
            >
                {children}
            </Paragraph>
        </Item>
    );
};

const Item = styled.li`
    ${({ theme }) => `
    color:${theme.colors.background};
    `}
    margin-bottom: 8px;
    ${Mixins.transition(['background-color'])}
    ${Mixins.flex('center')}

    ${({ theme, isSelected }: {theme: DefaultTheme, isSelected: boolean}) => `
        ${Mixins.clickable(theme.colors.primary, 0.1)}
        border-radius: ${theme.dimensions.radius};
        background-color: ${isSelected && Mixins.darken(theme.colors.primary, 0.1)};
        color: ${theme.colors.background};
    `}

    box-sizing: border-box;
    text-decoration: none;
    padding: 8px 12px;
    height: 54px;
`;

const Icon = styled.svg`
    flex-shrink: 0;
    ${({ theme }) => `
    color:${theme.colors.background};
    `}
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
