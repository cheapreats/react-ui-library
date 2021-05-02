import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CardCarousel, CardCarouselProps } from './CardCarousel';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Card Carousel'),
    component: CardCarousel,
} as Meta;

const defaultArgs = {
    copyHeader: 'Optimize the customer lifecycle',
    copyBody:
        'Use Stripe as a system of record for the customer lifecycle: manage important events such as automatically provisioning services for new subscribers or sending reminders for renewals.',
    cardTitle: 'Payment failed and an alert was sent',
    cardSubtitle: '7 hours ',
};

export const Basic: Story<CardCarouselProps> = (args) => (
    <CardCarousel {...args} />
);
Basic.args = { ...defaultArgs };
