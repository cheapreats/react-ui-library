import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { mockElement } from '../Tools';
import { Timepicker } from '../../src';

storiesOf('Timepicker', module)
    .addDecorator(withKnobs)
    .add(
        'with default',
        mockElement(
            ([state, setState]) => (
                <Timepicker
                    label="Timepicker"
                    description="Click to pick a time"
                    onChange={({ target }) => {
                        console.log(target.value);
                        setState(target.value);
                    }}
                    value={state}
                />
            ),
            new Date(),
        ),
    );
