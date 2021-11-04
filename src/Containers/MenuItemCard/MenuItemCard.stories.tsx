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

const Template: Story<MenuItemCardProps> = (args) =>  <MenuItemCard  {...args}> <LoyaltyPoints loyaltyAmount={10} {...args}/> 
    <LimitedTimeBanner  HoursRemaining={5} {...args}/>  <SaleTag {...args} /> </MenuItemCard>;

export const MenuItemCardBasic = Template.bind({}); 
MenuItemCardBasic.args = {
    ItemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
    ItemName: 'Blackberry Pancakes',
    ItemPrice: 14.99,
    sale: false,
    soldOut: false,
    loyaltyPointsToggle: true, 
    limitedTimeBannerToggle: true,
    saleTagToggle: true, 
    widthFitContent: false,
    heightFitContent: false,
    animated: true,
    flat: false,
    saleTagAmount: 5,
};

export const MenuItemCardStates = Template.bind({}); 
MenuItemCardStates.args = {
    ItemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
    ItemName: 'Blackberry Pancakes',
    ItemPrice: 14.99,
    sale: true,
    soldOut: true,
    loyaltyPointsToggle: false, 
    limitedTimeBannerToggle: false,
    saleTagToggle: false, 
    widthFitContent: false,
    heightFitContent: false,
    animated: true,
    flat: false,
    saleTagAmount: 5, 
};

export const MenuItemCardLongText = Template.bind({});
MenuItemCardLongText.args = {
    ItemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg', 
    ItemName: 'Super crazy long combo special order with extra sides and drinks',
    ItemPrice: 999.99,
    sale: false,
    soldOut: false,
    loyaltyPointsToggle: true, 
    limitedTimeBannerToggle: true,
    saleTagToggle: true, 
    widthFitContent: false,
    heightFitContent: true,
    animated: true,
    flat: false,
    saleTagAmount: 5, 
};




