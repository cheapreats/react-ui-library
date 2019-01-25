import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox, Checkboxes } from '../components';

storiesOf('Checkbox', module)
    .add('with nothing', () => (
        <Checkbox name='a'/>
    ), {
        notes: `The default size is 25`
    })
    .add('with title', () => (
        <Checkbox name='l' title='Ralph?'/>
    ))
    .add('with size increased', () => (
        <Checkbox name='b' size={400} title='Ralph?'/>
    ))
    .add('with size decreased', () => (
        <Checkbox name='c' size={6}/>
    ), { notes: 'Might want to zoom in for this' })
    .add('with value', () => (
        <Checkbox name='d' size={31} onChange={({ target }) => alert(target.checked)} value/>
    ), { notes: '' })
    .add('with disabled', () => (
        <Checkbox name='e' size={31} value disabled/>
    ), { notes: '' })
    .add('with wrapper', () => (
        <Checkboxes>
            <Checkbox name='1' title='Ralph?'/>
            <Checkbox name='2' title='Ralph?'/>
            <Checkbox name='3' title='Ralph?'/>
            <Checkbox name='4' title='Ralph?'/>
            <Checkbox name='5' title='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper column', () => (
        <Checkboxes column>
            <Checkbox name='1' title='Ralph?'/>
            <Checkbox name='2' title='Ralph?'/>
            <Checkbox name='3' title='Ralph?'/>
            <Checkbox name='4' title='Ralph?'/>
            <Checkbox name='5' title='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper title', () => (
        <Checkboxes title='What Ralphs do you Ralph?'>
            <Checkbox name='1' title='Ralph?'/>
            <Checkbox name='2' title='Ralph?'/>
            <Checkbox name='3' title='Ralph?'/>
            <Checkbox name='4' title='Ralph?'/>
            <Checkbox name='5' title='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper description', () => (
        <Checkboxes title='What Ralphs do you Ralph?' description='How do you Ralph?'>
            <Checkbox name='1' title='Ralph?'/>
            <Checkbox name='2' title='Ralph?'/>
            <Checkbox name='3' title='Ralph?'/>
            <Checkbox name='4' title='Ralph?'/>
            <Checkbox name='5' title='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
    .add('with wrapper margin', () => (
        <Checkboxes margin='100px' title='What Ralphs do you Ralph?' description='How do you Ralph?'>
            <Checkbox name='1' title='Ralph?'/>
            <Checkbox name='2' title='Ralph?'/>
            <Checkbox name='3' title='Ralph?'/>
            <Checkbox name='4' title='Ralph?'/>
            <Checkbox name='5' title='Ralph?'/>
        </Checkboxes>
    ), { notes: '' })
;