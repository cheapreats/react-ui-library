import React from 'react';
import { storiesOf } from '@storybook/react';
import { mockElement } from '../Tools';
import { Timepicker } from '../../src';

storiesOf('Timepicker', module).add(
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
