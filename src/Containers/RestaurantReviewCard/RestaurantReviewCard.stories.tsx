import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    RestaurantReviewCard,
    IRestaurantReviewCardProps,
} from './RestaurantReviewCard';

export default {
    title: 'Components/Other/RestaurantReview/RestaurantReviewCard',
    component: RestaurantReviewCard,
    args: {
        fiveStars:1,
        fourStars:2,
        threeStars:4,
        twoStars:1,
        oneStar:0
    },
} as Meta;

export const Basic: Story<IRestaurantReviewCardProps> = (args) => (
    <RestaurantReviewCard {...args} />
);
