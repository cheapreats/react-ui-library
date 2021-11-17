import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AdvancedChair, IAdvancedChair } from './AdvancedChair';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('AdvancedChair'),
    component: AdvancedChair,
} as Meta;

const Template: Story<IAdvancedChair> = (args) => <AdvancedChair {...args}/>;

export const VacantChair = Template.bind({});
VacantChair.args = {

};
