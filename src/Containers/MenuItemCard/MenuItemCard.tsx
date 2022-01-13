import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { transition } from '@Utils/Mixins';
import { LoyaltyPoints, LimitedTimeBanner, SaleTag } from '../../index';

export interface MenuItemCardProps
    extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    /* Loyalty points component */
    LoyaltyPoints?: React.ReactElement;
    /* Limited time banner component */
    LimitedTimeBanner?: React.ReactElement;
    /* Sale tag component */
    SaleTag?: React.ReactElement;
    /* Html link for the item, displayed as 300px x 150px */
    itemImage: string, 
    /* Name of the product, after 30 characters '...' replaces the rest */
    itemName: string,
    /* Price of the item, is reduced by saleAmount if on sale and will be rounded by 1000 if above itemPriceLimit */
    itemPrice: number, 
    /* Limit before the item is rounded by 1000, should be greater than 1000 */
    itemPriceLimit: number, 
    /* Controls if the sale style is used and if a sale amount should be reduced */
    sale: boolean;
    /* Controls if the item can still be sold, also removes other components from card display */
    soldOut: boolean;
    /* Number passed to LoyaltyPoints to display the loyalty points amount */
    loyaltyAmount: number,
    /* Limit before loyaltyPoints gets capped */
    loyaltyPointLimit: number,
    /* Amount that the item is on sale, reduced from itemPrice when sale is active */
    saleAmount: number,
    /* Minutes that the item is remaining for, if 0 then will not display */
    minsRemaining?: number,
    /* Add box shadow when hovered over */
    animated?: boolean;
    /* Controls the border around the menu item card, animated will still display the border when hovered over */
    flat?: boolean;
    /* Handles card clicks when the item is not soldout */
    cardWasClicked?: () => void,
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    animated,
    flat,
    sale,
    soldOut,
    itemImage,
    itemName,
    itemPrice,
    itemPriceLimit,
    saleAmount,
    loyaltyAmount,
    loyaltyPointLimit,
    minsRemaining,
    cardWasClicked,
    ...props

}): React.ReactElement => {
    /**
     * Checks the value of the item and checks for the sale and soldout states, then conditionally renders the item value based on the limit and states
     * Item sale amount checks that the price of the sale won't lower the price of the item below 0, if it does, output 0
     * @param sale - Indicates if the item is on sale
     * @param soldOut - Indicates if the item is sold out
     * @param itemPrice - The price of the item
     * @param itemPriceLimit - Limit before using the roundItemValue function that returns rounded by 1000
     * @param saleAmount - Amount reduced from the item if its on sale
     */
    function getMenuItemStatus(sale: boolean, soldOut: boolean, itemPrice: number, itemPriceLimit: number, saleAmount: number) {

        let itemSaleAmount = 0;

        if (itemPrice - saleAmount > 0) {
            itemSaleAmount = itemPrice - saleAmount
        } 

        if (itemPrice >= itemPriceLimit) {
            return <PriceText1k>${roundItemValue(itemPrice, itemPriceLimit)}K+</PriceText1k>
        } else if (sale) {
            return <>
                <PriceTextSlash>${itemPrice}</PriceTextSlash>
                <OnSale>${itemSaleAmount}</OnSale>
            </>
        } else return <PriceText>${itemPrice}</PriceText>
    }
    /**
     * Checks if item image has a value, then returns it or uses a defualt image
     * @param itemImage - URL for the image, if left empty then return default image from below
     * @param alt - Full name of the item
     */
    function getItemImage(itemImage: string, alt: string) {
            if (!!itemImage) {
                return <MenuItemCardImage src={itemImage} alt={itemName} />
            } else return <MenuItemCardImage src='https://healthduel.net/healthduel/storage/app/game/GyeyqSeDD2qRmWJf8kocbK9YCtowBvgF4PZPsDlW.jpeg' alt={itemName} />
    }
    return (
        <MenuItemCardBox {...props} itemImage={itemImage} itemName={itemName} itemPrice={itemPrice} animated={animated}
            flat={flat} sale={sale} soldOut={soldOut} saleAmount={saleAmount} itemPriceLimit={itemPriceLimit} cardWasClicked={cardWasClicked}
            loyaltyAmount={loyaltyAmount} minsRemaining={minsRemaining} loyaltyPointLimit={loyaltyPointLimit}>

            {(!soldOut) && <CardClickableDiv onClick = {cardWasClicked}/>}

            <MenuItemCardAccessoryDiv>
                {(!soldOut && !!loyaltyAmount) &&
                    <LoyaltyPoints loyaltyAmount={loyaltyAmount} loyaltyPointLimit={loyaltyPointLimit} />}
                {(!soldOut && sale) &&
                    <SaleTag saleAmount={saleAmount} />}
            </MenuItemCardAccessoryDiv>

            {getItemImage(itemImage, itemName)}

            <MenuItemHeader>{getStringValue(itemName)}</MenuItemHeader>
            {soldOut && <SoldOutBox>Sold Out</SoldOutBox>}

            { (!!minsRemaining && !soldOut) &&
                <LimitedTimeBannerPosition> <LimitedTimeBanner minsRemaining={minsRemaining} /> </LimitedTimeBannerPosition>}

            {(!!itemPrice && !soldOut) && getMenuItemStatus(sale, soldOut, itemPrice, itemPriceLimit, saleAmount)}

        </MenuItemCardBox>
    );
}
/**
 * Checks if the Item Price is greater than or equal to the item price limit
 * Returns item price to the nearest tenth rounded
 * Also reduces the amount by 1000, the K is added in the component
 * @param itemPrice - Current price of the item displayed on the card
 * @param itemPriceLimit - A threshold to hit before the item price starts being rounded 
 */
