import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TagGroup } from '@Containers/TagGroup/TagGroup';
import { ProfileModal, ProfileModalProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('ProfileModal'),
    component: TagGroup,
    args: {
        image: 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
        name: 'Joshua',
        date: '02-08-1986'
    },
} as Meta;

export const Basic: Story<ProfileModalProps> = (args) => (
    <ProfileModal {...args} />
);
