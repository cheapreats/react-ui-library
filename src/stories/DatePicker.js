import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from '../components';

storiesOf('DatePicker', module)
    .add('with nothing', () => (
        <DatePicker
            selected={ new Date() }
            onChange={ date => console.log(date) }
        />
    ))
    .add('with title', () => (
        <DatePicker
            selected={ new Date() }
            title='Banana'
            onChange={ date => console.log(date) }
        />
    ))
    .add('with description', () => (
        <DatePicker
            selected={ new Date() }
            title='Banana'
            description='What day is your banana?'
            onChange={ date => console.log(date) }
        />
    ))
;