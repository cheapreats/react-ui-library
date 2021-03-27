import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NutritionFact, INutritionFactProps } from './NutritionFact';
import { createStoryTitle } from '../../Constants';
import Theme from '../../Themes/ThemeTemplate'

export default {
    title: createStoryTitle('NutritionFact'),
    component: NutritionFact,
    args:{
        entries:[     {
            type:'heading',
            entry:   
                {
                    label:'Nutrition Facts',
                    bold:true,
                    padding:'0 0 1px',
                    fontSize:Theme.font.size.h1,
                    separatorWidth:2,
                    ref:true,
                }
        },  {
            type:'heading',
            entry:   
                {
                    label:'Varied Servings Per Container',
                    padding:'0 0 1px',
                    fontSize:Theme.font.size.default,
                    separatorWidth:0,
                }
        }, {
            type:'heading',
            entry:   
                {
                    label:'Serving size',
                    secondLabel:'4 prunes (38g)',
                    bold:true,
                    padding:'0 0 1px',
                    fontSize:Theme.font.size.default,
                    separatorWidth:10,
                    justifyContent:'space-between',
                    editable:true,
                }
        }, {
            type:'heading',
            entry:   
                {
                    label:'Amount per serving',
                    bold:true,
                    padding:'0 0 1px',
                    separatorWidth:0,
                }
        }, {
            type:'heading',
            entry:   
                {
                    label:'Calories',
                    secondLabel:'90',
                    justifyContent:'space-between',
                    bold:true,
                    padding:'0 0 1px',
                    separatorWidth:4,
                    fontSize:Theme.font.size.h2,
                    editable:true,
                }
        }, {
            type:'heading',
            entry:   
                {
                    label:'% Daily Value*',
                    justifyContent:'flex-end',
                    bold:true,
                    padding:'0 0 1px',
                }
        },
        {
            type:'entry',
            entry:        {
                amount:0,
                dailyAmount:65,
                label:'Total Fat',
                unity:'g',
                bold:true,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:0,
                dailyAmount:20,
                label:'Saturated & Trans Fat',
                unity:'g',
                indentationNumber:1,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:0,
                dailyAmount:300,
                label:'Cholesterol',
                unity:'mg',
                bold:true,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:0,
                dailyAmount:2400,
                label:'Sodium',
                unity:'mg',
                bold:true,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:24,
                dailyAmount:300,
                label:'Total Carbohydrate',
                unity:'g',
                bold:true,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:3,
                dailyAmount:25,
                label:'Dietary Fiber',
                unity:'g',
                indentationNumber:1,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:14,
                dailyAmount:0,
                label:'Total Sugars',
                unity:'g',
                indentationNumber:1,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:0,
                dailyAmount:0,
                label:'Added Sugars',
                unity:'g',
                indentationNumber:2,
            }
        },
        {
            type:'entry',
            entry:        {
                amount:1,
                dailyAmount:0,
                label:'Protein',
                unity:'g',
                bold:true,
                separatorWidth:10
            }
        },
        {
            type:'entry',
            entry:{
                amount:0,
                dailyAmount:60,
                label:'Vitamin C',
                unity:'mg',
            }
        },
        {
            type:'entry',
            entry:{
                amount:0.4,
                dailyAmount:14,
                label:'Iron',
                unity:'mg',
                separatorWidth:4,
            }
        },{
            type:'heading',
            entry:{
                separatorWidth:0,
                label:'*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.',
                fontSize:'.6rem',
                delay:true,
            },
        },   
        ],
    },
} as Meta;

export const Basic: Story<INutritionFactProps> = (args) => <NutritionFact {...args} />;

export const EditMode = Basic.bind({});

EditMode.args = {
    ...EditMode.args,
    editMode:true,
};