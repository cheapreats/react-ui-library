import React, { useCallback } from 'react';
import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from 'styled-components';
import { flex, transition } from '@Utils/Mixins';
import { Paragraph } from '@Text/Paragraph';

export interface ICardDataProps {
    id: string;
    icon: string;
    title: string;
    time: string;
}

export interface ITransactionProps {
    cardData: [ICardDataProps];
    animationDelay: number;
    animationTime: number;
}

export const TransactionList: React.FC<ITransactionProps> = ({
    cardData,
    animationDelay = 3,
    animationTime = 2,
    ...props
}): React.ReactElement => {
    const renderTransactionItems = useCallback(() => {
        let initialTime = 0;
        return cardData.map(({ id, icon, title, time }, index) => {
            const animationName = `transactionAnimation${index}`;
            const animationDelayAmount =
                initialTime + animationDelay + animationTime;
            const animationCss = css`
                z-index: 4;
                animation: ${animationName} ${animationTime}s;
                animation-delay: ${animationDelayAmount}s;
                opacity: 0;
                @keyframes ${animationName} {
                    0% {
                        transform: scale(1);
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
            `;
            initialTime += animationTime;

            return (
                <Item key={id} id={id} animationCss={animationCss}>
                    <IconWrapper>{icon}</IconWrapper>

                    <div>
                        <Paragraph bold>{title}</Paragraph>
                        <Paragraph>{time}</Paragraph>
                    </div>
                </Item>
            );
        });
    }, [animationDelay, animationTime, cardData]);

    return <Items {...props}>{renderTransactionItems()}</Items>;
};

interface StyledCardProp {
    id: string;
    animationCss: FlattenInterpolation<ThemeProps<DefaultTheme>>;
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
    ${({ animationCss }) => animationCss}
`;
