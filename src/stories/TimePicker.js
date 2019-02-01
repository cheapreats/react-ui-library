import React from 'react';
import { storiesOf } from '@storybook/react';
import { TimePicker } from '../components';

const showTime = date => {
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${hour <= 12 ? hour : hour % 12}:${min} ${hour < 12 ? 'AM' : 'PM'}`;
}

storiesOf('TimePicker', module)
    .add('with nothing', () => (
        <TimePicker onChange={ date => alert(showTime(date)) }/>
    ))
;