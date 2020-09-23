import React from 'react';
import { Card, CardProps, Paragraph, SmallText } from '../../src';
import { createStoryTitle, getCaptionForLocale } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Card'),
    component: Card,
    args: {
        flat: false,
        animated: true,
    },
} as Meta;

export const Basic: Story<CardProps> = (args) => (
    <Card {...args}>
        <Paragraph bold>{getCaptionForLocale("Hmmmmmm....... wtf")}</Paragraph>
        <SmallText bold>{getCaptionForLocale("- Jun Zheng 2019")}</SmallText>
    </Card>
);
