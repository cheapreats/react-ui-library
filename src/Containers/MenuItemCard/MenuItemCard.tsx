import React from 'react';
import styled from 'styled-components';
import { Main, MainInterface, Responsive, ResponsiveInterface } from '@Utils/BaseStyles';
import { transition } from '@Utils/Mixins';
// eslint-disable-next-line import/no-cycle
import { LoyaltyPoints, LimitedTimeBanner, SaleTag } from '../../index';

export interface MenuItemCardProps
    extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    LoyaltyPoints?: React.ReactElement;  
    LimitedTimeBanner?: React.ReactElement;  
    SaleTag?: React.ReactElement;  
    itemImage: string, // Image for the Menu Item Card, hosted on any server and converted to 350px x 200px 
    itemName: string, // Item name, heightFitContent adjusts the item card size to fit any text (keeping min size of 350px)
    itemPrice: number, // Price of the item, will be adjusted by saleAmount and will reduce + round if above 1000
    itemPriceLimit: number, // Limit before item price is divided by 1000, should be greater than 1000
    animated?: boolean;
    flat?: boolean;
    widthFitContent?: boolean;
    heightFitContent?: boolean; 
    sale?: boolean;
    soldOut?: boolean;
    loyaltyamount: number,
    loyaltypointlimit: number,
    saleAmount: number,
    minsRemaining: number,   
}

export const ItemCard: React.FC<MenuItemCardProps> = ({
    children, 
    ...props
}): React.ReactElement => <MenuItemCardBox {...props}>{children}</MenuItemCardBox>;

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    animated,
    flat,
    widthFitContent,
    heightFitContent,
    sale,
    soldOut,
    itemImage, 
    itemName,
    itemPrice,
    itemPriceLimit,
    saleAmount,
    loyaltyamount,
    loyaltypointlimit, 
    minsRemaining, 
    ...props

}): React.ReactElement => (  
    <ItemCard {...props} itemImage={itemImage} itemName={itemName} itemPrice={itemPrice} animated={animated} 
        flat={flat} widthFitContent={widthFitContent} sale={sale} soldOut={soldOut} saleAmount = {saleAmount} itemPriceLimit = {itemPriceLimit}
        loyaltyamount = {loyaltyamount} minsRemaining = {minsRemaining} loyaltypointlimit = {loyaltypointlimit} heightFitContent = {heightFitContent}> 

        <img src={itemImage} alt={itemName} style={{ width: 350, height: 200 }}/>
        <ItemHeader>{itemName}</ItemHeader>
        { soldOut && <SoldOutBox>Sold Out</SoldOutBox>}

        { !!minsRemaining && 
        <LimitedTimeBannerPosition> <LimitedTimeBanner minsRemaining={minsRemaining}/></LimitedTimeBannerPosition> } 
    
        { !!loyaltyamount && 
        <LoyaltyPointsPosition> <LoyaltyPoints loyaltyamount={loyaltyamount} loyaltypointlimit = {loyaltypointlimit} /></LoyaltyPointsPosition> }

        { !!saleAmount && 
        <SaleTagPosition><SaleTag saleAmount={saleAmount}/></SaleTagPosition> }

        { sale
            ? <>
                <SalePropsSlash>${itemPrice}</SalePropsSlash>
                <OnSale>${itemPrice - saleAmount}</OnSale>
            </>
            : [ itemPrice >= itemPriceLimit 
                ? <> <SaleProps1k>${getItemValue(itemPrice, itemPriceLimit)}K</SaleProps1k> </> 
                : <SaleProps>${itemPrice}</SaleProps> 
            ]
        }
    </ItemCard> 
);
/**
* Checks if the Item Price is greater than or equal to the item price limit 
* Returns item price to the nearest tenth rounded
* Also reduces the amount by 1000, the K is added in the component
*/
function getItemValue(itemPrice: number, itemPriceLimit: number){
    if(itemPrice >= itemPriceLimit)
        return ((Math.round(itemPrice * .1) / .1) / 1000) 
    return itemPriceLimit };

const MenuItemCardBox = styled.div<MenuItemCardProps & MainInterface & ResponsiveInterface>`
    position: relative; 
    width: 350px;
    height: 350px; 
    min-height: 350px; 
    z-index: 1; 
    cursor: pointer;
    box-shadow: ${({ flat, theme }): string => theme.depth[flat ? 0 : 1]}; 
    
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.colors.background}};
    background-color: white; 
    ${Main({
        ...props,
    })} `}

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
    padding-right: 120px;
    font-size: 35px;  
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
    font-size: 35px;
    ${({theme}):string => `
    color: ${theme.colors.ItemCardSaleGreen};
    `}
`
const OnSale = styled.header`
    position: absolute;
    font-size: 35px;
    text-align: right;
    font-weight: bold; 
    ${({theme}):string => `
    color: ${theme.colors.primary};
    `}
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
    top: 160px; 
`