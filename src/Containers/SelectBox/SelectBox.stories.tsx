import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SelectBox, SelectBoxProps } from '../../index';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';

export default {
    title: createStoryTitle('Select Box'),
    component: SelectBox,
    argTypes: { onSelect: { action: 'onSelect clicked!' } },
    args: {
        isSelected: false,
        children: 'Hello',
    },
} as Meta;

export const Basic: Story<SelectBoxProps> = (args) => (
    <SelectBox {...args}>{getCaptionForLocale(args.children)}</SelectBox>
);
