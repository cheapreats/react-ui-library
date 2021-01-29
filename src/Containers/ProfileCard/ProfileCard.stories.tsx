import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('ProfileCard'),
    component: ProfileCard,
    args: {
        left: 10,
        top: 10,
        width: 40,
        height: 30,
        popup: true,
        content: 'Content',
    },
} as Meta;

export const Basic: Story<ProfileCardProps> = (args) => <ProfileCard {...args} />;
