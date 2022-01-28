import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AdvancedChair, IAdvancedChair } from './AdvancedChair';
import { createStoryTitle } from '../../Constants';
import {action} from "@storybook/addon-actions";

export default {
    title: createStoryTitle('AdvancedChair'),
    component: AdvancedChair,
} as Meta;

const Template: Story<IAdvancedChair> = (args) => <AdvancedChair {...args}/>;

export const VacantChair = Template.bind({});
VacantChair.args = {
    position: 'right',
    relativeSize: .05,
    occupiedBy: 'JS',
    onChairClick: action('The chair is clicked'),
    TopChairLegProps: {onClick: () => console.log('hello'), style:{backgroundColor:"pink"}}
};
