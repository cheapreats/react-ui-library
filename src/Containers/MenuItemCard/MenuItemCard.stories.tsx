import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MenuItemCard, MenuItemCardProps, LoyaltyPoints, LimitedTimeBanner, SaleTag } from '../../index';
import { action } from "@storybook/addon-actions";

export default {
    title: 'Components/Menu Item Card',
    component: MenuItemCard,
    subcomponents: { LoyaltyPoints, LimitedTimeBanner, SaleTag },
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
    loyaltyAmount: 0,
    loyaltyPointLimit: 100,
    minsRemaining: 0,
    cardWasClicked: action("Card was clicked and not sold out!"),
    sale: false,
    soldOut: false,
    animated: true,
    flat: false,
};

export const MenuItemCardSale = Template.bind({});
MenuItemCardSale.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg',
    itemName: 'Blackberry Pancakes',
    itemPrice: 15.99,
    itemPriceLimit: 1000,
    saleAmount: 5,
    loyaltyAmount: 20,
    loyaltyPointLimit: 100,
    minsRemaining: 120,
    cardWasClicked: action("Card was clicked and not sold out!"),
    sale: true,
    soldOut: false,
    animated: true,
    flat: false,
};

export const MenuItemCardSoldOut = Template.bind({});
MenuItemCardSoldOut.args = {
    itemImage: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2007/09/Ricotta-cheese-pancakes-with-blackberry-butter.jpg',
    itemName: 'Blackberry Pancakes',
    itemPrice: 15.99,
    itemPriceLimit: 1000,
    saleAmount: 5,
    loyaltyAmount: 0,
    loyaltyPointLimit: 100,
    minsRemaining: 0,
    cardWasClicked: action("Card was clicked and not sold out!"),
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
    loyaltyAmount: 1500,
    loyaltyPointLimit: 1200,
    minsRemaining: 24000,
    cardWasClicked: action("Card was clicked and not sold out!"),
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
    loyaltyAmount: 0,
    loyaltyPointLimit: 100,
    minsRemaining: 0,
    sale: false,
    soldOut: false,
    animated: false,
    flat: false,
};

