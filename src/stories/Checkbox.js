import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '../components';

storiesOf('Checkbox', module)
    .add('with nothing', () => (
        <Checkbox name='a'/>
    ), {
        notes: `The default size is 25`
    })
    .add('with size increased', () => (
        <Checkbox name='b' size={400}/>
    ))
    .add('with size decreased', () => (
        <Checkbox name='c' size={6}/>
    ), { notes: 'Might want to zoom in for this' })
    .add('with value', () => (
        <Checkbox name='d' size={31} onChange={({ target }) => alert(target.checked)} value/>
    ))
    .add('with disabled', () => (
        <Checkbox name='e' size={31} value disabled/>
    ))
;