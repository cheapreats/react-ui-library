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
    primaryChairColor: string;
    chairColorGradient: string;
    onChairClick: () => void;
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
    primaryChairColor = '#6495ED',
    chairColorGradient='#adbcf9',
    onChairClick,
    ...props
    }) => {
    return (
        <div{...props}>
            <ChairBody onClick={onChairClick}>
                <BackOfChair
                    primaryChairColor={primaryChairColor}
                    chairColorGradient={chairColorGradient}/>
                <ChairSeat
                    primaryChairColor={primaryChairColor}
                    chairColorGradient={chairColorGradient}/>
                <TopChairLeg
                    primaryChairColor={primaryChairColor}
                    chairColorGradient={chairColorGradient}/>
                <BottomChairLeg
                    primaryChairColor={primaryChairColor}
                    chairColorGradient={chairColorGradient}/>
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

interface IChairColor {
    primaryChairColor: string;
    chairColorGradient: string;
}

const ChairColorStyle = styled.div<IChairColor>`
  ${({primaryChairColor, chairColorGradient}) => {
    return `background: linear-gradient(to right,${primaryChairColor}, ${chairColorGradient})`;
  }};
`;

const BackOfChair = styled(ChairColorStyle)`
  grid-area: back;
  border-radius: 1px 3px 3px 1px;
  
`;

const ChairSeat = styled(ChairColorStyle)`
  grid-area: seat;
  border-radius: 0px 3px 3px 0px;
  
`;

const TopChairLeg = styled(ChairColorStyle)`
  grid-area: firstleg;
  border-radius: 0px 3px 3px 0px;
 
`;

const BottomChairLeg = styled(ChairColorStyle)`
  grid-area: secondleg;
  border-radius: 0px 3px 3px 0px;
`;