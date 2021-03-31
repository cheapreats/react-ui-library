import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    CarouselTestimonial,
    ICarouselTestimonialProps,
} from './CarouselTestimonial';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Carousel Testimonial'),
    component: CarouselTestimonial,
} as Meta;

const defaultArgs = {
    carouselTitle: 'Our customers love us on TrustPilot',
    carouselImage:
        'https://images.ctfassets.net/2d5q1td6cyxq/4eI7STmvwQ478Xhxnhwh4v/4c93a91efb4641907d2c8c2aafd67622/Trustpilot_Business__Collect_Customer_Service___Product_Reviews-6_1.svg',
    reviewDescriptions: [
        `"There is no monthly service fee and their debit and credit card fees are very low. Payments go through within seconds and you can issue a receipt by texting or emailing. My business is still small but my orders and sales have tripled in the last year alone just because of using Square and offering this to my customers."`,
        `"I have dealt with most of the credit card companies and I never knew until I got my monthly statement what my fees were going to be. With Square, I know with every transaction and every day what my fees are and they never change the rates and there is no additional cost. Best card services company I have ever used! Excellent!!!"`,
        `"I own a small boutique bakery and I have been using Square for almost 4 years now. It has made my work easier, faster and more professional. I love the app and all the features. Thank you for helping my small business grow."`,
        `"Square is consistent, never fails and is very cost effective. I can’t believe how effective this small unit can be and how convenient it is."`,
        `"I love the ease of use and user-friendliness of Square. I simply run my business, add my products as I receive them, and it keeps track of my inventory and sends my money directly to me quickly and with no need for me to intervene. It’s like having a very efficient personal assistant."`,
    ],
    reviewers: [
        'ANGELA LA BRIE, CANADA',
        'THE DRAGON’S LAIR UNLEASHED, HAMILTON, ON',
        'JENNY BAKES, VANCOUVER, BC',
        'RANVIR SANDHU CHIROPRACTIC, SURREY, BC',
        'JEANIE’S MARY KAY, MAPLE RIDGE, BC',
    ],
    carouselAutoplay: true,
    carouselInterval: 8000,
    carouselLoop: true,
};

export const Basic: Story<ICarouselTestimonialProps> = (args) => (
    <CarouselTestimonial {...args} />
);
Basic.args = { ...defaultArgs };
