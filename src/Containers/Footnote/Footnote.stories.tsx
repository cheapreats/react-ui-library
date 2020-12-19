import React from 'react';
import { Footnote, SmallText, FootnoteProps } from '../../index';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Footnote'),
    component: Footnote,
    args: {
        show: true,
        bold: true,
        children: 'Toggle the show knob to hide me!',
    },
} as Meta;

export const Basic: Story<FootnoteProps> = (args) => (
    <Footnote {...args}>
        <SmallText {...args}>{getCaptionForLocale(args.children)}</SmallText>
    </Footnote>
);
