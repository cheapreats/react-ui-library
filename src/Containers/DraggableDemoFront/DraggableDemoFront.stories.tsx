import React from 'react';
import { DraggableCanvas } from '@Containers'
import { createStoryTitle} from "../../Constants";
import { Story } from '@storybook/react';

export default {
    title: createStoryTitle('DraggableCanvas'),
    component: DraggableCanvas,
};

const Template: Story<DraggableCanvas> = (args) => (
    <DraggableCanvas {...args} />
);
export const DraggableCanvasComponent = Template.bind({});
