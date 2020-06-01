import React from 'react';
import { storiesOf } from '@storybook/react';
import { mockElement } from '../Tools';
import { LocationFinder } from '../../src';

storiesOf('LocationFinder', module).add(
    'with default',
    mockElement(
        ([state, setState]) => (
            <LocationFinder
                locationPlaceholder="Find My Location"
                onLocationChange={({ target }) => {
                    setState(target.value);
                }}
                locationValue={state}
            ></LocationFinder>
        ),
        '',
    ),
);
