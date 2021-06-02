import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@Inputs/Button/Button';
import Input from '@Inputs/Input/Input';
import Card from '@Containers/Card/Card';
import { Close } from '@styled-icons/ionicons-sharp/Close';

export interface IPartyInfoInput {
    /**
     * Function to handle onClick event for the Next button
     */
    onNextClick: (
        arg0: string,
        arg1: number,
        arg2: string,
        arg3: string,
    ) => void;

    /**
     * Function to handle onClick event for the x button
     */
    onBackButtonClick: () => void;
}

/**
 * Primary UI component for user interaction
 * PartyInfoInput
 */
export const PartyInfoInput: React.FC<IPartyInfoInput> = ({
    onNextClick,
    onBackButtonClick,
    ...props
}) => {
    const [NewPartyName, SetNewPartyName] = useState('Name');
    const [NewPartySize, SetNewPartySize] = useState(0);
    const [NewReservationDate, SetNewReservationDate] = useState('');
    const [NewReservationTime, SetNewReservationTime] = useState('');

    const handleMinusClick = () => {
        SetNewPartySize(NewPartySize - 1);
        console.log(NewPartySize);
    };

    const handlePlusClick = () => {
        SetNewPartySize(NewPartySize + 1);
        console.log(NewPartySize);
    };

    return (
        <WidthForCard>
            <AlignContentCenter>
                <StylesForCloseIcon onClick={onBackButtonClick} />
                <WidthHeightForEachField>
                    <strong>Party Name</strong>
                    <Input
                        value={NewPartyName}
                        onChange={(e: React.ChangeEvent<any>) =>
                            SetNewPartyName(e.target.value)
                        }
                    />
                </WidthHeightForEachField>
                <WidthHeightForEachField>
                    <strong>Party Size</strong>
                    <Row>
                        <Col1>
                            <Button onClick={handleMinusClick}>-</Button>
                        </Col1>
                        <Col2>
                            <WidthForPartySize>
                                <StylesForPartySizeInput
                                    value={NewPartySize}
                                    onChange={(e: React.ChangeEvent<any>) =>
                                        SetNewPartySize(e.target.value)
                                    }
                                />
                            </WidthForPartySize>
                        </Col2>
                        <Col3>
                            <Button onClick={handlePlusClick}>+</Button>
                        </Col3>
                    </Row>
                </WidthHeightForEachField>
                <WidthHeightForEachField>
                    <strong>Reservation Date</strong>
                    <Input
                        placeholder="mm/dd/yyyy (current date)"
                        onChange={(e: React.ChangeEvent<any>) =>
                            SetNewReservationDate(e.target.value)
                        }
                    />
                </WidthHeightForEachField>
                <WidthHeightForEachField>
                    <strong>Reservation Time</strong>
                    <Input
                        placeholder="hh:mm (current time)"
                        onChange={(e: React.ChangeEvent<any>) =>
                            SetNewReservationTime(e.target.value)
                        }
                    />
                </WidthHeightForEachField>
                <StylesForNextButton>
                    <Button
                        primary
                        onClick={() =>
                            onNextClick(
                                NewPartyName,
                                NewPartySize,
                                NewReservationDate,
                                NewReservationTime,
                            )
                        }
                    >
                        Next
                    </Button>
                </StylesForNextButton>
            </AlignContentCenter>
        </WidthForCard>
    );
};

/**
 * Styled Components
 */

const StylesForCloseIcon = styled(Close)`
    float: right;
    width: 24px;
    height: 24px;
`;

const WidthForCard = styled(Card)`
    width: 358px;
`;

const AlignContentCenter = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

const WidthHeightForEachField = styled.div`
    width: 304px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
`;

const StylesForPartySizeInput = styled(Input)`
    text-align: center;
`;

const WidthForPartySize = styled.div`
    width: 156px;
    height: 50px;
`;

const StylesForNextButton = styled.div`
    width: 80px;
    margin-left: auto;
    margin-right: 0;
`;

const Col1 = styled.div`
    -ms-flex: 0 0 8.333333%;
    flex: 0 0 8.333333%;
    max-width: 8.333333%;
`;

const Col2 = styled.div`
    -webkit-box-flex: 0;
    -ms-flex: 0 0 75%;
    flex: 0 0 75%;
    max-width: 75%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 48px;
    margin-right: -48px;
    min-height: 1px;
    align-text: center;
`;
const Col3 = styled.div`
    -ms-flex: 0 0 8.333333%;
    flex: 0 0 8.333333%;
    max-width: 8.333333%;
`;

const Row = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-top: 0.5rem;
`;

export default PartyInfoInput;
