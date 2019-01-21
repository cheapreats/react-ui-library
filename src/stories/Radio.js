import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radio } from '../components';

storiesOf('Radio', module)
    .add('with nothing', () => (
        <Radio/>
    ), {
        notes: `The default size is 25. Some sizes cause positioning of dot to be off due to the accuracy of DOM`
    })
    .add('with size increased', () => (
        <Radio size={400}/>
    ))
    .add('with size decreased', () => (
        <Radio size={4}/>
    ), { notes: 'Might want to zoom in for this' })
    .add('with value', () => (
        <Radio size={31} onChange={() => console.log('no')} value/>
    ))
    .add('with disabled', () => (
        <Radio size={31} value disabled/>
    ))
;