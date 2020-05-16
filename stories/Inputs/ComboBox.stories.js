import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { mockElement } from '../Tools';
import { ComboBox } from '../../src';

storiesOf('ComboBox', module)
    .add(
        'with default',
        mockElement(
            ([state, setState]) => (
                <ComboBox
                    name="demo"
                    label={text('Label', 'Label')}
                    description={text('Description', 'Description')}
                    placeholder={text('', '')}
                    onChange={({ target }) => {
                        console.log(target.value);
                        setState(target.value);
                    }}
                    value={state}
                >
                    <option value="a">One</option>
                    <option value="b">Two</option>
                    <option value="c">Three</option>
                    <option value="d">Four</option>
                    <option value="e">Five</option>
                </ComboBox>
            ),
            '',
        ),
    )