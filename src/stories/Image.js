import React from 'react';
import { Global } from '../components/preview';
import { storiesOf } from '@storybook/react';
import { Image } from '../components';

storiesOf('Image', module)
    .addDecorator(story => <Global>{ story() }</Global>)
    .add('with label', () => (
        <Image
            label='Doggo Pictures'
            margin='20px'
            description='Sharing is caring. Please give me all the doggos.'
        />
    ), {
        notes: ``
    })
;
