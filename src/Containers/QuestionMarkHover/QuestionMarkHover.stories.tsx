import React from 'react';
import { Story, Meta } from '@storybook/react';

import { QuestionMarkHover, QuestionMarkProps } from './QuestionMarkHover';

export default {
    title: 'Components/Other/QuestionMarkHover',
    component: QuestionMarkHover,
    args: {
        title: 'test',
    },
} as Meta;

export const Template: Story<QuestionMarkProps> = (args) => (
    <QuestionMarkHover {...args} />
);
