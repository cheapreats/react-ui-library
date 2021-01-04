import React from 'react';
import { Meta, Story,  } from '@storybook/react';
import { LocationFinder, LocationFinderProps } from './LocationFinder';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Location Finder'),
    component: LocationFinder,
    args: {
        locationPlaceholder: 'Find My Location',
    },
} as Meta;

export const Basic: Story<LocationFinderProps> = (args) => <LocationFinder {...args} />
   
