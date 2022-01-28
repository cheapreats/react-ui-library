import React from 'react';
import styled from 'styled-components';
import { World } from '@styled-icons/boxicons-regular/World';
import { Meta, Story } from '@storybook/react';
import {
    RestaurantReviewCard,
    IRestaurantReviewCardProps,
} from './RestaurantReviewCard';

export default {
    title: 'Components/Other/RestaurantReview/RestaurantReviewCard',
    component: RestaurantReviewCard,
    args: {
        fiveStars: 1,
        fourStars: 2,
        threeStars: 4,
        twoStars: 1,
        oneStar: 0,
    },
} as Meta;

export const Basic: Story<IRestaurantReviewCardProps> = (args) => (
    <RestaurantReviewCard {...args} />
);

const Icon = styled.svg`
    width: 35px;
    height: 35px;
    margin: 0 0 20px 0;
    color: ${({ theme }) => theme.colors.statusColors.orange};
`;

export const WithIcon = Basic.bind({});
WithIcon.args = {
    ...Basic.args,
    icon: <Icon as={World} />,
};
