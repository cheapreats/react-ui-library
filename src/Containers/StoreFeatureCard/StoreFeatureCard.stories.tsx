import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Dog } from '@styled-icons/fa-solid/Dog';
import { Cat } from '@styled-icons/fa-solid/Cat';

import { StoreFeatureCard, StoreFeatureCardProps } from '../../index';

export default {
    title: 'Components/Store Feature Card',
    component: StoreFeatureCard,
    args: {
        linktitle: 'VISIT STORE',
        description: 'this is a Store Review Card',
        rating: '4',
        heading: 'Hot Dog',
        image: 'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif',
        tags: [
            { icon: Dog, text: 'Dog' },
            { icon: Cat, text: 'hmm?' },
        ],
    },
} as Meta;

export const Basic: Story<StoreFeatureCardProps> = (args) => (
    <StoreFeatureCard {...args} alt="coding Dog" width="400px" height="200px" />
);
