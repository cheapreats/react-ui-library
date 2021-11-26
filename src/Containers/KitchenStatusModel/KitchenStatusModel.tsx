import React from 'react';
import styled from 'styled-components';
import { PauseBox } from './PauseBox';
import { statusEnum, StatusButton  } from './StatusButton';
import { X } from '@styled-icons/bootstrap/X';
import { action } from '@storybook/addon-actions';

export interface KitchenStatusModelProps {
    // Array for holding each minute value
    status: statusEnum,
    minuteAmounts: number[],
    statusBarColorArray: string[],
    statusHeaderArray: string[],
    statusBodyArray: string[],
    statusIndexArray: number[],
}

export const KitchenStatusModel: React.FC<KitchenStatusModelProps> = ({
    status,
    minuteAmounts,
    statusBarColorArray,
    statusHeaderArray,
    statusBodyArray,
    statusIndexArray,
    ...props
}): React.ReactElement => (
    <BackgroundWrapper>
        <TopWrapper>
            <StatusWrapper>
                <StatusHeaderWrapper>
                    <HeaderText> 
                    Kitchen Status
                    <ExitIcon></ExitIcon>
                    </HeaderText>
                </StatusHeaderWrapper>

                <StatusButton 
                    status={status}
                    statusBarColorArray={statusBarColorArray}
                    statusHeaderArray={statusHeaderArray} 
                    statusBodyArray={statusBodyArray} 
                    statusIndexArray={statusIndexArray}>
                </StatusButton>
            </StatusWrapper>

            {
                status==statusEnum.Pause
                ?<PauseWrapper>
                    <HeaderText>How long would you like to pause new orders?</HeaderText>
                    {
                        minuteAmounts.map(minsRemaining => {
                            return (<PauseBox minsRemaining={minsRemaining} />)
                        })
                    }
                </PauseWrapper>
                :<PauseWrapper></PauseWrapper>
            }

        </TopWrapper>

        {
            status==statusEnum.Pause
            ?<BottomWrapper>
                <HeaderText>Updating your kitchen status to pause will:</HeaderText>
                <BottomBody>
                    <li>Stop all new orders from Store for x mins.</li>
                    <li>Set a timer to change your status to Normal after x mins.</li>
                </BottomBody>
                <BottomButton onClick={action('updateStatus')}>Update Status</BottomButton>
            </BottomWrapper>
            :<div></div>
        }

    </BackgroundWrapper>
);

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

const ExitIcon = styled(X)`
    height: 25px;
    display: block-inline;
    transform: rotate(90deg);
    float: right;
    text-align: right;
    margin-right: 5%;
    cursor: pointer;
`;

const HeaderText = styled.header`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    color: ${theme.colors.text}};
    `}

    font-weight: bold;
`;

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

const BottomButton = styled.button`
    ${({theme}):string => `
    font-family: ${theme.font.family};
    `}
    color: white;
    font-weight: bolder;
    padding: 10px 0px;
    width: 80%;
    margin: 150px 10% 0 10%;
    border-radius: 5px;
    border-style: none;
    cursor: pointer;
    background-color: #516fe4;
`

export default KitchenStatusModel;