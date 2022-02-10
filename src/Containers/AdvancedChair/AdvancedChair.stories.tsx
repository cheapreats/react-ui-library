import React from 'react';
import { Meta, Story } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import { AdvancedChair, IAdvancedChair } from './AdvancedChair';

export default {
    title: ('Components/TableManagement/AdvancedChair'),
    component: AdvancedChair,
} as Meta;

const Template: Story<IAdvancedChair> = (args) => <AdvancedChair {...args}/>;

export const VacantChair = Template.bind({});
VacantChair.args = {
    position: 'right',
    relativeSize: 0.5,
    occupiedBy: 'JS',
    onChairClick: action('The chair is clicked'),
    chairLegProps: {onClick: () => console.log('hello'), style:{backgroundColor:"pink"}}
};

export const PersonalizedChair = Template.bind({});
PersonalizedChair.args = {
    position: 'right',
    relativeSize: 0.5,
    occupiedBy: 'YZ',
    onChairClick: action('The chair is clicked'),
    chairLegProps: {onClick: () => console.log('hello'), style:{borderRadius: 0}}
};