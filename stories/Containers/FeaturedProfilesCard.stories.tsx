import React from 'react';
import { FeaturedProfilesCard, FeaturedProfilesCardProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

const profiles = [
    {
        image:
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
        initials: 'AC',
        id: 2345,
    },
    {
        image:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        initials: 'BD',
        id: 6312,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
    },
    {
        image:
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg',
        initials: 'CG',
        id: 5765,
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

export const Demo: Story<FeaturedProfilesCardProps> = (args) => (
    <FeaturedProfilesCard {...args}></FeaturedProfilesCard>
);
