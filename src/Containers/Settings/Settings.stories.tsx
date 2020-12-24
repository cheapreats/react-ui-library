import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Settings, SettingsProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Settings'),
    component: Settings,
    args: {},
} as Meta;

export const Basic: Story<SettingsProps> = (args) => <Settings {...args} />;
