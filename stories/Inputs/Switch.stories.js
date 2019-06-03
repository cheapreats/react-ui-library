import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { transition } from '@Utils/Mixins';
import { Switch } from '../../src';

storiesOf('Switch', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Switch
            label='Label'
            description='Description'
        />
    ))
    .add('with tags', () => (
        <Switch
            label='Label'
            tags={['On', 'Off']}
            description='Description'
        />
    ))
    .add('with switchStyle & activeStyle', () => (
        <Switch
            label='Label'
            switchStyle={() => `
                ${ transition(['background-color']) }
            `}
            activeStyle={() => `
                background-color: green;
            `}
            description='Description'
        />
    ))
;
