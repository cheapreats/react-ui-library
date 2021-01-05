import React from 'react';
import { DraggableCanvas } from './DraggableDemoFront'
import { createStoryTitle} from "../../Constants";
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('DraggableCanvas'),
    component: DraggableCanvas,
} as Meta;

const Template: Story<DraggableCanvas> = (args) => (
    <DraggableCanvas {...args} />
);
export const DraggableCanvasComponent = Template.bind({});
