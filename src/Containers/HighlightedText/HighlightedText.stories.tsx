import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HighlightedText, HighlightedTextProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Highlighted Text'),
    component: HighlightedText,
    args: {
        label: 'Header label',
        display: 'column',
        type: 'h2',
        padding: '0 0 0 5px',
        width: 200,
        children: 'Header row children',
    },
} as Meta;

export const Basic: Story<HighlightedTextProps> = (args) => <HighlightedText {...args} />;
