import React from 'react';
import { Meta, Story } from '@storybook/react';
import RenderText  from './RenderText'
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle("Render Text"),
    component: RenderText,
    args: {
        label: "Test",
        price: 11.11,
    }
} as Meta

export const Basic: Story = (args) => (
    <RenderText {...args}/>
)