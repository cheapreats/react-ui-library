import React from 'react';
import { storiesOf } from '@storybook/react';
import { Mixins } from '../../src';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { HorizontalScrollList } from '../../src';

storiesOf('HorizontalScrollList', module)
    .addDecorator(withKnobs)
    .add('with default', () => {
        const defaultHoveredStyle = () => `
            color: red;
        `;

        const defaultSelectedStyle = () => `
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
                menuName={text('Name of Menu', 'Menu')}
                hoveredStyle={defaultHoveredStyle}
                selectedStyle={defaultSelectedStyle}
                menuWidth={number('Fix Dropdown Menu Width')}
            />
        );
    });
