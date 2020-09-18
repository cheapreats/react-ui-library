import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Checkbox } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('CheckBox'), module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Checkbox
            name="demo"
            label="This is a checkbox"
            onChange={({ target }) => console.log(target, target.value)}
            value={boolean('Checked', false)}
        />
    ));
