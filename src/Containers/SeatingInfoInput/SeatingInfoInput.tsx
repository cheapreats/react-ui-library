import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Select from '@Inputs/Select/Select';
import Card from '@Containers/Card/Card';
import Button from '@Inputs/Button/Button';
import { Close } from '@styled-icons/ionicons-sharp/Close';
import { PeopleOutline } from '@styled-icons/evaicons-outline/PeopleOutline';
import { Cancel } from '@styled-icons/material/Cancel';
import { ClockFill } from '@styled-icons/bootstrap/ClockFill';
import { Chair } from '@styled-icons/material/Chair';
import { IDraggableTable } from '@Containers/EditDraggableCanvas/_DraggableTable';

type getTableInformation = (
    array: Array<IDraggableTable>,
) => JSX.Element[] | JSX.Element;
type getOccupancyInformation = (
    array: Array<occupancyStatusTypes>,
) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
type getOccupancyColorType = (occupancyStatus: occupancyStatusTypes) => string;

export interface ISeatingInfoInput {
    /**
     * The array of occupancyStatus types
     */
    occupancyStatusList: Array<occupancyStatusTypes>;
    /**
     * The array of seatingInfoTypes
     */
    availableSeatingInfo: Array<IDraggableTable>;
    /**
     * The array of all room names
     */
    allRooms: Array<string>;
    /**
     * Function to handle onClick event for the button with the FaChair icon
     */
    onSeatCustomerClick: () => void;
    /**
     * Function to handle onClick event for the button with the FaRegClock icon
     */
    onAddToWaitListClick: () => void;
    /**
     * Function to handle onClick event for the button with the FaRegTimesCircle icon
     */
    onEndReservationClick: () => void;
    /**
     * Function to handle onClick event for the button with the FaXIcon icon
     */
    onBackButtonClick: () => void;
    /**
     * Function the will handle the onClick event that handles the focus on table
     * @param arg0 The table information selected
     */
    onSelectCustomerClick: (arg0: IDraggableTable) => void;
}

/**
 * Primary UI component for user interaction
 * SeatingInfoInput
 */
export const SeatingInfoInput: React.FC<ISeatingInfoInput> = ({
    availableSeatingInfo = [],
    occupancyStatusList = ['Vacant', 'Reserved', 'Occupied'],
    allRooms = [
        'All Locations',
        'Kitchen',
        'New Room',
        'Classic Room',
        'Green Room',
    ],
    onSeatCustomerClick,
    onBackButtonClick,
    onAddToWaitListClick,
    onEndReservationClick,
    onSelectCustomerClick,
    ...props
}) => {
    const [location, setLocation] = useState('All Locations');
    const [status, setStatus] = useState('Reserved');

    /**
     * Takes the Array of DraggableTables and creates a JSX element that shows the information
     * @param arrayOfTables Array of DraggableTables
     */
    const getMappedTableInformation: getTableInformation = (arrayOfTables) =>
        arrayOfTables.map((i: IDraggableTable) => (
            <Container onClick={() => onSelectCustomerClick(i)}>
                <DisplayFlex>
                    <PartySizeWidth>
                        <PeopleOutlineStyles />
                        <AlignVertically>
                            {i.tableInput.tableID}
                        </AlignVertically>
                    </PartySizeWidth>
                    <TableIdAndRoomWidth>
                        <TableBorder
                            occupancyStatus={i.tableInput.occupancyStatus}
                        >
                            <TableIDFont>{i.tableInput.tableID}</TableIDFont>
                        </TableBorder>
                        <ChangeColorToOccupancyStatus
                            occupancyStatus={i.tableInput.occupancyStatus}
                        >
                            {i.layoutName}
                        </ChangeColorToOccupancyStatus>
                    </TableIdAndRoomWidth>
                </DisplayFlex>
            </Container>
        ));

    /**
     * This returns a JSX element that the user wants based on the two switch tags
     * @param arrayOfTables - the Array of all Table information
     */
    const getSeatedInformation: getTableInformation = (arrayOfTables) => {
        const lengthOfAvailableArray = arrayOfTables.filter(
            (i: IDraggableTable) =>
                i.tableInput.occupancyStatus === status &&
                i.layoutName === location,
        ).length;
        if (location === 'All Locations') {
            const newFilteredArray = arrayOfTables.filter(
                (i: IDraggableTable) => i.tableInput.occupancyStatus === status,
            );
            return getMappedTableInformation(newFilteredArray);
        }
        console.log(location);
        if (lengthOfAvailableArray === 0) {
            return (
                <MarginForNoInformation>
                    <StylesForNoVacanciesTop>
                        There are currently none available.
                    </StylesForNoVacanciesTop>
                    <StylesForNoVacanciesBot>
                        Please change your filters, or add customer to waiting
                        list.
                    </StylesForNoVacanciesBot>
                </MarginForNoInformation>
            );
        }
        const newFilteredArray = arrayOfTables.filter(
            (i: IDraggableTable) =>
                i.tableInput.occupancyStatus === status &&
                i.layoutName === location,
        );
        return getMappedTableInformation(newFilteredArray);
    };

    /**
     * Returns all options for the Select Component
     * @param AllStatus an array of all occupancy statuses
     */
    const getOptionsForOccupancyStatus: getOccupancyInformation = (
        AllStatus: Array<occupancyStatusTypes>,
    ) =>
        AllStatus.map((i: occupancyStatusTypes) => (
            <option key={i} value={i}>
                {i}
            </option>
        ));

    /**
     * Returns all options for the Select Component
     * @param AllLocations  an array of Strings for all names of the rooms
     */
    const getOptionsForLocationsList: (
        AllLocations: Array<string>,
    ) => JSX.Element[] = (AllLocations: Array<string>) =>
        AllLocations.map((i: string) => (
            <option key={i} value={i}>
                {i}
            </option>
        ));

    return (
        <WidthForCard {...props}>
            <DisplayFlex>
                <strong>Back</strong>
                <StylesForCloseIcon onClick={onBackButtonClick} />
            </DisplayFlex>
            <DisplayFlex>
                <WidthForSelectFields>
                    <Select
                        placeholder="All Locations"
                        onChange={(e: React.ChangeEvent<any>) =>
                            setLocation(e.target.value)
                        }
                        name="location"
                        value={location}
                    >
                        {getOptionsForLocationsList(allRooms)}
                    </Select>
                </WidthForSelectFields>
                <WidthForSelectFields>
                    <Select
                        placeholder="Select Status"
                        onChange={(e: React.ChangeEvent<any>) =>
                            setStatus(e.target.value)
                        }
                        name="reservationStatus"
                        value={status}
                    >
                        {getOptionsForOccupancyStatus(occupancyStatusList)}
                    </Select>
                </WidthForSelectFields>
            </DisplayFlex>
            <hr />
            <ContainerForCustomerInfo>
                {getSeatedInformation(availableSeatingInfo)}
            </ContainerForCustomerInfo>
            <DisplayFlex>
                <StylesForThreeButtons onClick={onSeatCustomerClick} primary>
                    <WidthForIcons>
                        <Chair />
                    </WidthForIcons>
                </StylesForThreeButtons>
                <StylesForThreeButtons onClick={onAddToWaitListClick} primary>
                    <WidthForIcons>
                        <ClockFill />
                    </WidthForIcons>
                </StylesForThreeButtons>
                <StylesForThreeButtons onClick={onEndReservationClick} primary>
                    <WidthForIcons>
                        <Cancel />
                    </WidthForIcons>
                </StylesForThreeButtons>
            </DisplayFlex>
        </WidthForCard>
    );
};

