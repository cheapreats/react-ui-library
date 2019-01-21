import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../components';

storiesOf('Select', module)
    .add('with text', () => (
        <Select
            label='How many Ralphs are too many Ralphs?'
            name='numOfRalph'
            placeholder='Select a Ralph'
            options={[1,2,3,4,5,6,7,8,9,10, 'too many...']}
        />
    ), {
        notes: `Bai`
    })
    .add('with default value', () => (
        <Select
            label='How many Ralphs are too many Ralphs?'
            name='numOfRalph2'
            value={2}
            placeholder='Select a Ralph'
            options={[1,2,3,4,5,6,7,8,9,10, 'too many...']}
        />
    ), {
        notes: `Bai`
    })
;