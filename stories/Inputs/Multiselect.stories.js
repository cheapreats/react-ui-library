import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { MultiSelect, MultiSelectItem } from '../../src';

storiesOf('MutliSelect', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <MultiSelect
            name="demo"
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
        >
            <MultiSelectItem>Banana</MultiSelectItem>
            <MultiSelectItem>Banana</MultiSelectItem>
            <MultiSelectItem>Banana</MultiSelectItem>
        </MultiSelect>
    ))
    .add('with columns', () => (
        <MultiSelect
            name="demo"
            columns={number('Columns', 3)}
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
        >
            <MultiSelectItem>Banana</MultiSelectItem>
            <MultiSelectItem>Banana</MultiSelectItem>
            <MultiSelectItem>Banana</MultiSelectItem>
        </MultiSelect>
    ));
