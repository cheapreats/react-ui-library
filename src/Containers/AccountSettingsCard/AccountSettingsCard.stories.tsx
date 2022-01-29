import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AccountSettingsCard, IAccountSettingsCard } from './AccountSettingsCard';

export default {
    title: 'Terminal/Settings/AccountSettingsCard',
    component: AccountSettingsCard,
    argTypes: {onLogoutClick: {action: 'Clicked Logout'}},
    args: {
        usernameLabel: 'Username',
        username: 'Kevin',
        roleLabel: 'Role',
        role: 'Admin',
        accountIdLabel: 'Account Id',
        accountId: '241234214234',
        header: 'Account Information',
        logoutLabel: 'Logout'
    },
} as Meta;

export const Basic: Story<IAccountSettingsCard> = (args) => (
    <AccountSettingsCard {...args}/>
);
