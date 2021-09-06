import { QuestionMarkHover,QuestionMarkProps } from "./QuestionMarkHover";
import React from "react";
import { Story, Meta } from '@storybook/react';

export default {
    title: 'QuestionMarkHover',
    component: QuestionMarkHover,
    args: {
        title: 'test',
        secondaryTitle: '?'
    }
    } as Meta;

export const Template: Story<QuestionMarkProps> = (args) => <QuestionMarkHover {...args} />;




    