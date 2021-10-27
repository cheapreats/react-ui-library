import {Meta, Story} from "@storybook/react";
import {createStoryTitle} from "../../Constants";
import {IOvalTable, OvalTable} from "@Containers/OvalTable/OvalTable";
import React from "react";

export default {
    title: createStoryTitle('OvalTable'),
    component: OvalTable,
} as Meta;

const Template: Story<IOvalTable> = (args) => <OvalTable {...args} />;

/**
 * Prints the Selected Child index to the console when Chair is clicked
 * @param tableIndex
 * @param chairIndex
 * @param selectedTableIndex
 */
const handleOnChairClick = (
    tableIndex: number,
    chairIndex: number,
    selectedTableIndex: number,
) => {
    console.log(
        `Table: ${tableIndex} Chair: ${chairIndex} SelectedTable: ${selectedTableIndex}`,
    );
};

export const OvalTableTest = Template.bind({});
OvalTableTest.args = {
    tableShape: 'Oval',
    tableID: 'T1',
    partyName: 'Yurii',
    chairs: [
        {
            position: 'top',
            isSeated: false,
            occupiedBy: 'Scott',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Dean',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
            chairIndex: 0,
            tableIndex: 0,
            selectedIndex: 3,
            onChairClick: handleOnChairClick,
        },
    ],
    relativeSize: 0.5,
};