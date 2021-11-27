import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EditControlPanel, IEditControlPanel } from '@Containers';


export default {
    title: 'Components/EditControlPanel',
    component: EditControlPanel,
} as Meta;

/**
 * Functions for Delete, Rotate, Click, RemoveChair, AddChair buttons
 * These will show in the console to prove it has been clicked
 */
const handleDeleteClick = () => {
    console.log('Delete Button has been clicked');
};

const handleTableNumberChange = (newTableNumber: string) => {
    console.log(`New Table Input: ${newTableNumber}`);
};

const handleCloneClick = () => {
    console.log('Clone Button has been clicked');
};

const handleRemoveChairClick = () => {
    console.log('- Button has been clicked');
};

const handleAddChairClick = () => {
    console.log('+ Button has been clicked');
};

const Template: Story<IEditControlPanel> = (args) => (
    <EditControlPanel {...args} />
);
export const ControlPanelMain = Template.bind({});
ControlPanelMain.args = {
    onDeleteClick: handleDeleteClick,
    onCloneClick: handleCloneClick,
    onAddChairClick: handleAddChairClick,
    onRemoveChairClick: handleRemoveChairClick,
    onTableNumberChange: handleTableNumberChange,
};
