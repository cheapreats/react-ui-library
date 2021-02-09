import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BoxComposition, IBoxCompositionProps } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('BoxComposition'),
    component: BoxComposition,
    args: {
        data:[
            {
                imgSource:'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210204090136-amanda-gorman-time-cover.jpg',
                top:0,
                left:75,
                width:100,
                height:200,
                withText:true,
                text:'bla bla bla',
                id:'0'
            },
            {
                imgSource:'https://pyxis.nymag.com/v1/imgs/427/8e3/50af665d01b7c7d4339dddc48682d37585-amanda-gorman.rsquare.w700.jpg',
                top:100,
                left:25,
                width:75,
                height:75,
                withText:false,
                id:'1'
            },
            {
                imgSource:'https://s.abcnews.com/images/Sports/super-bowl-lv-amanda-gorman-01-gty-iwb-210207_1612747303779_hpMain_16x9_992.jpg',
                top:25,
                left:150,
                width:75,
                height:75,
                withText:false,
                id:'2'
            },
        ],
    }
    ,
} as Meta;

export const Basic: Story<IBoxCompositionProps> = (args) => (
    <BoxComposition {...args} />
);