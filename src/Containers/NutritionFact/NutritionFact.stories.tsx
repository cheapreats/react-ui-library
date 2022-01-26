import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NutritionFact, INutritionFactProps, EntryType } from './NutritionFact';

import Theme from '../../Themes/ThemeTemplate';

export default {
    title: 'Components/Menu Item/NutritionFact',
    component: NutritionFact,
    args: {
        entries: [
            {
                type: EntryType.Heading,
                data: {
                    leftText: 'Nutrition Facts',
                    isBold: true,
                    padding: '0 0 1px',
                    fontSize: Theme.font.size.h1,
                    separatorWidth: 2,
                    isMaxWidthOfRootContainer: true,
                },
            },
            {
                type: EntryType.Heading,
                data: {
                    leftText: 'Varied Servings Per Container',
                    padding: '0 0 1px',
                    fontSize: Theme.font.size.default,
                    separatorWidth: 0,
                },
            },
            {
                type: EntryType.Heading,
                data: {
                    leftText: 'Serving size',
                    rightText: '4 prunes (38g)',
                    isBold: true,
                    padding: '0 0 1px',
                    fontSize: Theme.font.size.default,
                    separatorWidth: 10,
                    justifyContent: 'space-between',
                    isEditable: true,
                },
            },
            {
                type: EntryType.Heading,
                data: {
                    leftText: 'Amount per serving',
                    isBold: true,
                    padding: '0 0 1px',
                    separatorWidth: 0,
                },
            },
            {
                type: EntryType.Heading,
                data: {
                    leftText: 'Calories',
                    rightText: '90',
                    justifyContent: 'space-between',
                    isBold: true,
                    padding: '0 0 1px',
                    separatorWidth: 4,
                    fontSize: Theme.font.size.h2,
                    isEditable: true,
                },
            },
            {
                type: EntryType.Heading,
                data: {
                    leftText: '% Daily Value*',
                    justifyContent: 'flex-end',
                    isBold: true,
                    padding: '0 0 1px',
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0,
                    dailyAmount: 65,
                    label: 'Total Fat',
                    unity: 'g',
                    isBold: true,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0,
                    dailyAmount: 20,
                    label: 'Saturated & Trans Fat',
                    unity: 'g',
                    indentationNumber: 1,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0,
                    dailyAmount: 300,
                    label: 'Cholesterol',
                    unity: 'mg',
                    isBold: true,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0,
                    dailyAmount: 2400,
                    label: 'Sodium',
                    unity: 'mg',
                    isBold: true,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 24,
                    dailyAmount: 300,
                    label: 'Total Carbohydrate',
                    unity: 'g',
                    isBold: true,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 3,
                    dailyAmount: 25,
                    label: 'Dietary Fiber',
                    unity: 'g',
                    indentationNumber: 1,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 14,
                    dailyAmount: 0,
                    label: 'Total Sugars',
                    unity: 'g',
                    indentationNumber: 1,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0,
                    dailyAmount: 0,
                    label: 'Added Sugars',
                    unity: 'g',
                    indentationNumber: 2,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 1,
                    dailyAmount: 0,
                    label: 'Protein',
                    unity: 'g',
                    isBold: true,
                    separatorWidth: 10,
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0,
                    dailyAmount: 60,
                    label: 'Vitamin C',
                    unity: 'mg',
                },
            },
            {
                type: EntryType.Entry,
                data: {
                    amount: 0.4,
                    dailyAmount: 14,
                    label: 'Iron',
                    unity: 'mg',
                    separatorWidth: 4,
                },
            },
            {
                type: EntryType.Heading,
                data: {
                    separatorWidth: 0,
                    leftText:
                        '*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.',
                    fontSize: '.6rem',
                },
            },
        ],
    },
} as Meta;

export const Basic: Story<INutritionFactProps> = (args) => (
    <NutritionFact {...args} />
);

export const EditMode = Basic.bind({});

EditMode.args = {
    ...EditMode.args,
    isEditMode: true,
};
