import React from 'react';
import styled from 'styled-components';
import {
    Responsive,
    Main,
    ResponsiveInterface,
    MainInterface,
} from '@Utils/BaseStyles';
import { scroll, flex } from '@Utils/Mixins';
import { Heading } from '@Text';

interface ItemProps {
    [name: string]: object | string | boolean | Function | number;
}

export interface ListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    loading: boolean;
    render: Function;
    items?: object[];
    itemProps: ItemProps;
    active: string | number;
    header: Function;
    footer: Function;
    label: string;
    stickyTopContent?: React.ReactElement;
}

export const List: React.FC<ListProps> = ({
    loading,
    render,
    items = [],
    itemProps,
    active,
    header,
    footer,
    label,
    stickyTopContent,
    ...props
}): React.ReactElement => (
    <Container {...props}>
        <Header>
            <Heading bold type="h2" margin="0 0 5px">
                {label}
            </Heading>
            {header}
        </Header>
        <ScrollDiv>
            {stickyTopContent}
            <Items>
                {loading ? (
                    <Loading>Loading...</Loading>
                ) : (
                    items.map(
                        (...args): React.ReactElement => (
                            <Item
                                key={args[1]}
                                data-index={args[1]}
                                active={active === args[1]}
                                {...itemProps}
                            >
                                {render(...args)}
                            </Item>
                        ),
                    )
                )}
            </Items>
        </ScrollDiv>
        {footer && <Footer>{footer}</Footer>}
    </Container>
);

const Container = styled.div<MainInterface & ResponsiveInterface>`
    ${flex('column')}
    background-color: white;
    box-sizing: border-box;
    flex-shrink: 0;
    width: 320px;
    height: 100%;
    z-index: 1;

    ${({ theme }): string => `
        box-shadow: ${theme.depth[1]};
    `}
    ${Responsive}
    ${Main}
`;

const Header = styled.div`
    padding: 10px 20px;
`;

const Items = styled.ul`
    ${scroll}
    ${({ theme }): string => `
        border-top: 2px solid ${theme.colors.text}20;
        border-bottom: 2px solid ${theme.colors.text}20;
    `}
    list-style-type: none;
    overflow: auto;
    padding: 0;
    margin: 0;
`;

const Item = styled.li<MainInterface & ItemProps>`
    ${flex()}
    ${({ theme }): string => `
        border-bottom: 2px solid ${theme.colors.text}20;
    `}
    ${({ padding = '16px 20px', ...props }): string =>
        Main({ padding, ...props })}
    &:last-child {
        border-bottom: none;
    }
`;

const Loading = styled(Item)`
    animation: fader 1.2s ease-in-out infinite;
    font-weight: bold;
    font-size: 0.9rem;
    @keyframes fader {
        0% {
            opacity: 0.7;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 0.7;
        }
    }
`;

const Footer = styled(Header)`
    margin-top: auto;
`;
const ScrollDiv = styled.div`
    overflow: auto;
`;
