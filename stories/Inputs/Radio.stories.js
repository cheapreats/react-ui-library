import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Radio } from '../../src';

storiesOf('Radio', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Radio
            name='demo'
        />
    ))
    .add('with label', () => (
        <Radio
            name='demo'
            label='Labelled Radio Button'
        />
    ))
    .add('with column', () => (
        <Radio
            name='demo'
            label='Labelled Radio Button'
            column
        />
    ))
    .add('with disabled', () => (
        <Radio
            name='demo'
            label='Labelled Radio Button'
            disabled
        />
    ))
    .add('with radioStyle', () => (
        <Radio
            name='demo'
            label='Labelled Radio Button'
            radioStyle={() => `
                border-color: blue;
            `}
        />
    ))
    .add('with activeStyle', () => (
        <Radio
            name='demo'
            label='Labelled Radio Button'
            radioStyle={() => `
                & div {
                    background-color: blue;
                }
            `}
            activeStyle={() => `
                border-color: blue;
                & div {
                    background-color: blue;
                }
            `}
        />
    ))
;
