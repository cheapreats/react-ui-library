import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { LoyaltyPointsProps, LoyaltyPoints } from "index";

export default {
  
  title: createStoryTitle('LoyaltyPoints'),
  component: LoyaltyPoints,
  args:{
    LoyaltyAmount: 10,
  }
}as Meta;

export const Basic: Story<LoyaltyPointsProps> = (args) => (
  <LoyaltyPoints {...args}/> 
)