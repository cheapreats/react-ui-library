import React from 'react';
import { SquareTable, ISquareTable } from '../../src/Containers/SquareTable';
import {Meta, Story} from "@storybook/react";
import { createStoryTitle } from '../Constants';


export default {
    title: createStoryTitle('SquareTable'),
    component: SquareTable,
} as Meta;

const Template: Story<ISquareTable> = (args) => <SquareTable {...args} />;

/**
 * Creates a list with 7 chairs for SquareTable component
 */
const chairProps:  Array<{position:string, isSeated: boolean, occupiedBy:string, key:number}>= [
    {position:"top", isSeated:true, occupiedBy:"Scott",key:1},
    {position:"top", isSeated:false, occupiedBy:"",key:2},
    {position:"left", isSeated:false, occupiedBy:"",key:3},
    {position:"left", isSeated:true, occupiedBy:"Corey",key:4},
    {position:"right", isSeated:true, occupiedBy:"Jack",key:5},
    {position:"bottom", isSeated:false, occupiedBy:"",key:7},
    {position:"bottom", isSeated:true, occupiedBy:"Sam",key:6}
];

/**
 *Creates a SquareTable component with 7 chairs
 */
export const SevenTopTable = Template.bind({});
SevenTopTable.args = {
    tableID: 'T1',
    partyName:'Dmytro',
    reservationTime:new Date(2020,10,15,16,30,0,0),
    occupancyStatus:'Vacant',
    chairs:chairProps

};






