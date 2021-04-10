import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EditControlPanel, IEditControlPanel } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('EditControlPanel'),
    component: EditControlPanel,
} as Meta;

/**
 * Functions for Delete, Rotate, and Click buttons
 */
const handleDeleteClick = () => {
    console.log('Delete Button has been clicked');
};

const handleRotateClick = () => {
    console.log('Rotate Button has been clicked');
};

const handleCloneClick = () => {
    console.log('Clone Button has been clicked');
};

const Template: Story<IEditControlPanel> = (args) => (
    <EditControlPanel {...args} />
);
export const ControlPanelMain = Template.bind({});
ControlPanelMain.args = {
    onDeleteClick: handleDeleteClick,
    onCloneClick: handleCloneClick,
    onRotateClick: handleRotateClick,
};
