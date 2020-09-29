import React from 'react';
import { Settings, SettingsProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Settings'),
    component: Settings,
    args: {},
} as Meta;

export const Basic: Story<SettingsProps> = (args) => <Settings {...args} />;
