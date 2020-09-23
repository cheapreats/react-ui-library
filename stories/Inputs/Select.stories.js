import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { mockElement } from '../Tools';
import { Select } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Select'), module)
    .addDecorator(withKnobs)
    .add(
        'with default',
        mockElement(
            ([state, setState]) => (
                <Select
                    name="demo"
                    label={text('Label', 'Label')}
                    description={text('Description', 'Description')}
                    placeholder={text('Placeholder', 'Placeholder')}
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
                </Select>
            ),
            '',
        ),
    )
    .add('with success', () => (
        <Select
            name="demo"
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
            success={boolean('Success', true)}
        >
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Select>
    ))
    .add('with error', () => (
        <Select
            name="demo"
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
            error={text('Error Message', 'Error Message!')}
        >
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Select>
    ))
    .add('with disabled', () => (
        <Select
            name="demo"
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
            error={text('Error Message')}
            disabled={boolean('Disabled', true)}
            success={boolean('Success', false)}
        >
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Select>
    ));
