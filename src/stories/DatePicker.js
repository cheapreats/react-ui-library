import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from '../components/preview';

storiesOf('DatePicker', module)
    .add('with title', () => (
        <DatePicker
            label='Banana'
            name='REEE'
            value={ new Date() }
            onChange={ ({ target }) => console.log(target) }
        />
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