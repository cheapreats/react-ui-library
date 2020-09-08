import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoreHoursList } from '../../src';

const sampleCategories = [
    {
        category: 'Winter',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    },
    {
        category: 'Summer',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        } 
    },
    {
        category: 'Holidays',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    }
];

const sampleActiveCategorySchedule = {
    category: 'Winter',
    hoursByDay: {
        monday: [                    
            {
                from: '12:00',
                to: '20:00'
            }],
        tuesday: [], 
        wednesday: [], 
        thursday: [
            {
                from: '12:00',
                to: '20:00'
            }
        ], 
        friday: [], 
        saturday: [], 
        sunday: [] 
    }
};

storiesOf('StoreHoursList', module)
    .add('with default', () => (
        <StoreHoursList
            allCategories={sampleCategories}
            oneCategorySchedule={sampleActiveCategorySchedule}
            />
    ))