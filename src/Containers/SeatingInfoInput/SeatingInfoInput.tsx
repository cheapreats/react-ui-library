import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Card, IReservationList, IWaitingRoomList } from '@Containers';
import { Select, Button } from '@Inputs';
import { Close } from '@styled-icons/ionicons-sharp/Close';
import { PeopleOutline } from '@styled-icons/evaicons-outline/PeopleOutline';
import { Cancel } from '@styled-icons/material/Cancel';
import { ClockFill } from '@styled-icons/bootstrap/ClockFill';
import { Chair } from '@styled-icons/material/Chair';

type getReservationInformation = (
    array: Array<getSeatingInfoTypes>,
) => JSX.Element[] | JSX.Element;
type getOccupancyInformation = (
    array: Array<occupancyStatusTypes>,
) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
type getOccupancyColorType = (occupancyStatus: occupancyStatusTypes) => string;
type getSeatingInfoTypes = IReservationList | IWaitingRoomList;

export interface ISeatingInfoInput {
    /**
     * The array of occupancyStatus types
     */
    occupancyStatusList: Array<occupancyStatusTypes>;
    /**
     * The array of seatingInfoTypes
     */
    availableSeatingInfo: Array<getSeatingInfoTypes>;
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
}

/**
 * Primary UI component for user interaction
 * SeatingInfoInput
 */
export const SeatingInfoInput: React.FC<ISeatingInfoInput> = ({
    availableSeatingInfo = [
        {
            tableID: 'T1',
            partyName: 'Corey Taylor',
            occupancyStatus: 'Reserved',
            time: '4:00 PM',
            partySize: 5,
        },
    ],
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
    ...props
}) => {
    const [location, setLocation] = useState('All Locations');
    const [status, setStatus] = useState('Reserved');

    const getMappedReservationInformation: getReservationInformation = (
        reservations,
    ) =>
        reservations.map((i: getSeatingInfoTypes) => (
            <Container>
                <DisplayFlex>
                    <PartySizeWidth>
                        <PeopleOutlineStyles />
                        <AlignVertically>{i.partySize}</AlignVertically>
                    </PartySizeWidth>
                    <TableIdAndRoomWidth>
                        <TableBorder occupancyStatus={i.occupancyStatus}>
                            <TableIDFont>{i.tableID}</TableIDFont>
                        </TableBorder>
                        <ChangeColorToOccupancyStatus
                            occupancyStatus={i.occupancyStatus}
                        >
                            {i.location}
                        </ChangeColorToOccupancyStatus>
                    </TableIdAndRoomWidth>
                </DisplayFlex>
                <hr />
            </Container>
        ));

    /**
     * This returns a JSX element that the user wants based on the two switch tags
     * @param reservations - the Array of all reservation information
     */
    const getReservationInformation: getReservationInformation = (
        reservations,
    ) => {
        if (location === 'All Locations') {
            const newFilteredArray = reservations.filter(
                (i: getSeatingInfoTypes) => i.occupancyStatus === status,
            );
            return getMappedReservationInformation(newFilteredArray);
        }
        console.log(location);
        if (
            reservations.filter(
                (i: getSeatingInfoTypes) =>
                    i.occupancyStatus === status && i.location === location,
            ).length === 0
        ) {
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
        const newFilteredArray = reservations.filter(
            (i: getSeatingInfoTypes) =>
                i.occupancyStatus === status && i.location === location,
        );
        return getMappedReservationInformation(newFilteredArray);
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
        <WidthForCard>
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
                {getReservationInformation(availableSeatingInfo)}
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

const Container = styled.div`
    padding-top: 15px;
    align-items: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
`;
