import React from 'react';
import { storiesOf } from '@storybook/react';
import { TimePicker } from '../components';

storiesOf('TimePicker', module)
    .add('with nothing', () => (
        <TimePicker/>
    ))
;