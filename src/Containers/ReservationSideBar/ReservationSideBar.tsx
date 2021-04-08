import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Select from '@Inputs/Select/Select';
import Button from '../../Inputs/Button/Button';

export interface IReservationSideBar {
    ReservationList: Array<IReservationList>;
    WaitingRoomList: Array<IWaitingRoomList>;
    AvailableRoomsList: Array<string>;
}

type getReservationInformation = (
    array: Array<IReservationList>,
) => JSX.Element[];
type getWaitingRoomInformation = (
    array: Array<IWaitingRoomList>,
) => JSX.Element[];
type getAvailableRoomInformation = (array: Array<string>) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
type getOccupancyColorType = (occupancyStatus: occupancyStatusTypes) => string;

export interface IReservationList {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * The Time of the Reservation
     */
    time: string;
    /**
     * The size of the party
     */
    partySize: number;
}

export interface IWaitingRoomList {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The size of the party
     */
    partySize: number;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * How long they have been on the wait list
     */
    time: string;
}

/**
 * Primary UI component for user interaction
 * ReservationSideBar
 */
export const ReservationSideBar: React.FC<IReservationSideBar> = ({
    ReservationList = [],
    WaitingRoomList = [],
    AvailableRoomsList = [],
    ...props
}) => {
    const [activeToggleView, setActiveToggleView] = useState('Reservation');
    const [room, setRoom] = useState('');

    /**
     * This uses the useState to change the activeToggleView to "Reservation"
     * which is used to change which data is displayed, the people with reservations
     * or the people on the waiting list
     */
    const onClickReservationSwitch = () => {
        setActiveToggleView('Reservation');
    };

    /**
     * This uses the useState to change the activeToggleView to "Waiting"
     * * which is used to change which data is displayed, the people with reservations
     * or the people on the waiting list.
     */
    const onClickWaitingRoomSwitch = () => {
        setActiveToggleView('Waiting');
    };

    /**
     * This is the onClick() function for the +WaitingList button
     */
    const onClickAddToWaitingRoomList = () => {
        console.log('+ Waiting Room Button has been Hit');
    };

    /**
     * This method is the +Reservation button
     */
    const onClickAddToReservationList = () => {
        console.log('+ Reservation Button has been Hit');
    };

    /**
     * Returns a JSX element for the content of the ReservationSideBar
     *  when it accepts the current state of the activeToggleView and depending
     *  on the state will return the correct JSX element.
     *  @param displaySelected  is the current state of the ToggleView
     * @returns {JSX.Element} the correct JSX.Element for the ReservationSideBar
     * */
    const toggleReservationAndWaitingRoomInfo = (displaySelected: string) => {
        switch (displaySelected) {
        case 'Reservation':
            return getReservationInformation(ReservationList);
        case 'Waiting':
            return getWaitingRoomInformation(WaitingRoomList);
        default:
            return <div />;
        }
    };

    /**
     * Returns a JSX element for the content of the StylesForReservationButton
     *  when it accepts the current state of the activeToggleView and depending
     *  on the state will return the correct JSX element.
     *  @param displaySelected is the current state of the ToggleView
     * @returns {JSX.Element} the correct JSX.Element for the StylesForReservationButton
     * */
    const toggleButtonDisplay = (displaySelected: string) => {
        switch (displaySelected) {
        case 'Reservation':
            return (
                <StylesForReservationButton
                    primary
                    onClick={onClickAddToReservationList}
                >
                    + Reservation
                </StylesForReservationButton>
            );
        case 'Waiting':
            return (
                <StylesForReservationButton
                    primary
                    onClick={onClickAddToWaitingRoomList}
                >
                    + Waiting List
                </StylesForReservationButton>
            );
        default:
            return <div />;
        }
    };

    /**
     * Returns a JSX element for the content of the WaitingRoom part of the ReservationSideBar
     *  when it accepts the WaitingRoomList prop and will create and return the correct JSX element.
     *  @param waitingRoomInfo is the WaitingRoomList Array
     * @returns {JSX.Element} the correct JSX.Element for the WaitingRoom part of the ReservationSideBar
     * */
    const getWaitingRoomInformation: getWaitingRoomInformation = (
        waitingRoomInfo,
    ) =>
        waitingRoomInfo.map((i: IWaitingRoomList) => (
            <Container>
                <TableBorder occupancyStatus={i.occupancyStatus}>
                    <TableIDFont>{i.tableID}</TableIDFont>
                </TableBorder>
                <InformationContainer>
                    <TableInformation>
                        {`Party of ${i.partySize} at ${i.time}`}
                    </TableInformation>
                    <TableInformation>{i.partyName}</TableInformation>
                </InformationContainer>
            </Container>
        ));

    /**
     * Returns a JSX element for the content of the reservation part of the ReservationSideBar
     *  when it accepts the ListOfReservations prop and will create and return the correct JSX element.
     *  @param reservations is the prop ReservationList
     * @returns {JSX.Element} the correct JSX.Element for the reservation part of the ReservationSideBar
     * */
    const getReservationInformation: getReservationInformation = (
        reservations,
    ) =>
        reservations.map((i: IReservationList) => (
            <Container>
                <TableBorder occupancyStatus={i.occupancyStatus}>
                    <TableIDFont>{i.tableID}</TableIDFont>
                </TableBorder>
                <InformationContainer>
                    <TableInformation>
                        <ChangeColorToOccupancyStatus
                            occupancyStatus={i.occupancyStatus}
                        >
                            {i.occupancyStatus}
                        </ChangeColorToOccupancyStatus>
                        {`${i.time} ${i.partyName}`}
                    </TableInformation>
                </InformationContainer>
            </Container>
        ));

    /**
     * Returns a JSX element for the content of the Select component.
     *  When it accepts the AvailableRoomsList prop it will create and return the correct JSX element.
     *  @param AllRooms is the prop AvailableRoomsList.
     * @returns {JSX.Element} the correct JSX.Element for the Select component.
     * */
    const getOptionsForSelect: getAvailableRoomInformation = (AllRooms) =>
        AllRooms.map((i: string) => (
            <option key={i} value={i}>
                {i}
            </option>
        ));

    return (
        <div {...props}>
            <SideToolBar>
                <TableHeading>Table</TableHeading>
                <SelectStyles>
                    <Select
                        placeholder="Select Room"
                        onChange={(e: React.ChangeEvent<any>) =>
                            setRoom(e.target.value)
                        }
                        name="rooms"
                        value={room}
                    >
                        {getOptionsForSelect(AvailableRoomsList)}
                    </Select>
                </SelectStyles>
                <ReservationWaitingRoomSwitch>
                    <ReservationSwitch
                        colors={activeToggleView}
                        onClick={onClickReservationSwitch}
                    >
                        Reservation
                    </ReservationSwitch>
                    <WaitingRoomButton
                        colors={activeToggleView}
                        onClick={onClickWaitingRoomSwitch}
                    >
                        Waiting
                    </WaitingRoomButton>
                </ReservationWaitingRoomSwitch>
                <ContainerForCustomerInfo>
                    {toggleReservationAndWaitingRoomInfo(activeToggleView)}
                </ContainerForCustomerInfo>
                <ContainerForButton>
                    {toggleButtonDisplay(activeToggleView)}
                </ContainerForButton>
            </SideToolBar>
        </div>
    );
};

