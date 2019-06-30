import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Select } from '../../src';

storiesOf('Select', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Select
            name='demo'
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
        >
            <option value='1'>REEEE</option>
            <option value='1'>REEEE</option>
            <option value='1'>REEEE</option>
            <option value='1'>REEEE</option>
            <option value='1'>REEEE</option>
        </Select>
    ))
;
