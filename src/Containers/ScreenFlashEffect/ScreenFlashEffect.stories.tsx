import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ScreenFlashEffect, IScreenFlashEffectProps } from '../../index';

export default {
    title: 'Components/ScreenFlashEffect',
    component: ScreenFlashEffect,
    args: {},
} as Meta;

export const Basic: Story<IScreenFlashEffectProps> = (args) => (
    <ScreenFlashEffect {...args} />
);
