import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DraggableCanvas } from './DraggableDemoFront';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('DraggableCanvas'),
    component: DraggableCanvas,
} as Meta;

const Template: Story = (args) => <DraggableCanvas {...args} />;
export const DraggableCanvasComponent = Template.bind({});
