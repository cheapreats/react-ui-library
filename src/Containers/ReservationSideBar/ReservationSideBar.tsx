import React, {useState} from 'react';
import styled from "styled-components";
import Button from '../../Inputs/Button/Button';

export interface IReservationSideBar {
    listOfTables: Array<ITableReservation>;
}

type getTableInformation = (array: Array<ITableReservation>) => JSX.Element[];

export interface ITableReservation{
    tableID: string,
    partyName : string,
    occupancyStatus : string,
    time: string,
    tableUse : string,
}

export const ReservationSideBar: React.FC<IReservationSideBar> = ({
    listOfTables=  [],
    ...props
}) => {

    const [colors, setColors] = useState("Reservation");

    function onClickReservationSwitch(){
        setColors("Reservation");
    }

    function onClickWaitingRoomSwitch(){
        setColors("Waiting");
    }

    const getReservationInformation: getTableInformation = (array) =>
        array.map((i: ITableReservation) => (
            <Container>
                <TableBorder>
                    <TableIDFont>
                        {i.tableID}
                    </TableIDFont>
                </TableBorder>
                <InformationContainer>
                    <TableInformation>
                        {`${i.occupancyStatus } ${ i.time}` }
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
                    <ReservationSwitch colors={colors} onClick={onClickReservationSwitch}>Reservation</ReservationSwitch>
                    <WaitingRoomButton colors={colors} onClick={onClickWaitingRoomSwitch}>Waiting</WaitingRoomButton>
                </ReservationWaitingRoomSwitch>
                {getReservationInformation(listOfTables)}
                <ContainerForButton>
                    <StylesForReservationButton primary>Reservation</StylesForReservationButton>
                </ContainerForButton>
            </SideToolBar>
        </div>
    );
}

export default ReservationSideBar;

const Container = styled.div`
    width: 85%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 5px;   
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
    width: 260px;
    height: 50px;
    border: 1px solid black;
`;

const ContainerForButton = styled.div`
    width: 260px;
    align-content: center;
    position: absolute;
    bottom: 10%;
`;

const StylesForReservationButton = styled(Button)`
    margin-left: auto;
    margin-right: auto;
`;

const SideToolBar = styled.div`
    width: 262px;
    height: 621px;
    background: #C4C4C4;
`;

interface IReservationSwitch {
    colors: string;
}

const ReservationSwitch = styled.button<IReservationSwitch>`
    width: 130px;
    height: 50px;
    font-family: Lato;
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
    width: 130px;
    height: 50px;
    float: right;
    font-family: Lato;
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