import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { ShoppingCart } from '@styled-icons/remix-line/ShoppingCart';
import { Mixins } from '../../Utils';
import { transition } from '../../Utils/Mixins';
import { Heading } from '../../Text';

/* Max number shown on badge */
const ROTATE_ARROW_POINT_DOWN = 90;

export interface CollapsibleAccordionItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Heading text */
    header: string;
    /* Month and Year of purchases */
    purchaseDate: string;
    /* Total amount of purchases */
    purchaseCount: number;
}

export interface SectionDivProps {
    isActive: boolean;
    height: number;
}

export interface HeaderDivProps {
    isActive: boolean;
}

export interface AngleIconProps {
    isActive: boolean;
}

/**
     * Logic for the height given to the expanded accordion based on the amount of inside children
     */
export const CollapsibleAccordionItem: React.FC<CollapsibleAccordionItemProps> = ({
    header,
    purchaseDate,
    purchaseCount,
    ...props
}): React.ReactElement => {
    const [isActive, setIsActive] = useState(false);
    const [height, setHeight] = useState(0);
    const toggleIsActive = (): void => {
        setIsActive(!isActive);
    };
    const bodyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const { children } = props;

    useLayoutEffect((): void => {
        const bodyNode = bodyRef.current;
        const headerNode = headerRef.current;
        if (bodyNode && headerNode) {
            let currentHeight = headerNode.clientHeight;
            if (isActive) {
                currentHeight += bodyNode.clientHeight;
            }
            setHeight(currentHeight);
        }
    }, [isActive]);

    return (
        <SectionDiv {...props} height={height} isActive={isActive}>
            <HeaderDiv
                ref={headerRef}
                isActive={isActive}
                onClick={toggleIsActive}
            >
                <CartIcon/>
                <Header>
                    {header}
                </Header>
                <DateDiv>
                    {purchaseDate}
                </DateDiv> &nbsp;
                <PurchaseCountDiv>
                    {purchaseCount}
                </PurchaseCountDiv>
                <AngleIcon isActive={isActive} />
            </HeaderDiv>
            <BodyDiv ref={bodyRef}>{children}</BodyDiv>
        </SectionDiv>
    );
};

const SectionDiv = styled.div<SectionDivProps>`
    overflow: hidden;
    height: ${({ height }): number => height}px;
    ${Mixins.transition(['height'], '0.5s')}
    max-width: 80%;
    border-radius: 5px;

    ${({ theme }) => `
        border: 2px solid ${theme.colors.border};
    `}
`;

const HeaderDiv = styled.div<HeaderDivProps>`
    display: flex;
    user-select: none;
    cursor: pointer;
    padding: 10px 0;
    margin-bottom: auto;
    margin-top: auto;
    align-items: center;
`;

const BodyDiv = styled.div`
    margin-left: 10px;
`;

const DateDiv = styled.div`
    margin-left: auto;
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;

    ${({ theme }) => `
        background-color: ${theme.colors.border};
    `}
`;

const PurchaseCountDiv = styled.div`
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;

    ${({ theme }) => `
        background-color: ${theme.colors.border};
    `}
`;

const AngleIcon = styled(AngleRight)<AngleIconProps>`
    ${transition(['transform'])}
    transform: rotate(${({ isActive }): number => (isActive ? ROTATE_ARROW_POINT_DOWN : 0)}deg);
    width: 8px;
    float: right;
    margin-bottom: auto;
    margin-top: auto;
    padding: 0 20px;

    ${({ theme }) => `
        color: ${theme.colors.chairTableEditBackground};
    `}
`;

const CartIcon = styled(ShoppingCart)`
    width: 20px;
    padding-left: 15px;

    ${({ theme }) => `
        color: ${theme.colors.editControlPanelColor};
    `}
`;

const Header = styled(Heading)`
    float: left;
    font-size: 13px;
    font-weight: bold;
    padding-left: 15px;
`;
