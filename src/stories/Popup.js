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
    .add('with default padding', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup padding name='ralph'>
                <h1>HIIIIIII</h1>
            </Popup>
        </Page>
    ), {
        notes: `Default is 20xp`
    })
    .add('with custom padding', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup padding='40px 60px' name='ralph'>
                <h1>HIIIIIII</h1>
            </Popup>
        </Page>
    ), {
        notes: ``
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
    .add('with custom onClose event', () => (
        <Page>
            <button onClick={() => popup.toggle('ralph')}>Click me!</button>
            <Popup name='ralph' padding onClose={() => {alert("Popup Closed Event.")}}>
                <h1>When You close this popup via clicking away or on the close button, it will call the callback method</h1>
            </Popup>
        </Page>
    ), {
        notes: `Optional onClose overrides default close behaviour allowing you to run custom functionality before closing the popup.`
    })
;