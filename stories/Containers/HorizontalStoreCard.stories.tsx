import React from 'react';
import { HorizontalStoreCard, HorizontalStoreCardProps } from '../../src';
import { Dog } from '@styled-icons/fa-solid/Dog';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Horizontal Store Card'),
    component: HorizontalStoreCard,
    args: {
        image: 'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif',
        pictureTags: [{ icon: Dog, text: 'Dog' }],
        headerTags: ['$$', 'here', 'are', 'tags'],
        tags: ['Free Shipping', 'Coupon', 'Coupon 2'],
        rating: '4',
        heading: 'Hot Dog',
        description: 'this is a Horizontal Store Card',
        alt: 'coding Dog',
    },
} as Meta;

export const Basic: Story<HorizontalStoreCardProps> = (args) => (
    <HorizontalStoreCard {...args} width="600px" height="200px" />
);
