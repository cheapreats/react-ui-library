import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { Invite, InviteProps } from './Invite';

export default {
    title: createStoryTitle('Invite Component'),
    component: Invite,
} as Meta;

const defaultArgs = {
    title: 'Invite only',
    heading: 'Request an invitation to Stripe Treasury',
    description:
        'While Stripe Treasury is in initial roll-out, we’re inviting a limited number of platforms that serve US-based businesses to participate. If you’d like to request an invitation, please provide additional information and we’ll keep you updated.',
    footer: 'Because Stripe Treasury is in beta, it is available to a limited number of invited platforms and capabilities will continue to change.',
    buttonText: 'Submit',
    argTypes: { onClick: { action: 'clicked' } },
    inviteArgs: [
        {
            name: 'firstName',
            label: 'First Name',
            placeholder: 'Jane',
            type: 'text',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            placeholder: 'Diaz',
            type: 'text',
        },
        {
            name: 'email',
            label: 'Work email',
            placeholder: 'jane@account.com',
            type: 'text',
        },
        {
            name: 'website',
            label: 'Company website',
            placeholder: 'example.com',
            type: 'text',
        },
        {
            name: 'otherInfo',
            label: 'Other info',
            subLabel: 'Optional',
            placeholder: 'What do you want...',
            type: 'textarea',
        },
    ],
};

export const Basic: Story<InviteProps> = (args) => <Invite {...args} />;
Basic.args = { ...defaultArgs };
