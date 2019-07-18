import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Datepicker } from '../../src';
import { mockElement } from '../Tools';


storiesOf('Datepicker', module)
    .addDecorator(withKnobs)
    .add(
        'with mock',
        mockElement(([state, setState]) => (
            <Datepicker
                name="demo"
                value={state}
                onChange={({ target }) => setState(target.value)}
                label={text('Label', 'Label')}
                description={text('Description', 'Description')}
                placeholder={text('Placeholder', 'Placeholder')}
            />
        ), new Date()),
    )
    .add('with default', () => (
        <Datepicker
            name="demo"
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
        />
    ));
