import React from 'react';
import { storiesOf } from '@storybook/react';
import { mockElement } from '../Tools';
import { ComboBox } from '../../src';
import { createStoryTitle } from '../Constants';

storiesOf(createStoryTitle('ComboBox'), module).add(
    'with default',
    mockElement(
        ([state, setState]) => (
            <ComboBox
                name="demo"
                label="Label"
                description="Description"
                placeholder=""
                onChange={({ target }) => {
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
);
