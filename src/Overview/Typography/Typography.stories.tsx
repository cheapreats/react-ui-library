import React from 'react';
import { Meta, Story } from '@storybook/react';
import Typography, {TypographyProps} from './Typography';

export default {
    title: 'Design System/Typography',
    component: Typography,
} as Meta;

export const Overview: Story<TypographyProps> = (args) => (
    <Typography {...args} />
);