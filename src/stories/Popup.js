import React from 'react';
import { storiesOf } from '@storybook/react';
import { Page } from './components/Page';
import { Popup, popup } from '../components';

storiesOf('Popup', module)
    .add('with nothing', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup name='ralph'>
                <h1>HIIIIIII</h1>
            </Popup>
        </Page>
    ), {
        notes: `Control using the 'popup' object`
    })
    .add('with duration', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup duration={10000} name='ralph'>
                <h1>HIIIIIII</h1>
            </Popup>
        </Page>
    ), {
        notes: `Default is 400ms transition speed`
    })
    .add('with custom sizing', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup height='600px' width='600px' name='ralph'>
                <h1>HIIIIIII</h1>
            </Popup>
        </Page>
    ), {
        notes: `Change default box size, which is 80% height and with`
    })
    .add('with show', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup show duration={2000} name='ralph'>
                <h1>HIIIIIII</h1>
            </Popup>
        </Page>
    ), {
        notes: `Change default starting state`
    })
;