import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Input } from '../../src';

storiesOf('Input.jsx.tsx', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Input
            name='demo'
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
        />
    ))
    .add('with success', () => (
        <Input
            name='demo'
            label='Label'
            description='This is an input with success state'
            placeholder='Placeholder'
            success={boolean('Success', true)}
        />
    ))
    .add('with error', () => (
        <Input
            name='demo'
            label='Label'
            description='This is an input with an error message'
            placeholder='Placeholder'
            error={text('Error Message', 'Error Message!')}
        />
    ))
    .add('with disabled', () => (
        <Input
            name='demo'
            label='Label'
            description='This is a disabled input'
            placeholder='Placeholder'
            error={text('Error Message')}
            disabled={boolean('Disabled', true)}
            success={boolean('Success', false)}
        />
    ))
;
