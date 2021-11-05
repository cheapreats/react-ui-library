import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ProfileModal, ProfileModalProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('TableHeaderCell'),
    component: ProfileModal,
    args: {
        title: 'Name'
    },
} as Meta;

export const Basic: Story<ProfileModalProps> = (args) => (
    <ProfileModal {...args} />
);
