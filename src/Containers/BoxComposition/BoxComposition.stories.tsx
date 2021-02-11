import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BoxComposition, IBoxCompositionProps } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('BoxComposition'),
    component: BoxComposition,
    args: {
        data:[{
            main:{
                imgSource:'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210204090136-amanda-gorman-time-cover.jpg',
                top:0,
                left:75,
                width:100,
                height:200,
                text:'bla bla bla',
                id:'0'
            },
            left:{
                imgSource:'https://pyxis.nymag.com/v1/imgs/427/8e3/50af665d01b7c7d4339dddc48682d37585-amanda-gorman.rsquare.w700.jpg',
                top:100,
                left:25,
                width:75,
                height:75,
                text:'',
                id:'1'
            },
            right:{
                imgSource:'https://s.abcnews.com/images/Sports/super-bowl-lv-amanda-gorman-01-gty-iwb-210207_1612747303779_hpMain_16x9_992.jpg',
                top:25,
                left:150,
                width:75,
                height:75,
                text:'',
                id:'2'
            },
        },
        {
            main:{
                imgSource:'https://images.ctfassets.net/p0qf7j048i0q/78C630D510E24278844AD6F374E95D3F/ab3f833bbe671b45907a3d0cb6484af6/071818_Amanda_Gorman_Youth_Poet_Laureate_Has_Speech_and_Auditory_Processing_Issues.jpg?w=1000&h=750&fit=fill&fm=webp',
                top:0,
                left:75,
                width:100,
                height:200,
                text:'bla bla bla',
                id:'0'
            },
            left:{
                imgSource:'https://static01.nyt.com/images/2017/11/05/fashion/05UPNEXT/05UPNEXT-superJumbo.jpg?quality=90&auto=webp',
                top:100,
                left:25,
                width:75,
                height:75,
                text:'',
                id:'1'
            },
            right:{
                imgSource:'https://api.timeforkids.com/wp-content/uploads/2018/04/gorman-050418.jpg',
                top:25,
                left:150,
                width:75,
                height:75,
                text:'',
                id:'2'
            },
        },
        ],
    }
    ,
} as Meta;

export const Basic: Story<IBoxCompositionProps> = (args) => (
    <BoxComposition {...args} />
);