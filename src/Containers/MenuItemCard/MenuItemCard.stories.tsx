// Mack code, here incase unable to comit 
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MenuItemCard, MenuItemCardProps, Paragraph, Heading } from '../../index';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';


export default {
    title: createStoryTitle('MenuItemCard'),
    component: MenuItemCard,
    args: {
        flat: false,
        animated: false,
        sale: false,
        souldout: false,  
    },
} as Meta;

export const Basic: Story<MenuItemCardProps> = (args) => (
    <MenuItemCard {...args}>
        <img 
            src="https://veggiedesserts.com/wp-content/uploads/2020/08/blackberry-pancakes-1-sq.jpg"
            alt="Blackberry Pancakes"
            style={{width:350, height:200}}
        />
        <Heading bold>{getCaptionForLocale('Blackberry Pancakes')}</Heading>
        <Paragraph bold>{getCaptionForLocale ('Price Placeholder')}</Paragraph>
    </MenuItemCard>
);
