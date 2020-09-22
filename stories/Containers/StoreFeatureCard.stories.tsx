import React from 'react';
import { StoreFeatureCard, StoreFeatureCardProps } from '../../src';
import { createStoryTitle, getCaptionForLocale } from '../Constants';
import { Meta, Story } from '@storybook/react';
import { Dog } from '@styled-icons/fa-solid/Dog';
import { Cat } from '@styled-icons/fa-solid/Cat';

export default {
    title: createStoryTitle('Store Feature Card'),
    component: StoreFeatureCard,
    args: {
        linktitle: "VISIT STORE",
        description: "this is a Store Review Card"
    },
} as Meta;

export const Basic: Story<StoreFeatureCardProps> = (args) => (
    <StoreFeatureCard {...args}         
    image="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif"
    tags={[{ icon: Dog, text: 'Dog' }, { icon: Cat, text: 'hmm?' }]}
    alt="coding Dog"
    width="400px"
    height="200px"
    rating="4"
    heading="Hot Dog"
    description="this is a Store Feature Card"/>
);