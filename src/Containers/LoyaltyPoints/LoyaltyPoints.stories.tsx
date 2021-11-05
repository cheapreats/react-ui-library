import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { LoyaltyPointsProps, LoyaltyPoints } from "../../index";
import { createStoryTitle } from '../../Constants';

export default {
  
    title: createStoryTitle('LoyaltyPoints'),
    component: LoyaltyPoints,
    args:{
        loyaltyAmount: 10,  
    }
}as Meta;


export const Basic: Story<LoyaltyPointsProps> = (args) => (
    <LoyaltyPoints {...args}/> 
)

// todo switch star from text to icon using styled-icons import