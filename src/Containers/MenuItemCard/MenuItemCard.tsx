import React from 'react';
import styled from 'styled-components';
import { Main, MainInterface, Responsive, ResponsiveInterface } from '@Utils/BaseStyles';
import { transition, } from '@Utils/Mixins';
import { Container } from '@Containers/FileUpload/StyledComponents';
// eslint-disable-next-line import/no-cycle
import { Heading } from '../../index';

export const ItemCard: React.FC<MenuItemCardProps> = ({
    children, 
    ...props
}): React.ReactElement => <MenuItemCardBox {...props}>{children}</MenuItemCardBox>;

export interface MenuItemCardProps
    extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {

    LoyaltyPoints: React.ReactElement;  
    LimitedTimeBanner: React.ReactElement;  
    SaleTag: React.ReactElement;  
    animated?: boolean;
    flat?: boolean;
    widthFitContent?: boolean;
    sale?: boolean;
    soldOut?: boolean;
    loyaltyPointsToggle?: boolean;
    limitedTimeBannerToggle?: boolean,
    saleTagToggle?: boolean, 
    saleTagAmount: number, 
    ItemImage: string, 
    ItemName: string,
    ItemPrice: number,
    discountAmount: number,
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    LoyaltyPoints,
    LimitedTimeBanner,
    SaleTag, 
    animated,
    flat,
    widthFitContent,
    sale,
    soldOut,
    saleTagAmount, 
    loyaltyPointsToggle,
    limitedTimeBannerToggle,
    saleTagToggle, 
    ItemImage, 
    ItemName,
    ItemPrice,
    discountAmount,
    ...props
    
}): React.ReactElement => (
    <ItemCard {...props} ItemImage={ItemImage} ItemName={ItemName} ItemPrice={ItemPrice} discountAmount={discountAmount} animated={animated} 
        flat={flat} widthFitContent={widthFitContent} sale={sale} soldOut={soldOut} LoyaltyPoints = {LoyaltyPoints} saleTagAmount = {saleTagAmount}
        loyaltyPointsToggle={loyaltyPointsToggle} LimitedTimeBanner = {LimitedTimeBanner} SaleTag = {SaleTag} saleTagToggle = {saleTagToggle}
        limitedTimeBannerToggle={limitedTimeBannerToggle}> 

        <img src={ItemImage} alt={ItemName} style={{ width: 350, height: 200 }} />
        <Heading bold>{ItemName}</Heading>

        { limitedTimeBannerToggle && <Container><LimitedTimeBannerPosition>{LimitedTimeBanner}</LimitedTimeBannerPosition></Container> }
        { saleTagToggle && <Container><SaleTagPosition>{SaleTag}</SaleTagPosition></Container>}
        { loyaltyPointsToggle && <Container><LoyaltyPointsPosition>{LoyaltyPoints}</LoyaltyPointsPosition></Container> } 

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
    
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    padding: ${theme.dimensions.padding.container}; 

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
`;

const SaleProps = styled.header`  
    font-size: 30px; 
    text-align: right; 
`
const OnSale = styled.header`
    font-size: 40px;
    text-align: right;
    font-weight: bold; 
    color: #EE2434; 
`
const SalePropsSlash = styled(SaleProps)`
    text-decoration: line-through;
    font-size: 25px;
    opacity: .6; 
`
const LoyaltyPointsPosition = styled.div`
    position: absolute;
    top: 30px; 
`
const LimitedTimeBannerPosition = styled.div`
    position: absolute;
    bottom: 150px; 
`
const SaleTagPosition = styled.div`
    position: absolute;
    right: 20px;
    top: 30px;
`
