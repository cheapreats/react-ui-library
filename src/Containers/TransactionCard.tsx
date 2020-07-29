import React from 'react';
import styled, { css } from 'styled-components';
import { flex, transition } from '../Utils/Mixins';
import { Paragraph } from '../Text';

export interface CardDataProps {
    id: string;
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
            {cardData.map(
                ({ id, icon, title, time }): React.ReactElement => (
                    <Item key={id} id={id}>
                        <IconWrapper>{icon}</IconWrapper>

                        <div>
                            <Paragraph bold>{title}</Paragraph>
                            <Paragraph>{time}</Paragraph>
                        </div>
                    </Item>
                ),
            )}
        </Items>
    );
};

interface StyledCardProp {
    id: string;
}

const Items = styled.ul`
    overflow: auto;
    list-style-type: none;
    margin: 25px 0 0;
`;

const IconWrapper = styled.div`
    // background-color: #00aa19;
    ${({ theme }): string => `
    background-color: ${theme.colors.input.success};
    `}
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

const Item = styled.li<StyledCardProp>`
    width: 550px;
    transition: 0.4s;
    position: relative;
    border-radius: 8px;
    margin: 0 7px 20px 0;
    ${flex()};
    flex-shrink: 0;
    align-items: center;
    box-shadow: ${({ theme }): string => theme.depth[1]};
   

    ${({ id }): {} =>
        id === '1' &&
        css`
            z-index: 4;
            animation: increase 3s ;
            animation-delay: 7s;
            opacity: 0;


            @keyframes increase {
                0% {
                    transform: transform: scale(1);
                    ${({ theme }): string => `
                        box-shadow: ${theme.depth[2]};
                    `} 
                    opacity: 1;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                95% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `}



        ${({ id }): {} =>
            id === '2' &&
            css`
            z-index: 4;
            animation: increase1 3s ;
            animation-delay: 5s;
            opacity: 0;

            @keyframes increase1 {
                0% {
                    transform: transform: scale(1);
                    ${({ theme }): string => `
                        box-shadow: ${theme.depth[2]};
                    `} 
                    opacity: 1;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                95% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `}


        ${({ id }): {} =>
            id === '3' &&
            css`
            z-index: 4;
            animation: increase2 3s ;
            animation-delay: 3s;
            opacity: 0;

            @keyframes increase2 {
                from {
                    transform: transform: scale(1);
                    ${({ theme }): string => `
                        box-shadow: ${theme.depth[2]};
                    `} 
                    opacity: 1;
                }
                to {
                    transform: scale(1.1);
                    opacity: 1;
                }
                // 95% {
                //     transform: scale(1);     
                //     opacity: 1;               
                // }
            }
        `}


        ${({ id }): {} =>
            id >= '4' &&
            css`
            z-index: 4;
            animation: increase3 3s ;
            animation-delay: 1s;
            opacity: 0;

            @keyframes increase3 {
                from {
                    transform: transform: scale(1);
                    ${({ theme }): string => `
                        box-shadow: ${theme.depth[2]};
                    `} 
                    opacity: 1;
                }
                to {
                    transform: scale(1.1);
                    opacity: 1;
                }
                // 95% {
                //     transform: scale(1);
                //     opacity: 1;
                // }
            }
        `}


`;
