import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ProfileModal, ProfileModalProps } from '../../index';


export default {
    title: 'Dashboard/CRM/ProfileModal',
    component: ProfileModal,
    args: {
        image: 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
        name: 'Joshua Bright',
        date: '02-08-1986',
        tags: [
            {children: 'single'}
        ]
    },
} as Meta;

export const Basic: Story<ProfileModalProps> = (args) => (
    <ProfileModal {...args} />
);

export const MultipleTags = Basic.bind({});

MultipleTags.args = {
    ...MultipleTags.args,
    image: 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
    name: 'Ben Owen',
    date: '01-21-1997',
    tags: [
        {children: 'First'},
        {children: 'Second'},
        {children: 'Third'},
        {children: 'Fourth'}
    ]
};
