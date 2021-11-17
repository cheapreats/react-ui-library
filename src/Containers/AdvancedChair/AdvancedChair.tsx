import React from 'react';
import styled from "styled-components";

type Position = 'top' | 'bottom' | 'left' | 'right';

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

export interface IAdvancedChair extends React.HTMLAttributes<HTMLDivElement> {
    position: Position;
    isSeated: boolean;
    occupiedBy: string;
    isVisible: boolean;
    relativeSize: number;
    tableUse: tableUseTypes;
    tableIndex: number;
    chairIndex: number;
    selectedIndex: number;
    chairColor: string;
    onChairClick: (
        parentTableIndex: number,
        chairIndex: number,
        selectedIndex: number,
    ) => void;
}

export const AdvancedChair: React.FC<IAdvancedChair> = ({
    position = 'top',
    isSeated = false,
    occupiedBy = '',
    isVisible = true,
    relativeSize = 1.0,
    tableUse = 'TableForManagement',
    tableIndex = -1,
    chairIndex = -1,
    selectedIndex = -1,
    chairColor = '#6495ED',
    onChairClick,
    ...props
}) => {
    return (
    <div{...props}>
        <ChairBody>
            <BackOfChair
                chairColor = {chairColor}/>
            <ChairSeat
                chairColor = {chairColor}/>
            <TopChairLeg
                chairColor = {chairColor}/>
            <BottomChairLeg
                chairColor = {chairColor}/>
        </ChairBody>
    </div>
)
}

const ChairBody = styled.div`
  color: ${({ theme }) => theme.colors.background};
  display: grid;
  grid-template-columns: 7px 21px 4px;
  grid-template-rows: 2px 3px 5px 12px 5px 3px 2px;
  grid-template-areas:
  "back . ."
  "back seat  ."
  "back seat firstleg"
  "back seat  ."
  "back seat secondleg"
  "back seat ."
  "back . ."
`;

interface IBackOfChair {
    chairColor: string;
}

const BackOfChair = styled.div<IBackOfChair>`
  grid-area: back;
  border-radius: 1px 3px 3px 1px;
  ${({ chairColor }) => {
    return` background: linear-gradient(to right, ${chairColor}, #adbcf9)`;
  }}
`;

interface IChairSeat {
    chairColor: string;
}

const ChairSeat = styled.div<IChairSeat>`
  grid-area: seat;
  border-radius: 0px 3px 3px 0px;
  ${({ chairColor }) => {
    return` background: linear-gradient(to right, ${chairColor}, #adbcf9)`;
  }}
`;

interface ITopChairLeg {
    chairColor: string;
}

const TopChairLeg = styled.div<ITopChairLeg>` 
  grid-area: firstleg;
  border-radius: 0px 3px 3px 0px;
  ${({ chairColor }) => {
    return`background: ${chairColor}`;
  }}
`;

interface IBottomChairLeg {
    chairColor: string;
}

const BottomChairLeg = styled.div<IBottomChairLeg>`
  grid-area: secondleg;
  border-radius: 0px 3px 3px 0px;
  ${({ chairColor }) => {
    return` background: ${chairColor}`;
  }}
`;