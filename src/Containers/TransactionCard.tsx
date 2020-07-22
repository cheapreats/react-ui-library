import React from 'react';
import styled from 'styled-components';
import { flex, transition } from '../Utils/Mixins';
import { Paragraph } from '../Text';

export interface CardDataProps {
    icon: string;
    title: string;
    time: string;
}

export interface TransactionProps {
    pointer: boolean;
    onClick: Function;
    width?: number;
    height?: number;
    cardData: [CardDataProps];
}

export const TransactionCard: React.FC<TransactionProps> = ({
    cardData,
    ...props
}): React.ReactElement => {
    return (
        <Items>
            {cardData.map(eachData => (
                <Item key={eachData.icon}>
                    <IconWrapper>{eachData.icon}</IconWrapper>

                    <div>
                        <Paragraph bold>{eachData.title}</Paragraph>
                        <Paragraph>{eachData.time}</Paragraph>
                    </div>
                </Item>
            ))}
        </Items>
    );
};

const Items = styled.ul`
    overflow: auto;
    list-style-type: none;
    margin: 25px 0 0;
`;

const IconWrapper = styled.div`
    background-color: #00aa19;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 80px;
    height: 80px;
    margin-right: 12px;
    z-index: 1;
    ${transition(['transform'])}
    display: flex;

    svg {
        display: inline-block;
        margin: auto;
    }
`;

const Item = styled.li`
    width: 550px;
    transition: 0.4s;
    position: relative;
    border-radius: 8px;
    margin: 0 7px 20px 0;
    ${flex()};
    flex-shrink: 0;
    align-items: center;
    box-shadow: ${({ theme }): string => theme.depth[1]};
    ${({ theme }): string => `
    &:hover {
        box-shadow: ${theme.depth[2]};
        transform: scale(1.1);
    }
`}
`;
