import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Datepicker } from '../../src';

storiesOf('Datepicker', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Datepicker
            name='demo'
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
        />
    ))
;
