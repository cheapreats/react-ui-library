import React from 'react';
import { Save } from '@styled-icons/fa-solid/Save';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle, getCaptionForLocale } from '../../Constants';
import PeopleButton, {ButtonProps} from "@Inputs/PeopleButton/PeopleButton";
import {Datepicker} from "@Inputs";


export default {
    title: createStoryTitle('PeopleButton'),
    component: PeopleButton,
    argTypes: { onClick: { action: "People Button Clicked" } },
    args: {
        disabled: false,
        primary: true,
        color: 'white',
        icon: Save,
        iconSize: '14px',
        contentColor: 'text',
        full: false,
        children: '2 People',
        DatePicker: Datepicker,
    },
} as Meta;

export const Basic: Story<ButtonProps> = (args) => (
    <PeopleButton {...args}>{getCaptionForLocale(args.children as string)}</PeopleButton>
);