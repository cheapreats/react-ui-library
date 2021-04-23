import React from 'react';
import styled from 'styled-components';
import Card from '@Containers/Card/Card';
import Button from '../../Inputs/Button/Button';

export interface IEditControlPanel {
    /**
     * The table number for the table
     */
    TableNumber: string;
    /**
     * The number of seats at the table
     */
    NumberOfSeats: number;
    onRemoveChairClick: () => void;
    onAddChairClick: () => void;
    onDeleteClick: () => void;
    onRotateClick: () => void;
    onCloneClick: () => void;
}

/**
 * Primary UI component for user interaction
 * Edit control panel for the right side of the edit page
 */
export const EditControlPanel: React.FC<IEditControlPanel> = ({
    TableNumber = 'T1',
    NumberOfSeats = 1,
    onDeleteClick,
    onRotateClick,
    onCloneClick,
    onRemoveChairClick,
    onAddChairClick,
    ...props
}) => (
    <BorderForControlPanel {...props}>
        <Card>
            <CenteredText>
                Table Number
                <InputStyles placeholder={TableNumber} />
            </CenteredText>
            <CenteredText>
                Number Of Seats
                <Border>
                    <Container>
                        <Row>
                            <Col1>
                                <StylesForLeftButton
                                    onClick={onRemoveChairClick}
                                >
                                    -
                                </StylesForLeftButton>
                            </Col1>
                            <Col10>{NumberOfSeats}</Col10>
                            <Col2>
                                <StylesForRightButton onClick={onAddChairClick}>
                                    +
                                </StylesForRightButton>
                            </Col2>
                        </Row>
                    </Container>
                </Border>
            </CenteredText>
            <PaddingForButtons>
                <ButtonStyles primary onClick={onRotateClick}>
                    Rotate
                </ButtonStyles>
            </PaddingForButtons>
            <PaddingForButtons>
                <ButtonStyles primary onClick={onCloneClick}>
                    Clone
                </ButtonStyles>
            </PaddingForButtons>
            <PaddingForButtons>
                <ButtonStyles primary onClick={onDeleteClick}>
                    Delete
                </ButtonStyles>
            </PaddingForButtons>
        </Card>
    </BorderForControlPanel>
);

/**
 * variables for the styled components
 */
const StylesForLeftButton = styled(Button)`
    margin-top: auto;
    margin-bottom: auto;
    border: none;
    background: transparent;
    outline: none;
`;

const StylesForRightButton = styled(Button)`
    margin-top: auto;
    margin-bottom: auto;
    border: none;
    background: transparent;
    outline: none;
`;

const Container = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`;

const ButtonStyles = styled(Button)`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
`;

const InputStyles = styled.input`
    width: 80%;
    height: 100%;
`;

const Row = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
`;

const Col10 = styled.div`
    -webkit-box-flex: 0;
    -ms-flex: 0 0 75%;
    flex: 0 0 75%;
    max-width: 75%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 3px;
    min-height: 1px;
    margin-right: -23px;
`;

const Col1 = styled.div`
    -ms-flex: 0 0 8.333333%;
    flex: 0 0 8.333333%;
    max-width: 8.333333%;
`;

const Col2 = styled.div`
    -ms-flex: 0 0 8.333333%;
    flex: 0 0 8.333333%;
    max-width: 8.333333%;
`;

const BorderForControlPanel = styled.div`
    width: 240px;
    height: 350px;
`;

const Border = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid ${({ theme }) => theme.colors.editControlPanelColor};
    border-radius: 21px;
    margin-top: 0.5rem;
`;

const PaddingForButtons = styled.div`
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

const CenteredText = styled.div`
    text-align: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;
export default EditControlPanel;
