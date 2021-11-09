import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { LoyaltyPointsProps, LoyaltyPoints } from "../../index";
import { createStoryTitle } from '../../Constants';

export default {
  
    title: createStoryTitle('LoyaltyPoints'),   
    component: LoyaltyPoints,
    args:{
        loyaltyamount: 10,
        loyaltypointlimit: 100,
    }
}as Meta;

export const Basic: Story<LoyaltyPointsProps> = (args) => (
    <LoyaltyPoints {...args}/> 
)