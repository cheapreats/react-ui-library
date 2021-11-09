import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MenuItemCard, MenuItemCardProps, LoyaltyPoints, LimitedTimeBanner, SaleTag} from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('MenuItemCard'),
    component: MenuItemCard,
    subcomponents: {LoyaltyPoints, LimitedTimeBanner, SaleTag}, 
    argTypes: { onClick: { action: 'Link to next step' } },
} as Meta;

const Template: Story<MenuItemCardProps> = (args) =>  <MenuItemCard  {...args}> <LoyaltyPoints {...args}/> 
    <LimitedTimeBanner {...args}/>  <SaleTag {...args} /> </MenuItemCard>;

export const MenuItemCardBasic = Template.bind({}); 
MenuItemCardBasic.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
    itemName: 'Blackberry Pancakes',
    itemPrice: 15.99,
    itemPriceLimit: 1000,
    saleAmount: 5,
    loyaltyamount: 20, 
    loyaltypointlimit: 100,
    minsRemaining: 120, 
    sale: false,
    soldOut: false,
    widthFitContent: false,
    heightFitContent: false,
    animated: true,
    flat: false,
};

export const MenuItemCardStates = Template.bind({}); 
MenuItemCardStates.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
    itemName: 'Blackberry Pancakes',
    itemPrice: 15.99,
    itemPriceLimit: 1000,
    saleAmount: 5,
    loyaltyamount: 0,
    loyaltypointlimit: 100, 
    minsRemaining: 0,  
    sale: true,
    soldOut: true,
    widthFitContent: false,
    heightFitContent: true,
    animated: false,
    flat: false,
};

export const MenuItemCardLongText = Template.bind({});
MenuItemCardLongText.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
    itemName: 'Super crazy long combo special order with extra sides and drinks blackberry pancakes',
    itemPrice: 2560,
    itemPriceLimit: 1000, 
    saleAmount: 200, 
    loyaltyamount: 150, 
    loyaltypointlimit: 100,
    minsRemaining: 24000, 
    sale: false,
    soldOut: false,
    widthFitContent: false,
    heightFitContent: true,
    animated: true,
    flat: false,
};