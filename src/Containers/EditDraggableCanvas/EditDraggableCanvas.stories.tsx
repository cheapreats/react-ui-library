import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    EditDraggableCanvas,
    IEditDraggableCanvas,
} from './EditDraggableCanvas';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('EditDraggableCanvas'),
    component: EditDraggableCanvas,
} as Meta;

const Template: Story<IEditDraggableCanvas> = (args) => (
    <EditDraggableCanvas {...args} />
);

export const MainContainerComponent = Template.bind({});
MainContainerComponent.args = {
    CurrentNumberOfChairs: 0,
    MaxCapacity: 0,
};
