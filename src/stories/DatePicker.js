import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker, Global } from '../components/preview';

const Test = () => {
    const [ date, setDate ] = useState(new Date());
    return (
        <DatePicker
            label='Banana'
            name='REEE'
            value={date}
            onChange={setDate}
        />
    );
}

storiesOf('DatePicker', module)
    .addDecorator(story => <Global>{ story() }</Global>)
    .add('with title', () => (
        <Test/>
    ))
    .add('with description', () => (
        <DatePicker
            label='Banana'
            name='REEE'
            placeholder='Pick a date'
            description='What day is your banana?'
            onChange={ ({ target }) => console.log(target) }
        />
    ))
    .add('with valid', () => (
        <DatePicker
            valid
            label='Banana'
            name='REEE'
            value={ new Date() }
            onChange={ ({ target }) => console.log(target) }
        />
    ))
    .add('with error', () => (
        <DatePicker
            label='Banana'
            name='REEE'
            error='Not a valid date'
            value={ new Date() }
            onChange={ ({ target }) => console.log(target) }
        />
    ))
    .add('with disabled', () => (
        <DatePicker
            label='Banana'
            name='REEE'
            disabled
            value={ new Date() }
            onChange={ ({ target }) => console.log(target) }
        />
    ))
;