export default SeatingInfoInput;

/**
 * Styled Components
 */
const WidthForCard = styled(Card)`
    width: 358px;
    height: 576px;
`;

const Container = styled.button`
    margin-top: 10px;
    padding-top: 5px;
    width: 335px;
    text-align: center;
    margin-left: 15px;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    &:focus {
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
    }
`;

const WidthForIcons = styled.div`
    height: 24px;
    width: 24px;
`;

const PeopleOutlineStyles = styled(PeopleOutline)`
    width: 40px;
    height: 30px;
`;

const DisplayFlex = styled.div`
    display: flex;
`;

const StylesForCloseIcon = styled(Close)`
    margin-left: auto;
    margin-right: 0;
    height: 24px;
    width: 24px;
`;

const StylesForThreeButtons = styled(Button)`
    margin-left: auto;
    margin-right: auto;
    margin-top 10px;
    width: 70px;
    height: 50px;
`;
const WidthForSelectFields = styled.div`
    width: 150px;
    height: 38px;
    margin-left: auto;
    margin-right: auto;
    padding-top 1rem;
`;

const AlignVertically = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

interface ITableBorder {
    occupancyStatus: occupancyStatusTypes;
}

const TableBorder = styled.div<ITableBorder>`
    width: 39px;
    height: 40px;
    background: ${({ occupancyStatus }) => getOccupancyColor(occupancyStatus)};
    border: 4px solid
        ${({ occupancyStatus }) => getOccupancyColor(occupancyStatus)};
    box-sizing: border-box;
    border-radius: 11px;
    margin-left: auto;
    margin-right: auto;
`;

const PartySizeWidth = styled.div`
    width: 90px;
    height: 70px;
    font-size: 30px;
`;

const TableIdAndRoomWidth = styled.div`
    width: 150px;
    height: 70px;
    margin-left: auto;
    margin-right: 0;
`;

const TableIDFont = styled.div`
    height: 40px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
    align-items: center;
    text-align: center;
    margin-left: auto;
    margin-right: 0;
    color: ${({ theme }) => theme.colors.background};
`;

interface IChangeColorToOccupancyStatus {
    occupancyStatus: occupancyStatusTypes;
}

const ChangeColorToOccupancyStatus = styled.div<IChangeColorToOccupancyStatus>`
    color: ${({ occupancyStatus }) => getOccupancyColor(occupancyStatus)};
    font-size: 15px;
    width: 150px;
`;

/**
 * Determines the correct color based on occupancyStatus
 * and returns the hexadecimal color value as a string
 *
 * @param occupancyStatus - the occupancy status for the table
 * @return {string} - Hexadecimal color value
 */
const getOccupancyColor: getOccupancyColorType = (occupancyStatus) => {
    switch (occupancyStatus) {
        case 'Vacant':
            return useTheme().colors.occupancyStatusColors.Vacant;
        case 'Reserved':
            return useTheme().colors.occupancyStatusColors.Reserved;
        case 'Occupied':
            return useTheme().colors.occupancyStatusColors.Occupied;
        default:
            return '';
    }
};

const MarginForNoInformation = styled.div`
    margin-top: 3rem;
`;

const StylesForNoVacanciesTop = styled.div`
    width: 50%;
    font-size: xx-large;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;

const StylesForNoVacanciesBot = styled.div`
    margin-top: 1.5rem;
    font-size: x-large;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const ContainerForCustomerInfo = styled.div`
    height: 430px;
    overflow-y: auto;
`;
