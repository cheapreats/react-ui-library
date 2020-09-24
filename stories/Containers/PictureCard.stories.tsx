import React from 'react';
import { storiesOf } from '@storybook/react';
import { PictureCard, PictureCardProps, Paragraph, SmallText } from '../../src';
import { Dog } from '@styled-icons/fa-solid/Dog';
import { Cat } from '@styled-icons/fa-solid/Cat';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('Picture Card'),
    component: PictureCard,
    args: {
        image: 'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif',
        tags: [
            { icon: Dog, text: 'Dog' },
            { icon: Cat, text: 'hmm?' },
        ],
        borderRadiusTop: '25px',
        borderRadiusBottom: '0px',
        alt: 'coding Dog',
    },
} as Meta;

export const Basic: Story<PictureCardProps> = (args) => (
    <PictureCard {...args} width="400px" height="200px" />
);
