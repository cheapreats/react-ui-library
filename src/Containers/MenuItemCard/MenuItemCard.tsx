import React from 'react';
import styled from 'styled-components';
import { Main, MainInterface, Responsive, ResponsiveInterface } from '@Utils/BaseStyles';
import { transition, } from '@Utils/Mixins';
import { Container } from '@Containers/FileUpload/StyledComponents';
// eslint-disable-next-line import/no-cycle
import {  LoyaltyPoints, LimitedTimeBanner, SaleTag } from '../../index';

export interface MenuItemCardProps
    extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {

    LoyaltyPoints?: React.ReactElement;  
    LimitedTimeBanner?: React.ReactElement;  
    SaleTag?: React.ReactElement;  
    animated?: boolean;
    flat?: boolean;
    widthFitContent?: boolean;
    heightFitContent?: boolean; 
    sale?: boolean;
    soldOut?: boolean;
    loyaltyPointsToggle?: boolean;
    limitedTimeBannerToggle?: boolean,
    saleTagToggle?: boolean,
    loyaltyAmount: number,
    saleTagAmount: number,
    hoursRemaining: number,   
    itemImage: string, 
    itemName: string,
    itemPrice: number,
}

export const ItemCard: React.FC<MenuItemCardProps> = ({
    children, 
    ...props
}): React.ReactElement => <MenuItemCardBox {...props}>{children}</MenuItemCardBox>;

// To do: disable toggles + clickable when enabling sold out state
export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    animated,
    flat,
    widthFitContent,
    heightFitContent,
    sale,
    soldOut,
    loyaltyPointsToggle,
    limitedTimeBannerToggle,
    saleTagToggle, 
    itemImage, 
    itemName,
    itemPrice,
    saleTagAmount,
    loyaltyAmount, 
    hoursRemaining, 
    ...props
}): React.ReactElement => (
        
    <ItemCard {...props} itemImage={itemImage} itemName={itemName} itemPrice={itemPrice} animated={animated} 
        flat={flat} widthFitContent={widthFitContent} sale={sale} soldOut={soldOut} saleTagAmount = {saleTagAmount}
        loyaltyPointsToggle={loyaltyPointsToggle} saleTagToggle = {saleTagToggle} loyaltyAmount = {loyaltyAmount} hoursRemaining = {hoursRemaining}
        limitedTimeBannerToggle={limitedTimeBannerToggle} heightFitContent = {heightFitContent}> 
        
        <img src={itemImage} alt={itemName} style={{ width: 350, height: 200 }}/>
        <ItemHeader>{itemName}</ItemHeader>
        { soldOut && <Container><SoldOutBox>Sold Out</SoldOutBox></Container> }

        { limitedTimeBannerToggle && <Container>
            <LimitedTimeBannerPosition> <LimitedTimeBanner hoursRemaining={hoursRemaining}/></LimitedTimeBannerPosition> 
        </Container> }

        { loyaltyPointsToggle && <Container>
            <LoyaltyPointsPosition> <LoyaltyPoints loyaltyAmount={loyaltyAmount}/></LoyaltyPointsPosition>
        </Container> }

        { saleTagToggle && <Container>
            <SaleTagPosition><SaleTag saleTagAmount={saleTagAmount}/></SaleTagPosition>
        </Container> } 

        { sale? 
            <>
                <SalePropsSlash>{itemPrice}</SalePropsSlash>
                <OnSale>{itemPrice - saleTagAmount}</OnSale>
            </>
            : [
                itemPrice >= 1000 ? 
                    <> 
                        <SaleProps1k>{(Math.round(itemPrice * .1) / .1) / 1000}K</SaleProps1k>
                    </> 
                    : 
                    <SaleProps>{itemPrice}</SaleProps>
            ]
        }
        
    </ItemCard> 
);

const MenuItemCardBox = styled.div<MenuItemCardProps & MainInterface & ResponsiveInterface>`
    position: relative; 
    background-color: white;
    width: 350px;
    height: 350px; 
    z-index: 1; 
    cursor: pointer; 
    
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    ${Main({
        ...props,
    })} `}

    box-shadow: ${({ flat, theme }): string => theme.depth[flat ? 0 : 1]};

    ${({ animated, flat, theme }): string =>
        animated ? ` ${transition(['box-shadow'])} &:hover {
            box-shadow: ${theme.depth[flat ? 1 : 2]};
        }` : ''}

    ${Responsive}

    ${({ soldOut }) =>
        soldOut && `
      opacity: 0.5;
      cursor: not-allowed; `}

    ${({ widthFitContent }): string => `${widthFitContent ? 'width:fit-content;' : ''} `}
    ${({ heightFitContent }): string => `${heightFitContent ? 'height:fit-content;' : ''} `}
`;

const SoldOutBox = styled.div`
    // Theme Stuff
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.background}};
    `}
    position: absolute;
    z-index: 2;
    top: 0px;
    background-color: rgba(48,48,48,48.0);
    font-size: 25px;
    text-align: center;
    width: 350px;
    height: 40px; 
    padding-top: 15px; 
`;
const ItemHeader = styled.header`
    font-weight: bold;
    padding-left: 10px;
    padding-bottom: 10px; 
    padding-right: 100px;
    font-size: 40px;  
`
const SaleProps = styled.header`  
    font-weight: bold; 
    position: absolute;
    font-size: 30px; 
    text-align: right; 
    right: 10px;
    top: 300px;
`
const SalePropsSlash = styled(SaleProps)`
    text-decoration: line-through;
    font-size: 25px;
    opacity: .6; 
    top: 230px; 
`
const SaleProps1k = styled(SaleProps)`
    color: green;
    font-size: 35px;
`

const OnSale = styled.header`
    position: absolute;
    font-size: 40px;
    text-align: right;
    font-weight: bold; 
    color: #EE2434; 
    padding-right: 10px;
    right: 10px;
    top: 300px; 
`
const LoyaltyPointsPosition = styled.div`
    position: absolute;
    top: 30px; 
`
const SaleTagPosition = styled.div`
    position: absolute;
    right: 10px;
    top: 53px;
`

const LimitedTimeBannerPosition = styled.div`
    position: absolute;
    top: 135px; 
`