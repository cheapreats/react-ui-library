import React from 'react';
import { storiesOf } from '@storybook/react';
import { DisplayItem } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Display Item'), module)
    .add('with default', () => (
        <DisplayItem 
            label='DisplayItemLabel'
            value='DisplayItemValue'
        />
    ));