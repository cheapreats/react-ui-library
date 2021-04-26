import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CardCarousel } from './CardCarousel';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Card Carousel'),
    component: CardCarousel,
} as Meta;

export const Basic: Story = () => <CardCarousel />;
