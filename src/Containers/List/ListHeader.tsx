import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Heading } from '../../Text/Heading';
import { TextLayoutProps } from '../../__Layouts';
import { Mixins } from '../../Utils';

export interface ListHeaderProps extends TextLayoutProps {
    label?: string;
    headerFlex?: string;
    icon?: StyledIcon;
    iconClick?: React.MouseEventHandler;
    iconProps?: string;
    headerRowComponent?: React.ReactElement;
    type?: string;
    padding?: string;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
    label,
    children,
    headerFlex,
    icon,
    iconClick,
    iconProps,
    headerRowComponent,
    padding = '10px 20px;',
    ...props
}): React.ReactElement => (
    <Header padding={padding}>
        <Row display={headerFlex}>
            <Heading bold type="h2" margin="0 0 5px" {...props}>
                {label}
            </Heading>
            {icon && (
                <Icon as={icon} onClick={iconClick} iconProps={iconProps} />
            )}
            {headerRowComponent}
        </Row>
        {children}
    </Header>
);

interface HeaderProps {
    padding?: string;
}
interface RowProps {
    display?: string;
}
interface IconProps {
    iconProps?: string;
}

const Header = styled.div<HeaderProps>`
    ${({ theme, padding }): string => `
    border-bottom: 2px solid ${theme.colors.text}20;
    padding: ${padding};
`}
`;

const Row = styled.div<RowProps>`
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
`;

const Icon = styled.svg<IconProps>`
    ${(props): string | undefined => props.iconProps}
`;
