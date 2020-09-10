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

const constants = { 
    TITLES: {
        HEADING: 'Hours of Operation Management',
        FIRST_MODAL_HEADER: 'Edit Store Hours and Categories',
        SECOND_MODAL_HEADER: 'Add Store Hours',
        THIRD_MODAL_HEADER: 'Add Categories',
        OPERATIONS: 'Current Hours of Operations for ',
        CHANGE_ACTIVE: 'Change the active category',
        CHANGE_ACTIVE_SUBTILTE: 'This will be the category of times shown to the customers',
        SELECT_A_DAY: 'Select a day',
        SELECT_A_CATEGORY: 'Select a category',
        ALL_CATEGORIES: 'Current Categories',
        ALL_CATEGORIES_SUBTITLE: 'Hover over and click the categories to delete them.'
    },
    BUTTONS: {
        EDIT: 'Edit',
        TOGGLE: 'Toggle AM/PM',
        ADD_HOURS: 'Add Hours',
        EDIT_CATEGORIES: 'Edit Categories',
        ADD_CATEGORY: 'Add Category',
        SET_ACTIVE: 'Set As Active'
    },
    ERRORS: {
        ONE_ACTIVE_CATEGORY: 'You must have at least one category at all times.',
        CANNOT_DELETE_ACTIVE_CATEGORY: 'You cannot delete an active category.',
        ONLY_ONE_TIME: 'You cannot add more than one time per day.',
        FROM_TIME_TOO_BIG: 'The from time has to be earlier than the to time.'
    },
    SUCCESS: {
        CATEGORY_CREATED: 'Category has been sucessfully created.'
    }
};

storiesOf('StoreHoursList', module)
    .add('with default', () => (
        <StoreHoursList
            allCategories={sampleCategories}
            constants={constants}
            />
    ));