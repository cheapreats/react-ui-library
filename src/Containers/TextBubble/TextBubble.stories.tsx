import React from 'react';
import { Meta, Story } from '@storybook/react';
import TextBubble, { ITextBubbleProps } from './TextBubble';
import TypingDots from '../../Text/TypingDots/TypingDots';

export default {
    title: 'Components/Text Bubble',
    component: TextBubble,
} as Meta;

const Template: Story<ITextBubbleProps> = (args) => (
    <TextBubble {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
    content: <p>Basic text bubble (other generated)</p>,
    fromBot: true
}

export const User = Template.bind({});
User.args = {
    content: <p>Basic text bubble (user generated)</p>,
    fromBot: false
}

export const NoText = Template.bind({});
NoText.args = {
    content: <p> </p>,
    fromBot: true
}

export const Typing = Template.bind({});
Typing.args = {
    content: <TypingDots num={3} delayStep={0.1} />,
    fromBot: true
}
