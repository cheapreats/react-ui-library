import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radio } from '../components';

storiesOf('Radio', module)
    .add('with nothing', () => (
        <Radio name='a'/>
    ), {
        notes: `The default size is 25. Some sizes cause positioning of dot to be off due to the accuracy of DOM`
    })
    .add('with size increased', () => (
        <Radio name='b' size={400}/>
    ))
    .add('with size decreased', () => (
        <Radio name='c' size={4}/>
    ), { notes: 'Might want to zoom in for this' })
    .add('with value', () => (
        <Radio name='d' size={31} onChange={({ target }) => alert(target.checked)} value/>
    ))
    .add('with disabled', () => (
        <Radio name='e' size={31} value disabled/>
    ))
;