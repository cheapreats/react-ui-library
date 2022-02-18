import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SettingsSwitch, SettingsSwitchProps } from '../../index';


export default {
    title: 'Components/Molecules/Settings Switch',
    component: SettingsSwitch,
    argTypes: { onSwitch: { action: 'Switch has been used' } },
    args: {
        label: 'Label',
        description: 'Description',
        text: 'Settings Switch',
        onSwitchValue: 'On switch value goes here',
    },
} as Meta;

export const Basic: Story<SettingsSwitchProps> = (args) => (
    <SettingsSwitch {...args} />
);

export const DisabledFlexColumn = Basic.bind({});
DisabledFlexColumn.args = {
    ...DisabledFlexColumn.args,
    disabled: true,
    flexDirection: 'column',
};

export const FlexEnd = Basic.bind({});
FlexEnd.args = {
    ...FlexEnd.args,
    leftTag: 'Off',
    rightTag: 'On',
    flexDirection: 'flex-end',
    innerMargin: 'auto 20px auto 0',
};

export const ActiveColorCenter = Basic.bind({});
ActiveColorCenter.args = {
    ...ActiveColorCenter.args,
    leftTag: 'Off',
    rightTag: 'On',
    activeColor: 'blue',
    flexDirection: 'center',
    innerMargin: '0 20px auto 0',
};
