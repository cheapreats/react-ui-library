import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { RankingTable } from '../../src';

const data = [
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 2000000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'hot dog',
        totalSpent: 2000000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'hot dog',
        totalSpent: 5000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'hot dog',
        totalSpent: 3400,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'hot dog',
        totalSpent: 200,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'hot dog',
        totalSpent: 2400,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'hot dog',
        totalSpent: 2900,
    },
];

const dataTwo = new Array(100).fill({
    image:
        'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
    name: 'hot dog',
    totalSpent: 500,
});

storiesOf('Ranking Table', module)
    .addDecorator(withKnobs)
    .add('with Default', () => (
        <RankingTable
            title="Top 10 Products"
            IsTimeIntervalFilterVisible={true}
            data={data}
            rowsVisible={4}
        />
    ));
