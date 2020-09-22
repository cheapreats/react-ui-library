import React from 'react';
import { storiesOf } from '@storybook/react';
import { Mixins } from '../../src';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { HorizontalScrollList } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Horizontal Scroll List'), module)
    .addDecorator(withKnobs)
    .add('with default', () => {
        const exampleHoveredStyle = () => `
            color: red;
        `;

        const exampleSelectedStyle = () => `
            color: red;
            font-weight: bold;
        `;

        const exampleLabelArray = [
            'fruit',
            'burgers',
            'drinks',
            'steak',
            'pizza',
            'desserts',
            'appetizers',
            'entrées',
            'snacks',
        ];

        return (
            <HorizontalScrollList
                labelArray={exampleLabelArray}
                menuName={text('Name of Menu', 'MENU')}
                hoveredStyle={exampleHoveredStyle}
                selectedStyle={exampleSelectedStyle}
                menuWidth={number('Fix Dropdown Menu Width')}
                displaySelected={boolean('displaySelected', true)}
                displayDropDown={boolean('displayDropDown', true)}
            />
        );
    });
