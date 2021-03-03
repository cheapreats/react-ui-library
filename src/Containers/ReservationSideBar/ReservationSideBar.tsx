import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../Inputs/Button/Button';

export interface IReservationSideBar {
    listOfReservations: Array<ITableReservation>;
    WaitingRoomList: Array<IWaitingRoomList>;
}

type getReservationInformation = (
    array: Array<ITableReservation>,
) => JSX.Element[];
type getWaitingRoomInformation = (
    array: Array<IWaitingRoomList>,
) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';

export interface ITableReservation {
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
     * How long they have been on the wait list
     */
    time: string;
}

/**
 * Primary UI component for user interaction
 * ReservationSideBar
 */
export const ReservationSideBar: React.FC<IReservationSideBar> = ({
    listOfReservations = [],
    WaitingRoomList = [],
    ...props
}) => {
    const [activeToggleView, setActiveToggleView] = useState('Reservation');

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
     * Returns a JSX element for the content of the ReservationSideBar
     *  when it accepts the current state of the activeToggleView and depending
     *  on the state will return the correct JSX element.
     * @returns {JSX.Element} the correct JSX.Element for the ReservationSideBar
     * */
    const toggleReservationAndWaitingRoomInfo = (displaySelected: string) => {
        switch (displaySelected) {
            case 'Reservation':
                return getReservationInformation(listOfReservations);
            case 'Waiting':
                return getWaitingRoomInformataion(WaitingRoomList);
            default:
                return <div />;
        }
    };

    /**
     * Returns a JSX element for the content of the StylesForReservationButton
     *  when it accepts the current state of the activeToggleView and depending
     *  on the state will return the correct JSX element.
     * @returns {JSX.Element} the correct JSX.Element for the StylesForReservationButton
     * */
    const toggleButtonDisplay = (displaySelected: string) => {
        switch (displaySelected) {
            case 'Reservation':
                return (
                    <StylesForReservationButton primary>
                        + Reservation
                    </StylesForReservationButton>
                );
            case 'Waiting':
                return (
                    <StylesForReservationButton primary>
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
     * @returns {JSX.Element} the correct JSX.Element for the WaitingRoom part of the ReservationSideBar
     * */
    const getWaitingRoomInformataion: getWaitingRoomInformation = (
        waitingRoomInfo,
    ) =>
        waitingRoomInfo.map((i: IWaitingRoomList) => (
            <Container>
                <TableBorder>
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
     * @returns {JSX.Element} the correct JSX.Element for the reservation part of the ReservationSideBar
     * */
    const getReservationInformation: getReservationInformation = (
        reservations,
    ) =>
        reservations.map((i: ITableReservation) => (
            <Container>
                <TableBorder>
                    <TableIDFont>{i.tableID}</TableIDFont>
                </TableBorder>
                <InformationContainer>
                    <TableInformation>
                        {`${i.occupancyStatus} ${i.time}`}
                    </TableInformation>
                    <TableInformation>{i.partyName}</TableInformation>
                </InformationContainer>
            </Container>
        ));

    return (
        <div {...props}>
            <SideToolBar>
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
 * Styled Components
 */

const Container = styled.div`
    height: 50px;
    padding-top: 10px;
    align-items: center;
    text-align: center;
    border: 1px solid #c4c4c4;
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
    color: #000000;
`;

const TableBorder = styled.div`
    width: 39px;
    height: 40px;
    background: #707070;
    border: 4px solid #17a2b8;
    box-sizing: border-box;
    border-radius: 11px;
    display: inline-block;
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
    border: 1px solid black;
`;

const ContainerForButton = styled.div`
    width: 298px;
    align-content: center;
    margin-top: 10px;
    bottom: 0%;
`;

const StylesForReservationButton = styled(Button)`
    margin-left: auto;
    margin-right: auto;
`;

const ContainerForCustomerInfo = styled.div`
    width: 300px;
    height: 460px;
    overflow-y: auto;
`;

const SideToolBar = styled.div`
    width: 299px;
    height: 580px;
    border: 1px solid #c4c4c4;
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
    background-color: ${({ colors }): string =>
        colors === 'Reservation' ? '#D50B1B' : '#FFFFFF'};
    color: ${({ colors }): string =>
        colors === 'Reservation' ? '#FFFFFF' : '#D50B1B'};
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
    background-color: ${({ colors }): string =>
        colors === 'Waiting' ? '#D50B1B' : '#FFFFFF'};
    color: ${({ colors }): string =>
        colors === 'Waiting' ? '#FFFFFF' : '#D50B1B'};
    border: none;
`;
