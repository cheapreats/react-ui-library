import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RankingTable, RankingTableProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const data = [
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 2000000,
        totalSpent1D: 1000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 4550000,
        totalSpent1D: 2000,
        totalSpent1W: 20000,
        totalSpent1M: 90000,
        totalSpent1Y: 600000,
    },
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 10000,
        totalSpent1D: 6000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 29000,
        totalSpent1D: 1000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 20000,
        totalSpent1D: 1000,
        totalSpent1W: 20000,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 200,
        totalSpent1D: 1000,
        totalSpent1W: 500,
        totalSpent1M: 30000,
        totalSpent1Y: 600000,
    },
    {
        image: 'https://cdn.dribbble.com/users/78464/screenshots/11446190/media/83dd322812573b74144f56b38560a259.jpg',
        name: 'chilly chesseburger with bacon',
        totalSpent: 20000,
        totalSpent1D: 100,
        totalSpent1W: 20000,
        totalSpent1M: 3000000,
        totalSpent1Y: 300,
    },
];

export default {
    title: createStoryTitle('Ranking Table'),
    component: RankingTable,
    args: {
        title: 'Top 3 Products',
        IsTimeIntervalFilterVisible: false,
        data,
        rowsVisible: 3,
    },
} as Meta;

export const Basic: Story<RankingTableProps> = (args) => (
    <RankingTable {...args} />
);
