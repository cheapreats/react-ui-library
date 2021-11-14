import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Select from '@Inputs/Select/Select';
import Button from '@Inputs/Button/Button';

export interface IReservationSideBar {
    SeatedList: Array<ISeatedList>;
    WaitingRoomList: Array<IWaitingRoomList>;
    UpcomingList: Array<IUpComingList>;
    AvailableRoomsList: Array<string>;
    onAddReservationButtonClick: () => void;
    onAddWaitingButtonClick: () => void;
    onAddNewCustomerClick: () => void;
    onSeatCustomer: () => void;
}

type getSeatedInformation = (array: Array<ISeatedList>) => JSX.Element[];
type getWaitingRoomInformation = (
    array: Array<IWaitingRoomList>,
) => JSX.Element[];
type getUpComingInformation = (array: Array<IUpComingList>) => JSX.Element[];

type getAvailableRoomInformation = (array: Array<string>) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
type getOccupancyColorType = (occupancyStatus: occupancyStatusTypes) => string;

export interface IUpComingList {
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
    /**
     * The room the table should be located
     */
    layoutName?: string;
}

export interface ISeatedList {
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
    /**
     * The room the table should be located
     */
    layoutName?: string;
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
    /**
     * The room the table should be located
     */
    layoutName?: string;
}

/**
 * Primary UI component for user interaction
 * ReservationSideBar
 */
export const ReservationSideBar: React.FC<IReservationSideBar> = ({
    SeatedList = [],
    WaitingRoomList = [],
    UpcomingList = [],
    AvailableRoomsList = [],
    onSeatCustomer,
    onAddReservationButtonClick,
    onAddWaitingButtonClick,
    onAddNewCustomerClick,
    ...props
}) => {
    const [activeToggleView, setActiveToggleView] = useState('');
    const [room, setRoom] = useState('');

    /**
     * This uses the useState to change the activeToggleView to "Reservation"
     * which is used to change which data is displayed, the people with reservations
     * or the people on the waiting list
     */
    const onClickSeatedSwitch = () => {
        setActiveToggleView('Seated');
    };

    /**
     * This uses the useState to change the activeToggleView to "Waiting"
     * * which is used to change which data is displayed, the people with reservations
     * or the people on the waiting list.
     */
    const onClickWaitingRoomSwitch = () => {
        setActiveToggleView('Waiting');
    };

    const onClickUpComingSwitch = () => {
        setActiveToggleView('UpComing');
    };

    /**
     * Returns a JSX element for the content of the ReservationSideBar
     *  when it accepts the current state of the activeToggleView and depending
     *  on the state will return the correct JSX element.
     *  @param displaySelected  is the current state of the ToggleView
     * @returns {JSX.Element} the correct JSX.Element for the ReservationSideBar
     * */
    const toggleForTableInfo = (displaySelected: string) => {
        switch (displaySelected) {
            case 'Seated':
                return getSeatedPartyInformation(SeatedList);
            case 'Waiting':
                return getWaitingRoomPartyInformation(WaitingRoomList);
            case 'UpComing':
                return getUpComingPartyInformation(UpcomingList);
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
            case 'Seated':
                return (
                    <StylesForButtons
                        primary
                        onClick={onAddReservationButtonClick}
                    >
                        + Seated
                    </StylesForButtons>
                );
            case 'Waiting':
                return (
                    <StylesForButtons primary onClick={onAddWaitingButtonClick}>
                        + Waiting List
                    </StylesForButtons>
                );
            case 'UpComing':
                return (
                    <StylesForButtons primary onClick={onAddWaitingButtonClick}>
                        + UpComing List
                    </StylesForButtons>
                );
            default:
                return (
                    <StylesForButtons primary onClick={onAddNewCustomerClick}>
                        Add New Customer
                    </StylesForButtons>
                );
        }
    };

    /**
     * Returns a JSX element for the content of the WaitingRoom part of the ReservationSideBar
     *  when it accepts the WaitingRoomList prop and will create and return the correct JSX element.
     *  @param waitingRoomInfo is the WaitingRoomList Array
     * @returns {JSX.Element} the correct JSX.Element for the WaitingRoom part of the ReservationSideBar
     * */
    const getWaitingRoomPartyInformation: getWaitingRoomInformation = (
        waitingRoomInfo,
    ) =>
        waitingRoomInfo.map((i: IWaitingRoomList) => (
            <Container onClick={onSeatCustomer}>
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
     * Returns a JSX element for the content of the UpComing part of the ReservationSideBar
     *  when it accepts the ListOfReservations prop and will create and return the correct JSX element.
     *  @param UpComing is the prop ReservationList
     * @returns {JSX.Element} the correct JSX.Element for the UpComing part of the ReservationSideBar
     * */
    const getUpComingPartyInformation: getUpComingInformation = (UpComing) =>
        UpComing.map((i: IUpComingList) => (
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
     * Returns a JSX element for the content of the Seated part of the ReservationSideBar
     *  when it accepts the ListOfReservations prop and will create and return the correct JSX element.
     *  @param arrayOfSeated is the prop ReservationList
     * @returns {JSX.Element} the correct JSX.Element for the Seated part of the ReservationSideBar
     * */
    const getSeatedPartyInformation: getSeatedInformation = (arrayOfSeated) =>
        arrayOfSeated.map((i: ISeatedList) => (
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
                <SwitchFor3Arrays>
                    <SeatedSwitch
                        colors={activeToggleView}
                        onClick={onClickSeatedSwitch}
                    >
                        Seated
                    </SeatedSwitch>
                    <WaitingRoomButton
                        colors={activeToggleView}
                        onClick={onClickWaitingRoomSwitch}
                    >
                        Waiting
                    </WaitingRoomButton>
                    <UpComingSwitch
                        colors={activeToggleView}
                        onClick={onClickUpComingSwitch}
                    >
                        UpComing
                    </UpComingSwitch>
                </SwitchFor3Arrays>
                <ContainerForCustomerInfo>
                    {toggleForTableInfo(activeToggleView)}
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

const SwitchFor3Arrays = styled.div`
    width: 298px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContainerForButton = styled.div`
    width: 298px;
    align-content: center;
    margin-top: 10px;
`;

const StylesForButtons = styled(Button)`
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

interface IUpComingSwitch {
    colors: string;
}

const UpComingSwitch = styled.button<IUpComingSwitch>`
    width: 100px;
    height: 50px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    ${({ colors, theme }) =>
        `background-color: ${
            colors === 'UpComing'
                ? theme.colors.statusColors.red
                : theme.colors.background
        };
                 color: ${
                     colors === 'UpComing'
                         ? theme.colors.background
                         : theme.colors.statusColors.red
                 };
    `}
`;

interface ISeatedSwitch {
    colors: string;
}

const SeatedSwitch = styled.button<ISeatedSwitch>`
    width: 100px;
    height: 50px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    ${({ colors, theme }) =>
        `background-color: ${
            colors === 'Seated'
                ? theme.colors.statusColors.red
                : theme.colors.background
        };
    color: ${
        colors === 'Seated'
            ? theme.colors.background
            : theme.colors.statusColors.red
    };
   `}
`;

interface IWaitingRoomButton {
    colors: string;
}

const WaitingRoomButton = styled.button<IWaitingRoomButton>`
    width: 98px;
    height: 50px;
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
`;
