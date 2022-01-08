import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MenuItemCard, MenuItemCardProps, LoyaltyPoints, LimitedTimeBanner, SaleTag } from '../../index';

export default {
    title: 'Components/Menu Item Card',
    component: MenuItemCard,
    subcomponents: { LoyaltyPoints, LimitedTimeBanner, SaleTag },
    argTypes: { onClick: { action: 'This card was clicked!' } },
} as Meta;

const Template: Story<MenuItemCardProps> = (args) => <MenuItemCard  {...args}> <LoyaltyPoints {...args} />
    <LimitedTimeBanner {...args} />  <SaleTag {...args} /> </MenuItemCard>;

export const MenuItemCardBasic = Template.bind({});
MenuItemCardBasic.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg',
    itemName: 'Blackberry Pancakes',
    itemPrice: 15.99,
    itemPriceLimit: 1000,
    saleAmount: 5,
    loyaltyamount: 20,
    loyaltypointlimit: 100,
    bannerWidth: 280,
    bannerHeight: 40,
    minsRemaining: 120,
    sale: false,
    soldOut: false,
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
    bannerWidth: 300,
    bannerHeight: 40,
    minsRemaining: 0,
    sale: true,
    soldOut: true,
    animated: false,
    flat: false,
};

export const MenuItemCardLongText = Template.bind({});
MenuItemCardLongText.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg',
    itemName: 'Super crazy long combo special order with extra sides and drinks',
    itemPrice: 2560,
    itemPriceLimit: 1000,
    saleAmount: 200,
    loyaltyamount: 1500,
    loyaltypointlimit: 1200,
    minsRemaining: 24000,
    bannerWidth: 300,
    bannerHeight: 40,
    sale: true,
    soldOut: false,
    animated: true,
    flat: false,
};

export const MenuItemCardEmpty = Template.bind({});
MenuItemCardEmpty.args = {
    itemImage: '',
    itemName: '',
    itemPrice: 0,
    itemPriceLimit: 1000,
    saleAmount: 0,
    loyaltyamount: 0,
    loyaltypointlimit: 100,
    minsRemaining: 0,
    bannerWidth: 300,
    bannerHeight: 40,
    sale: false,
    soldOut: false,
    animated: false,
    flat: false,
};

