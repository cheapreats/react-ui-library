import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Heading } from '../components';

storiesOf('Heading', module)
    .add('with text', () => (
        <Heading text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    })
    .add('with text and bold', () => (
        <Heading bold text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    })
    .add('with type', () => (
        <Fragment>
            <Heading text="Heading One"/>
            <Heading type='h2' text="Heading Two"/>
            <Heading type='h3' text="Heading Three"/>
            <Heading type='h4' text="Heading Four"/>
            <Heading type='h5' text="Heading Five"/>
            <Heading type='h6' text="Heading Six"/>
        </Fragment>
    ))
;