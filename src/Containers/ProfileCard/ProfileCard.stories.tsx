import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from '../../index';


export default {
    title: 'Components/ProfileCard',
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

export const DefaultPhoto = Basic.bind({});

DefaultPhoto.args = {
    ...DefaultPhoto.args,
    profileImage: '',
};

export const DefaultPhotoNull = Basic.bind({});

DefaultPhotoNull.args = {
    ...DefaultPhoto.args,
    profileImage: undefined,
};
