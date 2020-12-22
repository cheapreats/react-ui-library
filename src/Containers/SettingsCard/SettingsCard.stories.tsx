import React from 'react';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { Meta, Story } from '@storybook/react';
import { SettingsCard, SettingsCardProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Settings Card'),
    component: SettingsCard,
    args: {
        heading: 'SettingsCard',
        onClick: () => alert('clicked'),
    },
} as Meta;

export const Basic: Story<SettingsCardProps> = (args) => (
    <SettingsCard {...args} icon={Plus} />
);
