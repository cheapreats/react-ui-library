import React from 'react';
import styled from 'styled-components';
import { Main, MainInterface, Responsive, ResponsiveInterface } from '@Utils/BaseStyles';
import { transition, } from '@Utils/Mixins';
import { Container } from '@Containers/FileUpload/StyledComponents';

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
    ItemImage: string, 
    ItemName: string,
    ItemPrice: number,
    saleTagAmount: number, 
}

export const ItemCard: React.FC<MenuItemCardProps> = ({
    children, 
    ...props
}): React.ReactElement => <MenuItemCardBox {...props}>{children}</MenuItemCardBox>;

// To do: disable toggles + clickable when enabling sold out state
// To do: fix argument values from composite components (declared in menuitemcard stories but doesn't update, how do you pass them properly?)
export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    LoyaltyPoints,
    LimitedTimeBanner,
    SaleTag, 
    animated,
    flat,
    widthFitContent,
    heightFitContent,
    sale,
    soldOut,
    loyaltyPointsToggle,
    limitedTimeBannerToggle,
    saleTagToggle, 
    ItemImage, 
    ItemName,
    ItemPrice,
    saleTagAmount, 
    ...props
}): React.ReactElement => (
        
    <ItemCard {...props} ItemImage={ItemImage} ItemName={ItemName} ItemPrice={ItemPrice} animated={animated} 
        flat={flat} widthFitContent={widthFitContent} sale={sale} soldOut={soldOut} LoyaltyPoints = {LoyaltyPoints} saleTagAmount = {saleTagAmount}
        loyaltyPointsToggle={loyaltyPointsToggle} LimitedTimeBanner = {LimitedTimeBanner} SaleTag = {SaleTag} saleTagToggle = {saleTagToggle}
        limitedTimeBannerToggle={limitedTimeBannerToggle} heightFitContent = {heightFitContent}> 
        
        <img src={ItemImage} alt={ItemName} style={{ width: 350, height: 200 }}/>
        <ItemHeader>{ItemName}</ItemHeader>
        { soldOut && <Container><SoldOutBox>Sold Out</SoldOutBox></Container> }
        { limitedTimeBannerToggle && <Container><LimitedTimeBannerPosition>{LimitedTimeBanner}</LimitedTimeBannerPosition></Container> }

        { loyaltyPointsToggle && <Container><LoyaltyPointsPosition>{LoyaltyPoints}</LoyaltyPointsPosition></Container> }
        { saleTagToggle && <Container><SaleTagPosition>{SaleTag}</SaleTagPosition></Container>} 


        { sale? 
            <>
                <SalePropsSlash>{ItemPrice}</SalePropsSlash>
                <OnSale>{ItemPrice - saleTagAmount}</OnSale>
            </>
            :
            <SaleProps>{ItemPrice}</SaleProps>
        }
    </ItemCard> 
);

const MenuItemCardBox = styled.div<MenuItemCardProps & MainInterface & ResponsiveInterface>`
    position: relative; 
    background-color: white;
    width: 350px;
    height: 350px; 
    z-index: 1; 
    
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
    padding-right: 80px;
    font-size: 40px;  
`
const SaleProps = styled.header`  
    font-weight: bold; 
    position: absolute;
    font-size: 30px; 
    text-align: right; 
    right: 10px;
    bottom: 20px;
`
const SalePropsSlash = styled(SaleProps)`
    text-decoration: line-through;
    font-size: 25px;
    opacity: .6; 
    bottom: 100px; 
`
const OnSale = styled.header`
    position: absolute;
    font-size: 40px;
    text-align: right;
    font-weight: bold; 
    color: #EE2434; 
    padding-right: 10px;
    right: 10px;
    bottom: 20px; 
`
const TagsPosition = styled.div`
    position: absolute;
    top: 30px; 
    display: flex; 
    justify-content: space-between; 
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
    bottom: 150px; 
`