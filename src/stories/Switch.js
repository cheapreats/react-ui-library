import React from 'react';
import { storiesOf } from '@storybook/react';
import { Switch } from '../components';

storiesOf('Switch', module)
    .add('with nothing', () => (
        <Switch name='a'/>
    ), {
        notes: `Uses native checkbox to manage state, allowing for accessibility. The default size is 26`
    })
    .add('with size increased', () => (
        <Switch name='b' size={200}/>
    ), {
        notes: `
        Size changes the size of the switch, it represents the height of the box in pixels.
        The width would be 2x of that.
        (It is important to keep this ratio to ensure the functionality of the animation)
        `
    })
    .add('with size decreased', () => (
        <Switch name='f' size={4}/>
    ), {
        notes: `
        If you zoom in far enough you can see that the animations still work perfectly (Surprisingly)
        `
    })
    .add('with no preset value', () => (
        <Switch name='d' onChange={({ target }) => alert(target.checked)}/>
    ))
    .add('with value true', () => (
        <Switch name='d' value={true} onChange={({ target }) => alert(target.checked)}/>
    ))
    .add('with value false', () => (
        <Switch name='d' value={false} onChange={({ target }) => alert(target.checked)}/>
    ))
    .add('with disabled', () => (
        <Switch name='e' size={400} value={true} disabled/>
    ));
;