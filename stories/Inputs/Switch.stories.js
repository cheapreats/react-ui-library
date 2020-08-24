import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Switch} from '../../src';

storiesOf('Switch', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Switch
            label="Label"
            description="Description"
            isChecked={boolean("Checked", false)}
        />
    ))
    .add('with disabled', () => (
        <Switch
            label="Label"
            description="Description"
            disabled
        />
    ))
    .add('with tags', () => (
        <Switch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
        />
    ))
    .add('with activeColor', () => (
        <Switch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            activeColor="blue"
        />
    ))
    .add('with switchColor', () => (
        <Switch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            switchColor="orange"
        />
    ))
    .add('with both', () => (
        <Switch
            leftTag="On"
            rightTag="Off"
            label="Label"
            description="Description"
            switchColor="orange"
            activeColor="blue"
        />
    ))
