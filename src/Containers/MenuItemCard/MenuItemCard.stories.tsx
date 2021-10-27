import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MenuItemCard, MenuItemCardProps, LoyaltyPoints, LimitedTimeBanner, SaleTag} from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('MenuItemCard'),
    component: MenuItemCard,
    subcomponents: {LoyaltyPoints, LimitedTimeBanner, SaleTag}, 
    argTypes: { onClick: { action: 'Item has been clicked' } },
    args: {
        animated: true,
        flat: false,
        widthFitContent: false,
        sale: false,
        soldOut: false,
        loyaltyPointsToggle: true, 
        limitedTimeBannerToggle: true, 
        ItemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
        ItemName: 'Blackberry Pancakes',
        ItemPrice: 14.99,
        discountAmount: 3, 
        
        LoyaltyPoints: (
            <LoyaltyPoints amount = '+10★'/>
        ),
        LimitedTimeBanner:(
            <LimitedTimeBanner/>  
        ),

    }, 

} as Meta;
export const Basic: Story<MenuItemCardProps> = (args) =>  <MenuItemCard  {...args}> <LoyaltyPoints {...args}/> 
    <LimitedTimeBanner {...args}/>  <SaleTag {...args} /> </MenuItemCard>;
