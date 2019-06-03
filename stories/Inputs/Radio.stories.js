import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Radio } from '../../src';

storiesOf('Radio', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Radio label='Label'/>
    ))
;