function roundItemValue(itemPrice: number, itemPriceLimit: number) {
    if (itemPrice >= itemPriceLimit) {
        return ((Math.round(itemPrice * .1) / .1) / 1000)
    } else return itemPrice;
};
/**
 * Returns the value of the string capped at 30 characters, and adds ... if that limit is hit
 * @param itemName
 */
function getStringValue(itemName: string) {
    let newString = itemName.substring(0, 30);
    if (itemName.length > 30) {
        return newString + '...';
    } else
        return newString;
}

const MenuItemCardBox = styled.div<MenuItemCardProps & MainInterface & ResponsiveInterface>`
    position: relative; 
    width: 300px;
    height: 250px; 
    z-index: 1; 
    cursor: pointer;
    box-shadow: ${({ flat, theme }): string => theme.depth[flat ? 0 : 1]}; 
    
    ${({ theme }): string => `
    border-radius: ${theme.dimensions.radius};
    background-color: ${theme.colors.background};
    `}

    ${({ animated, flat, theme, soldOut }): string =>
        (animated && !soldOut) ? ` ${transition(['box-shadow'])} &:hover {
            box-shadow: ${theme.depth[flat ? 1 : 2]};
        }` : ''}

    ${({ soldOut }) =>
        soldOut && `
      opacity: 0.5;
      cursor: not-allowed; `}
`;
const CardClickableDiv = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
`
const MenuItemCardImage = styled.img`
    height: 150px;
    width: 300px;
    ${({ theme }): string => `
    border-top-left-radius: ${theme.dimensions.radius};
    border-top-right-radius: ${theme.dimensions.radius};
    `}
`
const SoldOutBox = styled.div`
    ${({ theme }): string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.background}};
    background-color: ${theme.colors.menuItemCardSoldoutBox};
    border-top-left-radius: ${theme.dimensions.radius};
    border-top-right-radius: ${theme.dimensions.radius};
    `}
    position: absolute;
    z-index: 2;
    top: 0px;
    font-size: 25px;
    text-align: center;
    width: 300px;
    height: 40px; 
    padding-top: 15px; 
`;
const MenuItemHeader = styled.header`
    font-weight: bolder;
    padding-left: 10px;
    padding-bottom: 10px; 
    padding-right: 120px;
    font-size: 25px;  
`
const PriceText = styled.header`  
    font-weight: bold; 
    position: absolute;
    font-size: 25px; 
    text-align: right; 
    right: 10px;
    bottom: 40px; 
`
const PriceTextSlash = styled(PriceText)`
    text-decoration: line-through;
    font-size: 20px;
    opacity: .6; 
    bottom: 60px;
    position: absolute;
`
const PriceText1k = styled(PriceText)`
    font-size: 25px;
    ${({ theme }): string => `
    color: ${theme.colors.ItemCardSaleGreen};
    `}
`
const OnSale = styled.header`
    position: absolute;
    font-size: 30px;
    text-align: right;
    font-weight: bold; 
    ${({ theme }): string => `
    color: ${theme.colors.primary};
    `}
    right: 10px;
    bottom: 10px;
`
const MenuItemCardAccessoryDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 20px;
    align-items: center;
`
const LimitedTimeBannerPosition = styled.div`
    position: absolute;
    top: 110px; 
`