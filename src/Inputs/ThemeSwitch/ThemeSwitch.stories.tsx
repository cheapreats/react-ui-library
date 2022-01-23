import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IThemeSwitch, ThemeSwitch } from '@Inputs/ThemeSwitch/ThemeSwitch';
import { Star } from '@styled-icons/evaicons-solid/Star';
import { BrightnessHigh } from '@styled-icons/bootstrap/BrightnessHigh';
import { Moon } from '@styled-icons/boxicons-regular/Moon';
import { action } from '@storybook/addon-actions';

const DataItems = [
    {
        buttonName: 'Light',
        icon: BrightnessHigh,
        themeSwitchBackgroundColor: 'white',
        headerColor: 'black',
        buttonsRowColor: '#F5F6F9',
        buttonBackgroundColor: '#F5F6F9',
        buttonTextColor: '#6A6F75',
        movingDivColor: '#1E1F25',
    },
    {
        buttonName: 'Dark',
        icon: Moon,
        themeSwitchBackgroundColor: '#C0C1C4',
        headerColor: 'black',
        buttonsRowColor: '#DDDEE1',
        buttonBackgroundColor: '#DDDEE1',
        buttonTextColor: 'black',
        movingDivColor: '#1E1F25',
    },
    {
        buttonName: 'Black',
        icon: Star,
        themeSwitchBackgroundColor: '#1E1F25',
        headerColor: 'white',
        buttonsRowColor: 'black',
        buttonBackgroundColor: 'black;',
        buttonTextColor: 'white',
        movingDivColor: '#1E1F25',
    },
];

export default {
    title: 'Components/ThemeSwitch',
    component: ThemeSwitch,
    args: {
        heading: 'Theme',
        DataItems,
        onButtonClick: action('Button is clicked'),
    },
} as Meta;

const Template: Story<IThemeSwitch> = (args) => <ThemeSwitch {...args} />;

export const ThemeSwitchTest = Template.bind({});
ThemeSwitchTest.args = {
    DataItems,
    onButtonClick: action('Button is clicked'),
};
