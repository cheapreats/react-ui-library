import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DeliveryRadius, IDeliveryRadiusProps, DistanceUnit } from './DeliveryRadius';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Delivery Radius'),
    component: DeliveryRadius,
    args:{
        title:'Delivery Radius',
        description:'Set your Delivery Radius, for how far away you would like the delivery option to be available for your customers',
        componentWidth:600,
        leftMarkContent:'No Delivery',
        rightMarkContent:'Unlimited',
        unit: DistanceUnit.km,
        mapCoordinates:{lat:37.773972,lng:-122.431297},
        mapZoom:12,
        sliderProps:{
            min:0,
            max:8
        }
    },
} as Meta;

export const Basic: Story<IDeliveryRadiusProps> = (args) => <DeliveryRadius {...args} />;