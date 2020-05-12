import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { SearchBar } from '../../src';

storiesOf('Search Bar', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <SearchBar
            placeholder="Search for..."
            suggestiveOptions={[
                'Admiral Baldrick',
                'Amy Hardwood',
                'Baldrick',
                'Baron von Richthofen',
                'Beadle',
                'Captain Darling',
                'Captain Edmund Blackadder',
                'Captain Redbeard Rum',
                'Don Speekingleesh',
                'Earl Farrow',
                'Gaoler Ploppy',
                'Harold II',
                'Henry Tudor',
                'Ivor Biggun',
                'Jack Large',
                'Kaiser Wilhelm II',
                'Ralph',
                'Oberleutnant von Gerhardt',
                'Oliver Cromwell',
                'Napoleon Bonaparte',
                'MacAdder',
                'Mad Gerald',
                'Lady Elizabeth',
                'Lady Emma Hamilton',
                'Lady Farrow',
            ]}
        />
    ));
