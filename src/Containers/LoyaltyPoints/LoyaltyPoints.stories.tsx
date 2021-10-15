import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { LoyaltyPointsProps, LoyaltyPoints } from "index";
import { star } from '@styled-icons/material-rounded/Stars';


export default {
  
  title: createStoryTitle('LoyaltyPoints'),
  component: LoyaltyPoints,
  args:{
    amount: '+10★'
  }
}as Meta;


export const Basic: Story<LoyaltyPointsProps> = (args) => (
  <LoyaltyPoints{...args}/>
)

//todo switch star from text to icon using styled-icons import