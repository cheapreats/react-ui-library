import { QuestionMarkHover,QuestionMarkProps } from "./QuestionMarkHover";
import React from "react";
import { Story, Meta } from '@storybook/react';

export default {
    title: 'QuestionMarkHover',
    component: QuestionMarkHover,
    args: {
        title: 'test',
    }
    } as Meta;

export const Template: Story<QuestionMarkProps> = (args) => <QuestionMarkHover {...args} />;    
