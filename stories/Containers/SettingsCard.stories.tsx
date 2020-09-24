import React from 'react';
import { SettingsCard, SettingsCardProps } from '../../src';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

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
