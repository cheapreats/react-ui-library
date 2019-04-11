import React from 'react';
import { storiesOf } from '@storybook/react';
import { TimePicker } from '../components/preview';

storiesOf('TimePicker', module)
    .add('with nothing', () => (
        <TimePicker
            label='Timepicker'
            description='Select a time for a time during a time when a time is time for a time'
            name='test'
        />
    ))
;