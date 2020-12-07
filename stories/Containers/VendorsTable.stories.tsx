import React from 'react';
import { Profile, IProfileProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Table'),
    component: Profile,
} as Meta;

const getVendorsTableProps = () => ({
    
});

const Template: Story<IProfileProps> = (args) => (
    <Profile {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorsTableProps();