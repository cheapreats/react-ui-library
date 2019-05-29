import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Input } from '../../src';

storiesOf('Input', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Input
            name='demo'
            label='Label'
            placeholder='Placeholder'
        />
    ))
    .add('with error', () => (
        <React.Fragment>
            <Input
                name='demo'
                label='Label'
                margin='0 0 20px'
                description='Description'
                placeholder='Placeholder'
                error={text('Error Message', '')}
            />
            <Input
            name='test'
                label='Test'
                description='Description'
                placeholder='Placeholder'
            />
        </React.Fragment>
    ))
;
