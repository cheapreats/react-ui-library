import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import {
    SearchBarExpandable,
    SearchBarExpandableProps,
} from '../../Inputs/SearchBarExpandable/SearchBarExpandable';
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
    margin?: string;
    onSearch?: (value: string) => void;
    searchBarWidth?: string;
    searchBarMediaQuery?: string;
    searchBarMediaWidth?: string;
    searchBarProps?: SearchBarExpandableProps;
    onClose?: () => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
    label,
    children,
    headerFlex,
    icon,
    iconClick,
    iconProps,
    headerRowComponent,
    searchBarWidth,
    searchBarMediaQuery,
    searchBarMediaWidth,
    searchBarProps,
    padding = '10px 20px;',
    margin = '0',
    onSearch,
    onClose = () => undefined,
    ...props
}): React.ReactElement => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ListHeaderContainer padding={padding} margin={margin} {...props}>
            <Row display={headerFlex}>
                <HeadingContainer isExpanded={isExpanded}>
                    <Heading bold type="h2" {...props}>
                        {label}
                    </Heading>
                </HeadingContainer>
                <SearchContainer>
                    {onSearch && (
                        <SearchBarExpandable
                            onInput={onSearch}
                            state={[isExpanded, setIsExpanded]}
                            onClose={onClose}
                            expandedWidth={searchBarWidth}
                            mediaQuery={searchBarMediaQuery}
                            mediaWidth={searchBarMediaWidth}
                            {...searchBarProps}
                        />
                    )}
                </SearchContainer>
                {icon && (
                    <IconContainer isExpanded={isExpanded}>
                        <Icon
                            as={icon}
                            onClick={iconClick}
                            iconProps={iconProps}
                        />
                    </IconContainer>
                )}
                {headerRowComponent}
            </Row>
            {children}
        </ListHeaderContainer>
    );
};

interface IResponsiveSearchProps {
    isExpanded: boolean;
}

const SearchContainer = styled.div`
    ${Mixins.flex('row')}
    margin-left: auto;
`;

const IconContainer = styled.div<IResponsiveSearchProps>`
    ${Mixins.flex('center')}
`;
const HeadingContainer = styled.div<IResponsiveSearchProps>`
    ${Mixins.transition(['transform', 'opacity'])}
    @keyframes heading {
        0% {
            position: fixed;
        }
        90% {
            position: fixed;
        }
        100% {
            position: relative;
        }
    }
    ${({ isExpanded }) =>
        isExpanded
            ? 'transform: translateY(-200px); opacity: 0; position: fixed;'
            : 'transform: translateY(0px); animation: heading; animation-duration: 1s;'}
`;

interface HeaderProps {
    padding?: string;
    margin?: string;
}

const ListHeaderContainer = styled.div<HeaderProps>`
    ${({ theme, padding, margin }): string => `
    border-bottom: 2px solid ${theme.colors.text}20;
    padding: ${padding};
    margin:${margin};
`}
`;

interface RowProps {
    display?: string;
}

const Row = styled.div<RowProps>`
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
`;

interface IconProps {
    iconProps?: string;
}

const Icon = styled.svg<IconProps>`
    ${(props): string | undefined => props.iconProps};
    cursor: pointer;
`;
