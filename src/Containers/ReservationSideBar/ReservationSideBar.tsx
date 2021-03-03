import React, {useState} from 'react';
import styled from "styled-components";
import Button from '../../Inputs/Button/Button';

export interface IReservationSideBar {
    listOfReservations: Array<ITableReservation>;
    WaitingRoomList: Array<IWaitingRoomList>;
}

type getReservationInformation = (array: Array<ITableReservation>) => JSX.Element[];
type getWaitingRoomInformation = (array: Array<IWaitingRoomList>) => JSX.Element[];
type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';

export interface ITableReservation{
    tableID: string,
    partyName: string,
    occupancyStatus: occupancyStatusTypes,
    time: string,
    tableUse: string,
}

export interface IWaitingRoomList{
    tableID: string,
    partyName: string,
    partySize: number,
    time: string,
}

export const ReservationSideBar: React.FC<IReservationSideBar> = ({
    listOfReservations =  [],
    WaitingRoomList = [],
    ...props
}) => {

    const [activeToggleView, setActiveToggleView] = useState("Reservation");

    /**
     * This marks the ....
     */
    const onClickReservationSwitch = () => {
        setActiveToggleView("Reservation");
    }

    const onClickWaitingRoomSwitch = () => {
        setActiveToggleView("Waiting");
    }

    const toggleReservationAndWaitingRoomInfo = (displaySelected: string) => {
        switch(displaySelected){
        case 'Reservation':
            return getReservationInformation(listOfReservations);
        case 'Waiting':
            return getWaitingRoomInformataion(WaitingRoomList);
        default:
            return <div />;
        }
    }
    
    const toggleButtonDisplay = (displaySelected: string) => {
        switch(displaySelected){
        case 'Reservation':
            return(
                <StylesForReservationButton primary>+ Reservation</StylesForReservationButton>
            )
        case 'Waiting':
            return(
                <StylesForReservationButton primary>+ Waiting List</StylesForReservationButton>
            );
        default:
            return <div />;
        }
    }

    const getWaitingRoomInformataion: getWaitingRoomInformation = (waitingRoomInfo) =>
        waitingRoomInfo.map((i:IWaitingRoomList) => (
            <Container>
                <TableBorder>
                    <TableIDFont>
                        { i.tableID }
                    </TableIDFont>
                </TableBorder>
                <InformationContainer>
                    <TableInformation>
                        {`Party of ${i.partySize } at ${ i.time }` }
                    </TableInformation>
                    <TableInformation>
                        { i.partyName }
                    </TableInformation>
                </InformationContainer>
            </Container>
        ));
    
    const getReservationInformation: getReservationInformation = (reservations) =>
        reservations.map((i: ITableReservation) => (
            <Container>
                <TableBorder>
                    <TableIDFont>
                        { i.tableID }
                    </TableIDFont>
                </TableBorder>
                <InformationContainer>
                    <TableInformation>
                        {`${i.occupancyStatus } ${ i.time }` }
                    </TableInformation>
                    <TableInformation>
                        { i.partyName }
                    </TableInformation>
                </InformationContainer>
            </Container>
        ));

    return(
        <div {...props}>
            <SideToolBar>
                <ReservationWaitingRoomSwitch>
                    <ReservationSwitch colors={activeToggleView} onClick={onClickReservationSwitch}>Reservation</ReservationSwitch>
                    <WaitingRoomButton colors={activeToggleView} onClick={onClickWaitingRoomSwitch}>Waiting</WaitingRoomButton>
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
}

export default ReservationSideBar;

const Container = styled.div`
    height: 50px;
    padding-top: 10px;
    align-items: center;
    text-align: center;
    border: 1px solid #C4C4C4;
`;

const InformationContainer =styled.div`
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
    border: 4px solid #17A2B8;
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
    overflow-y: auto ;
`;

const SideToolBar = styled.div`
    width: 299px;
    height: 580px;
    border: 1px solid black;
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
    background-color: ${({colors}): string => (colors === 'Reservation' ? '#D50B1B': '#FFFFFF')};
    color: ${({colors}): string => (colors === 'Reservation' ? '#FFFFFF': '#D50B1B')};
    border: none;
`;

interface IWaitingRoomButton{
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
    background-color: ${({colors}): string => (colors === 'Waiting' ? '#D50B1B': '#FFFFFF')};
    color: ${({colors}): string => (colors === 'Waiting' ? '#FFFFFF': '#D50B1B')};
    border: none;
`;