import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { SettingsSwitch} from '../../src';

const switcher = (value) => console.log(value);

storiesOf('SettingsSwitch', module)
    .add('with default', () => (
        <SettingsSwitch
            label="Label"
            description="Description"
            text="Settings Switch"
            onSwitch={switcher}
            onSwitchValue="On Switch Value"
        />
    ))
    .add('disabled flex column', () => (
        <SettingsSwitch
            label="Label"
            description="Description"
            disabled
            flexDirection="column"
            text="Settings Switch"
        />
    ))
    .add('tags flex-end', () => (
        <SettingsSwitch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            text="Settings Switch"
            flexDirection={"flex-end"}
            innerMargin="auto 20px auto 0"
        />
    ))
    .add('activeColor center', () => (
        <SettingsSwitch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            activeColor="blue"
            text="Settings Switch"
            flexDirection="center"
            innerMargin="0 20px auto 0"
        />
    ))
    .add('SettingsSwitchColor flex-start', () => (
        <SettingsSwitch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            SettingsSwitchColor="orange"
            text="Settings Switch"
            flexDirection="flex-start"
            innerMargin="auto 20px auto 0"
        />
    ))
    .add('Both default', () => (
        <SettingsSwitch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            SettingsSwitchColor="orange"
            activeColor="blue"
            text="Settings Switch"
        />
    ))
