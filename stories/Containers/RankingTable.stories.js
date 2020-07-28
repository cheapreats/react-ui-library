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
        totalSpent1D: 1000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 4000000,
        totalSpent1D: 2000,
        totalSpent1W: 20000,
        totalSpent1M: 90000,
        totalSpent1Y: 600000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 10000,
        totalSpent1D: 6000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 20000,
        totalSpent1D: 1000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 20000,
        totalSpent1D: 1000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 200,
        totalSpent1D: 1000,
        totalSpent1W: 500,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image:
            'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 20000,
        totalSpent1D: 100,
        totalSpent1W: 20000,
        totalSpent1M: 3000000,
        totalSpent1Y: 300,
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
    .add('with default', () => (
        <RankingTable
            title="Top 10 Products"
            IsTimeIntervalFilterVisible={false}
            data={data}
            rowsVisible={3}
        />
    ))
    .add('with time interval', () => (
        <RankingTable
            title="Top 10 Products"
            IsTimeIntervalFilterVisible={true}
            data={data}
            rowsVisible={3}
        />
    ));
