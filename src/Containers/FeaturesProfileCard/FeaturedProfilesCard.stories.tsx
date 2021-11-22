import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FeaturedProfilesCard, IFeaturedProfilesCardProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const profiles = [
    {
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
        initials: 'AC',
        id: 2345,
    },
    {
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        initials: 'BD',
        id: 6312,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5455,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'TY',
        id: 5765,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'ER',
        id: 5098,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'GC',
        id: 6355,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'YN',
        id: 7643,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'OY',
        id: 3984,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'MN',
        id: 1734,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 9034,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 9034,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 9034,
    },
    {
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 9034,
    },
];

export default {
    title: createStoryTitle('Featured Profiles Card'),
    component: FeaturedProfilesCard,
    args: {
        profileData: profiles,
        alt: 'Profile Image',
    },
} as Meta;

export const Demo: Story<IFeaturedProfilesCardProps> = (args) => (
    <FeaturedProfilesCard {...args} />
);
