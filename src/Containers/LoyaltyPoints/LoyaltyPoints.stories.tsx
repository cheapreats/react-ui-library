
import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';
import { LoyaltyPointsProps, LoyaltyPoints, Paragraph } from "index";

export default {
  
  title: createStoryTitle('LoyaltyPoints'),
  component: LoyaltyPoints,
  args:{
    amount: '+10★'
  }
}as Meta;


export const Basic: Story<LoyaltyPointsProps> = (args) => (
  <LoyaltyPoints{...args}>
    <Paragraph>{getCaptionForLocale('+10★')}</Paragraph>
  
  </LoyaltyPoints>
)

