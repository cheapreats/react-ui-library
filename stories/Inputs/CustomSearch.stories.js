import React from 'react';
import { storiesOf } from '@storybook/react';
import { CustomSearch } from '../../src';
import { mockElement } from '../Tools';
import { withKnobs } from '@storybook/addon-knobs';
import { createStoryTitle } from '../Constants';

storiesOf(createStoryTitle('Custom Search'), module)
    .addDecorator(withKnobs)
    .add(
        'with states',
        mockElement(
            (state = { price, location, food }) => (
                <CustomSearch
                    width="900px"
                    height="100px"
                    pricePlaceholder="Price Per Meal"
                    locationPlaceholder="Find My Location"
                    foodPlaceholder="Cuisines"
                    onPriceChange={(value) => {
                        state.price = value;
                    }}
                    onLocationChange={(value) => {
                        state.location = value;
                    }}
                    onFoodChange={(value) => {
                        state.food = value;
                    }}
                    priceValue={state.price}
                    locationValue={state.location}
                    foodValue={state.food}
                    priceOptions={[
                        <option value="a">$10-</option>,
                        <option value="b">$10-$20</option>,
                        <option value="c">$20-$30</option>,
                        <option value="d">$30-$40</option>,
                        <option value="e">$40+</option>,
                    ]}
                    locationOptions={[
                        <option value="a">
                            4th Dimensional Time Cop Headquarters
                        </option>,
                        <option value="b">Wasp Universe</option>,
                        <option value="c">Anatomy Park</option>,
                        <option value="d">Cafe Sanchez </option>,
                        <option value="e">Camp Flabanabba</option>,
                        <option value="f">Galactic Federation Outpost</option>,
                        <option value="g">Clackspire Labyrinth</option>,
                        <option value="h">Unity's Planet</option>,
                        <option value="i">Earth</option>,
                        <option value="j">Fantasy World</option>,
                    ]}
                    foodOptions={[
                        <option value="a">Poutine</option>,
                        <option value="b">Tourtiere</option>,
                        <option value="c">Butter Tarts</option>,
                        <option value="d">Beaver Tails </option>,
                        <option value="e">Montreal style bagels</option>,
                        <option value="f">Pudding Chomeur</option>,
                        <option value="g">Lunenburg Pudding</option>,
                        <option value="h">Canadian Peameal Bacon</option>,
                        <option value="i">Jiggs Dinner</option>,
                        <option value="j">Cretons Quebec pate</option>,
                    ]}
                ></CustomSearch>
            ),
            '',
        ),
    );