export default ReservationSideBar;

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

/**
 * Styled Components
 */

const Container = styled.div`
    height: 50px;
    padding-top: 10px;
    align-items: center;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.chairTableBackground};
`;
const SelectStyles = styled.div`
    width: 80%;
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
`;

const TableHeading = styled.h2`
    margin-left: 30px;
    font-family: Quicksand;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 35px;
`;

const InformationContainer = styled.div`
    width: 170px;
    margin-left: 5px;
    display: inline-block;
`;

const TableIDFont = styled.div`
    width: 39px;
    height: 40px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${({ theme }) => theme.colors.background};
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
    display: inline-block;
`;

interface IChangeColorToOccupancyStatus {
    occupancyStatus: occupancyStatusTypes;
}

const ChangeColorToOccupancyStatus = styled.div<IChangeColorToOccupancyStatus>`
    color: ${({ occupancyStatus }) => getOccupancyColor(occupancyStatus)};
`;

const TableInformation = styled.div`
    width: 170px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    align-items: center;
`;

const ReservationWaitingRoomSwitch = styled.div`
    width: 298px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContainerForButton = styled.div`
    width: 298px;
    align-content: center;
    margin-top: 10px;
`;

const StylesForReservationButton = styled(Button)`
    margin-left: auto;
    margin-right: auto;
`;

const ContainerForCustomerInfo = styled.div`
    width: 300px;
    height: 485px;
    overflow-y: auto;
`;

const SideToolBar = styled.div`
    width: 299px;
    height: 754px;
    border: 1px solid ${({ theme }) => theme.colors.chairTableEditBackground};
`;

interface IReservationSwitch {
    colors: string;
}

const ReservationSwitch = styled.button<IReservationSwitch>`
    width: 148px;
    height: 50px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    ${({ colors, theme }) =>
        `background-color: ${
            colors === 'Reservation'
                ? theme.colors.statusColors.red
                : theme.colors.background
        };
             color: ${
    colors === 'Reservation'
        ? theme.colors.background
        : theme.colors.statusColors.red
};
            `}
    border: none;
`;

interface IWaitingRoomButton {
    colors: string;
}

const WaitingRoomButton = styled.button<IWaitingRoomButton>`
    width: 147px;
    height: 50px;
    float: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    ${({ colors, theme }) =>
        `background-color: ${
            colors === 'Waiting'
                ? theme.colors.statusColors.red
                : theme.colors.background
        };
             color: ${
    colors === 'Waiting'
        ? theme.colors.background
        : theme.colors.statusColors.red
};
            `}
    border: none;
`;
