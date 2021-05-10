import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Card from '@Containers/Card/Card';
import Select from '@Inputs/Select/Select';
import {
    FaUserFriends,
    FaChair,
    FaRegClock,
    FaRegTimesCircle,
} from 'react-icons/fa';
import { IReservationList, IWaitingRoomList } from '@Containers';
import Button from '@Inputs/Button/Button';

type getReservationInformation = (
    array: Array<getSeatingInfoTypes>,
) => JSX.Element[];
type getOccupancyInformation = (
    array: Array<occupancyStatusTypes>,
) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
type getOccupancyColorType = (occupancyStatus: occupancyStatusTypes) => string;
type getSeatingInfoTypes = IReservationList | IWaitingRoomList;

export interface ISeatingInfoInput {
    occupancyStatusList: Array<occupancyStatusTypes>;
    allRooms: Array<string>;
    availableSeatingInfo: Array<getSeatingInfoTypes>;
    listToAdd: string;
    onSeatCustomerClick: () => void;
    onAddToWaitListClick: () => void;
    onEndReservationClick: () => void;
    onBackButtonClick: () => void;
}

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
    allRooms = ['Bed Room', 'New Room', 'Classic Room'],
    listToAdd = 'reservation',
    onSeatCustomerClick,
    onBackButtonClick,
    onAddToWaitListClick,
    onEndReservationClick,
    ...props
}) => {
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('Reserved');

    const getReservationInformation: getReservationInformation = (
        reservations,
    ) => {
        const newArray = reservations.filter(
            (i: getSeatingInfoTypes) => i.occupancyStatus === status,
        );
        return newArray.map((i: getSeatingInfoTypes) => (
            <Container>
                <DisplayFlex>
                    <PartySizeWidth>
                        <AlignVertically>
                            <FaUserFriends />
                            {i.partySize}
                        </AlignVertically>
                    </PartySizeWidth>
                    <TableIdAndRoomWidth>
                        <TableBorder occupancyStatus={i.occupancyStatus}>
                            <TableIDFont>{i.tableID}</TableIDFont>
                            <ChangeColorToOccupancyStatus
                                occupancyStatus={i.occupancyStatus}
                            >
                                {i.occupancyStatus}
                            </ChangeColorToOccupancyStatus>
                        </TableBorder>
                    </TableIdAndRoomWidth>
                </DisplayFlex>
                <hr />
            </Container>
        ));
    };

    const getOptionsForOccupancyStatus: getOccupancyInformation = (
        AllLocations: Array<occupancyStatusTypes>,
    ) =>
        AllLocations.map((i: occupancyStatusTypes) => (
            <option key={i} value={i}>
                {i}
            </option>
        ));

    const getOptionsForLocationsList: (
        AllStatus: Array<string>,
    ) => JSX.Element[] = (AllStatus: Array<string>) =>
        AllStatus.map((i: string) => (
            <option key={i} value={i}>
                {i}
            </option>
        ));

    return (
        <WidthForCard>
            <DisplayFlex>
                <strong>Back</strong>
                <StylesForFaXIcon onClick={onBackButtonClick} />
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
                    <FaChair />
                </StylesForThreeButtons>
                <StylesForThreeButtons onClick={onAddToWaitListClick} primary>
                    <FaRegClock />
                </StylesForThreeButtons>
                <StylesForThreeButtons onClick={onEndReservationClick} primary>
                    {' '}
                    <FaRegTimesCircle />
                </StylesForThreeButtons>
            </DisplayFlex>
        </WidthForCard>
    );
};

export default SeatingInfoInput;

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

const WidthForCard = styled(Card)`
    width: 358px;
    height: 576px;
`;

const DisplayFlex = styled.div`
    display: flex;
`;

const StylesForFaXIcon = styled(FaRegTimesCircle)`
    margin-left: auto;
    margin-right: 0;
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
