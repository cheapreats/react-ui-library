import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CustomSearch, CustomSearchProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Custom Search'),
    component: CustomSearch,
    argTypes: {
        onPriceChange: {
            action: {
                type: 'string',
            },
        },
        onFoodChange: {
            action: {
                type: 'string',
            },
        },
        onLocationChange: {
            action: {
                type: 'string',
            },
        },
    },
    args: {
        width: '900px',
        height: '100px',
        pricePlaceholder: 'Price Per Meal',
        locationPlaceholder: 'Find My Location',
        foodPlaceholder: 'Cuisines',
        priceOptions: [
            <option value='5-9'>$5-9</option>,
            <option value='10-$19'>$10-$19</option>,
            <option value='20-$29'>$20-$29</option>,
            <option value='30-$39'>$30-$39</option>,
            <option value='40+'>$40+</option>,
        ],
        locationOptions: [
            <option value="4th Dimentional Dwight Schrute's Beet Farm">
                4th Dimentional Dwight Schrute&apos;s Beet Farm
            </option>,
            <option value='Wasp Universe'>Wasp Universe</option>,
            <option value='Anatomy Park'>Anatomy Park</option>,
            <option value='Cafe Sanchez '>Cafe Sanchez </option>,
            <option value='Camp Flabanabba'>Camp Flabanabba</option>,
            <option value='Galactic Federation Outpost'>
                Galactic Federation Outpost
            </option>,
            <option value='Clackspire Labyrinth'>Clackspire Labyrinth</option>,
            <option value="Unity's Planet">Unity&apos;s Planet</option>,
            <option value='Brazil'>Brazil</option>,
            <option value='Fantasy World'>Fantasy World</option>,
        ],
        foodOptions: [
            <option value='a'>Feijoada</option>,
            <option value='b'>Tourtiere</option>,
            <option value='c'>Butter Tarts</option>,
            <option value='d'>Beaver Tails </option>,
            <option value='e'>Montreal style bagels</option>,
            <option value='f'>Pudding Chomeur</option>,
            <option value='g'>Lunenburg Pudding</option>,
            <option value='h'>Canadian Peameal Bacon</option>,
            <option value='i'>Jiggs Dinner</option>,
            <option value='j'>Cretons Quebec pate</option>,
        ],
    },
} as Meta;

export const Basic: Story<CustomSearchProps> = (args) => (
    <CustomSearch {...args} />
);
