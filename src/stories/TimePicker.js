import React from 'react';
import { storiesOf } from '@storybook/react';
import { TimePicker } from '../components';

const showTime = ({ target: { name, value } }) => {
    const hour = value.getHours();
    const min = value.getMinutes();
    return `${hour <= 12 ? hour : hour % 12}:${min} ${hour < 12 ? 'AM' : 'PM'}`;
}

storiesOf('TimePicker', module)
    .add('with nothing', () => (
        <TimePicker name='test' onChange={ date => alert(showTime(date)) }/>
    ))
    .add('with error', () => (
        <TimePicker name='test12312' error='Not a ralph' onChange={ date => alert(showTime(date)) }/>
    ))
;
;