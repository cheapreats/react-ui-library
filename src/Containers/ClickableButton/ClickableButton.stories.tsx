import React from 'react'; 
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { ClickableButtonProps, ClickableButton } from "index";

export default{
    title: createStoryTitle('ClickableButton'),
    component: ClickableButton,
    args:{
        buttontext: 'test',
    }
}as Meta;

export const Basic: Story<ClickableButtonProps> = (args) => (
    <ClickableButton {...args}/> 
  )