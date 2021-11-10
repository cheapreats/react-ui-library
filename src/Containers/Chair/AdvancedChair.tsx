import React from 'react';
import styled from "styled-components";

type Position = 'top' | 'bottom' | 'left' | 'right';

export interface IAdvancedChair {
    position: Position;
    isVisible: boolean;
    relativeSize: number;
}

export const AdvancedChair: React.FC<IAdvancedChair> = ({
    position = 'top',
    isVisible = true,
    relativeSize = 1.0,
    ...props
}) => {
    return (
    <div{...props}>
        <ChairBody>
            <BackOfChair>
            </BackOfChair>
            <ChairSeat>
            </ChairSeat>
            <TopChairLeg>
            </TopChairLeg>
            <
            >
                <BottomChairLeg >
                </BottomChairLeg >
            </>
        </ChairBody>
    </div>
)
}

const ChairBody = styled.div`
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