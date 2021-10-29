import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CustomerProfile, CustomerProfileProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CustomerProfile'),
    component: CustomerProfile,
    args: {
        profileName: "Ashley Tisdale",
        profileImage: 'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif'
    }
} as Meta;

export const Basic: Story<CustomerProfileProps> = (args) => (
    <CustomerProfile {...args} />
);

export const DefaultPhoto = Basic.bind({});

DefaultPhoto.args = {
    ...DefaultPhoto.args,
    profileImage: '',
};