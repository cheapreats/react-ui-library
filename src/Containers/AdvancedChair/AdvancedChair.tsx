import React from 'react';
import styled, {css} from "styled-components";

type Position = 'top' | 'bottom' | 'left' | 'right';

type getChairTextType = () => JSX.Element;

// TODO: try to add initials on the chair
export interface IAdvancedChair extends React.HTMLAttributes<HTMLDivElement> {
    position: Position;
    isSeated: boolean;
    occupiedBy: string;
    isVisible: boolean;
    relativeSize: number;
    chairIndex: number;
    selectedIndex: number;
    chairColor: string;
    secondaryChairColor: string;
    TopChairLegProps: React.HTMLAttributes<HTMLDivElement>;
    onChairClick: (
    ) => void;
}
// TODO: delete unused props
export const AdvancedChair: React.FC<IAdvancedChair> = ({
    position = 'top',
    isSeated = false,
    occupiedBy = '',
    isVisible = true,
    relativeSize = 1.0,
    chairIndex = -1,
    selectedIndex = -1,
    chairColor = '#6495ED',
    secondaryChairColor= '#adbcf9',
    onChairClick,
    TopChairLegProps,
    ...props
}) => {
    const getChairText: getChairTextType = () => {
        return(
            <AdvancedChairText relativeSize={relativeSize}>
                {occupiedBy}
            </AdvancedChairText>

        );

    };
    return (
    <div{...props}>
        <ChairBody onClick={onChairClick}>
            <BackOfChair
                chairColor = {chairColor}
                secondaryChairColor = {secondaryChairColor}/>
            <ChairSeat
                chairColor = {chairColor}
                secondaryChairColor = {secondaryChairColor}
            >
                 {getChairText()}
            </ChairSeat>
            <TopChairLeg
                chairColor = {chairColor}
                secondaryChairColor = {secondaryChairColor}
                {...TopChairLegProps}/>
            <BottomChairLeg
                chairColor = {chairColor}
                secondaryChairColor = {secondaryChairColor}/>
        </ChairBody>
    </div>
)
}
// style for the chair body
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

// this interface is for the chair's color
interface IChairColorStyle{
    chairColor: string;
    secondaryChairColor: string;
}

// styles for the chair's props
const BackOfChair = styled.div<IChairColorStyle>`
  grid-area: back;
  border-radius: 1px 3px 3px 1px;
  ${({chairColor, secondaryChairColor}) => {
    return `background: linear-gradient(to right, ${chairColor}, 50%, ${secondaryChairColor})`;
  }};
`;

const ChairSeat = styled.div<IChairColorStyle>`
  grid-area: seat;
  border-radius: 0px 3px 3px 0px;
  ${({chairColor, secondaryChairColor}) => {
    return `background: linear-gradient(to right, ${chairColor}, 50%, ${secondaryChairColor})`;
  }}
`;

const TopChairLeg = styled.div<IChairColorStyle>` 
  grid-area: firstleg;
  border-radius: 0px 3px 3px 0px;
  ${({chairColor, secondaryChairColor}) => {
    return `background: linear-gradient(to right, ${chairColor}, 10%, ${secondaryChairColor})`;
  }}
`;

const BottomChairLeg = styled.div<IChairColorStyle>`
  grid-area: secondleg;
  border-radius: 0px 3px 3px 0px;
  ${({chairColor, secondaryChairColor}) => {
    return `background: linear-gradient(to right, ${chairColor}, 10%, ${secondaryChairColor})`;
  }}
`;


// text styles for the chair
const textBaseStyle = css<Pick<IAdvancedChair, 'relativeSize'>>`
    ${({ relativeSize }) => {
    const BASE_CHAIR_FONT_SIZE = 1.5;
    return `font-size: ${BASE_CHAIR_FONT_SIZE * relativeSize}em;`;
}}
    color: ${({ theme }) => theme.colors.background};
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const textChairStyle = css<Pick<IAdvancedChair, 'relativeSize'>>`
    ${textBaseStyle};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AdvancedChairText = styled.div<Pick<IAdvancedChair, 'relativeSize'>>`
    ${textChairStyle};
`;