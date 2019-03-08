import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../components/preview';

storiesOf('Select', module)
    .add('with text', () => (
        <Select
            label='How many Ralphs are too many Ralphs?'
            name='numOfRalph'
            value='1'
            onChange={ ({ target }) => console.log(target, target.name, target.value) }
            placeholder='Select a Ralph'
        >
            <option value='0'>REEEEE</option>
            <option value='1'>REEE</option>
        </Select>
    ))
    .add('with valid', () => (
        <Select
            label='How many Ralphs are too many Ralphs?'
            name='numOfRalph'
            valid
            onChange={ ({ target }) => console.log(target, target.name, target.value) }
            placeholder='Select a Ralph'
        >
            <option value='0'>REEEEE</option>
            <option value='1'>REEE</option>
        </Select>
    ))
    .add('with error', () => (
        <Select
            label='How many Ralphs are too many Ralphs?'
            name='numOfRalph'
            error='Not like this...'
            onChange={ ({ target }) => console.log(target, target.name, target.value) }
            placeholder='Select a Ralph'
        >
            <option value='0'>REEEEE</option>
            <option value='1'>REEE</option>
        </Select>
    ))
    .add('with disabled', () => (
        <Select
            label='How many Ralphs are too many Ralphs?'
            name='numOfRalph'
            disabled
            onChange={ ({ target }) => console.log(target, target.name, target.value) }
            placeholder='Select a Ralph'
        >
            <option value='0'>REEEEE</option>
            <option value='1'>REEE</option>
        </Select>
    ))
;