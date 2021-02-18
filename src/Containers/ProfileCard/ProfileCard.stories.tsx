import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('ProfileCard'),
    component: ProfileCard,
    argTypes: {
        onCallClick: { action: 'OnCallClick Pressed' },
        customerLoyaltyType: {
            control: {
                type: 'select',
                options: ['REGULAR', 'CASUAL', 'FIRST_TIME'],
            },
        },
    },
    args: {
        profileImage: 'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif',
        visitCount: 4,
        profileName: 'Ashley Tisdale The Third',
        lastVisitedDate: '23 Days Ago',
        isFavoriteStore: true,
    },
} as Meta;

export const Basic: Story<ProfileCardProps> = (args) => (
    <ProfileCard {...args} />
);
