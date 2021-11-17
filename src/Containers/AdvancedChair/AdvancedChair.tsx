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
    onChairClick,
    ...props
}) => {
    return (
    <div{...props}>
        <ChairBody>
            <BackOfChair/>
            <ChairSeat/>
            <TopChairLeg/>
            <BottomChairLeg/>
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

const BackOfChair = styled.div`
  grid-area: back;
  border-radius: 1px 3px 3px 1px;
  background: linear-gradient(to right, #6495ED, #adbcf9);
`;

const ChairSeat = styled.div`
  grid-area: seat;
  border-radius: 0px 3px 3px 0px;
  background: linear-gradient(to right, #6495ED, #adbcf9);
`;

const TopChairLeg = styled.div` 
  grid-area: firstleg;
  border-radius: 0px 3px 3px 0px;
  background: #6495ED;
`;

const BottomChairLeg = styled.div`
  grid-area: secondleg;
  border-radius: 0px 3px 3px 0px;
  background: #6495ED;
`;