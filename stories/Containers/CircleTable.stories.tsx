import React from 'react';

import { CircleTable } from './circleTable';

export default {
    title: 'Component/circleTable',
    component:  CircleTable,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

const Template = (args) => <CircleTable {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tableID: "T4",
    numOfChairs:4,
    partyName:"Scott",
    reservationTime:new Date(2020,10,15,16,30,0,0),
    occupancyStatus:"Reserved"
};

