import React, {useState} from 'react';
import styled from 'styled-components';
import { PauseBox } from './PauseBox';
import { statusEnum, StatusButton, StatusButtonElements  } from './StatusButton';
import { X } from '@styled-icons/bootstrap/X';
import { action } from '@storybook/addon-actions';

export interface KitchenStatusModelProps {
    /* Minute amounts for when pause option is selected */
    minuteAmounts: number[],
    /* Values for the status button (color, header and body) */
    statusBox: StatusButtonElements[],
    /* Action for when a pause box is clicked */
    onPauseClick: (minutes: number) => void;
    /* Action for when a status button is clicked */
    onStatusClick: (currentStatus: statusEnum) => void;
    /* Action for when the update button is clicked */
    onUpdateClick: () => void;
}

export const KitchenStatusModel: React.FC<KitchenStatusModelProps> = ({
    statusBox,
    minuteAmounts,
    onPauseClick,
    onStatusClick,
    onUpdateClick,
    ...props
}): React.ReactElement => {

    const [currentStatus, setCurrentStatus] = useState(2);
    const [currentMinutesRemaining, setMinutesRemaining] = useState(0)


    /**
     * 
     * @param status status amount to be set
     * @returns a function that sets the 'givenStatus' and then calls onPauseClick
     */
    const statusChangeOnClick = (index: number) => {
        return function () {
            setCurrentStatus(statusBox[index].status);
            onStatusClick(statusBox[index].status);
        }
    };

    /**
     * 
     * @param statusBoxes set of parameters for status buttons (color, header, body)
     * @returns renders multiple status buttons with given parameters from statusBoxes
     */
    const renderStatusButtons = (statusBoxes: StatusButtonElements[]) => {
        return (
            <StatusButtonWrapper>
                {(statusBoxes).map( (box, index) => {
                    return (
                        <StatusButton 
                            onClick = {statusChangeOnClick(index)}
                            statusBox = {box}
                            index = {index}
                        >
                        </StatusButton>
                    )
                })}
            </StatusButtonWrapper>
        )
    }

    /**
     * 
     * @param minsRemaining minute amount to be paused
     * @returns a function that sets the 'minsRemaining' and then calls onPauseClick
     */
    const valueChangeOnPauseClick = (minsRemaining: number) => {
        return function () {
            setMinutesRemaining(minsRemaining);
            onPauseClick(minsRemaining);
        }
    };

    /**
     * 
     * @param givenStatus a restaurants status [Normal, Busy, Paused], if Paused the component renders
     * @param minuteRemainingAmounts array of minutes to be shown in pause boxes
     * @returns Render multiple pause boxes with given minute amounts if status is paused
     */
    const renderPauseBox = (givenStatus: statusEnum, minuteRemainingAmounts: number[]) => {
        return(
            givenStatus===statusEnum.Pause
            ?<PauseWrapper>
                <HeaderText>How long would you like to pause new orders?</HeaderText>
                {
                    minuteRemainingAmounts.map(minsRemaining => {
                        return (<PauseBox onClick = {valueChangeOnPauseClick(minsRemaining)} minsRemaining={minsRemaining} />)
                    })
                }
            </PauseWrapper>
            :null
        )
    };

    /**
     * 
     * @param givenStatus a restaurants status [Normal, Busy, Paused], if Paused the component renders
     * @returns Render the bottom text and update status button if status is paused
     */
    const renderUpdateStatus = (givenStatus: statusEnum, minsRemaining: number) => {
        return(
            givenStatus===statusEnum.Pause
            ?<BottomWrapper>
                <HeaderText>Updating your kitchen status to pause will:</HeaderText>
                <BottomBody>
                    <li>Stop all new orders from Store for {minsRemaining} mins.</li>
                    <li>Set a timer to change your status to Normal after {minsRemaining} mins.</li>
                </BottomBody>
                <ButtonWrapper>
                    <UpdateButton onClick={onUpdateClick}>Update Status</UpdateButton>
                </ButtonWrapper>
            </BottomWrapper>
            :null
        )
    };

    return (

    <BackgroundWrapper>
        <TopWrapper>
            <StatusWrapper>
                <StatusHeaderWrapper>
                    <HeaderText> 
                    Kitchen Status
                    <ExitIcon></ExitIcon>
                    </HeaderText>
                </StatusHeaderWrapper>

                {renderStatusButtons(statusBox)}
            </StatusWrapper>

            { renderPauseBox(currentStatus, minuteAmounts) }

        </TopWrapper>

        { renderUpdateStatus(currentStatus, currentMinutesRemaining) }

    </BackgroundWrapper>
    )
};

const BackgroundWrapper = styled.div`
    width: 530px;
`

const TopWrapper = styled.div`
    ${({theme}):string => `
    background-color:  ${theme.colors.border}};
    `}

    width:100%;
    padding: 20px 20px;
`;

const StatusWrapper = styled.div`
    margin-bottom: 20px
`

const StatusHeaderWrapper = styled.div`
    font-size: 20px;
    margin-left: 5px;
`;

const HeaderText = styled.header`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.text}};
    `}

    font-weight: bold;
`;

const ExitIcon = styled(X)`
    height: 25px;
    display: block-inline;
    transform: rotate(90deg);
    float: right;
    text-align: right;
    margin-right: 5%;
    cursor: pointer;
`;

const StatusButtonWrapper = styled.div`
    width: 100%;
    margin: 5px;
`

const PauseWrapper = styled.div`
`

const BottomWrapper = styled.div`
    ${({theme}):string => `    
    background-color:  ${theme.colors.background};
    `}
`

const BottomBody = styled.ul`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.text}};
    `}
`
const ButtonWrapper = styled.div`
    margin-top: 100px;
`

const UpdateButton = styled.button`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    `}
    color: white;
    font-weight: bolder;
    padding: 10px 0px;
    width: 80%;
    margin: 0 10% 0 10%;
    border-radius: 5px;
    border-style: none;
    cursor: pointer;
    background-color: #516fe4;
`

export default KitchenStatusModel;