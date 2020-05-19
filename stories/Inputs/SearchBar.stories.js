import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { SearchBar } from '../../src';
import { mockElement } from '../Tools';

storiesOf('Search Bar', module)
    .addDecorator(withKnobs)
    .add(
        'with default',
        mockElement(
            ([state, setState]) => (
                <SearchBar
                    placeholder="Search for..."
                    onInput={target => {
                        setState(target);
                    }}
                    onChange={({ target }) => {
                        console.log(target);
                        setState(target.value);
                    }}
                    value={state}
                >
                    <option value="a">Admiral Baldrick</option>,
                    <option value="b">Beadle</option>,
                    <option value="c">Baldrick</option>,
                    <option value="d">Lady Farrow </option>,
                    <option value="e">Don Speekingleesh</option>,
                    <option value="f">Lady Emma Hamilton</option>,
                    <option value="g">Lady Elizabeth</option>,
                    <option value="h">Jack Large</option>,
                    <option value="i">Earl Farrow</option>,
                    <option value="j">Captain Redbeard Rum</option>,
                </SearchBar>
            ),
            '',
        ),
    );
