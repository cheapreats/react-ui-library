import React, {useState} from 'react';
import styled from "styled-components";
import Button from "../../Inputs/Button/Button"

export interface IEditControlPanel {
    /**
     * The table number for the table
     */
    TableNumber: string;
    /**
     * The number of seats at the table
     */
    NumberOfSeats: number;
}

/**
 * Primary UI component for user interaction
 * Edit control panel for the right side of the edit page
 */
export const EditControlPanel: React.FC<IEditControlPanel> = ({
    TableNumber= 'T1',
    NumberOfSeats = 1,
    ...props
}) => {

    const [seats, setSeat] = useState(NumberOfSeats);
    return (
        <BorderForControlPanel {...props}>
            <CenteredText>
                <FontStylesAndColor>Table Number</FontStylesAndColor>
                <InputStyles placeholder={TableNumber} />
            </CenteredText>
            <CenteredText>
                <FontStylesAndColor>Number Of Seats</FontStylesAndColor>
                <Border>
                    <Container>
                        <Row>
                            <Col1>
                                <StylesForLeftButton onClick={() => setSeat(seats - 1)}>-</StylesForLeftButton>
                            </Col1>
                            <Col10>
                                {seats}
                            </Col10>
                            <Col2>
                                <StylesForRightButton onClick={() => setSeat(seats + 1)}>+</StylesForRightButton>
                            </Col2>
                        </Row>
                    </Container>
                </Border>
            </CenteredText>
            <PaddingForButtons>
                <Button primary style={{marginRight: 'auto', marginLeft: "auto", width: '80%'}}>Rotate</Button>
            </PaddingForButtons>
            <PaddingForButtons>
                <Button primary style={{marginRight: 'auto', marginLeft: "auto", width: '80%'}}>Clone</Button>
            </PaddingForButtons>
            <PaddingForButtons>
                <Button primary style={{marginRight: 'auto', marginLeft: "auto", width: '80%'}}>Delete</Button>
            </PaddingForButtons>
        </BorderForControlPanel>
    );
};

/**
* variables for the styled components
*/
const StylesForLeftButton = styled(Button)`
    marginTop: auto;
    marginBottom: auto;
    border: none;
    background: transparent;
    outline: none;
`;

const StylesForRightButton = styled(Button)`
    marginTop: auto;
    marginBottom: auto;
    border: none;
    background: transparent;
    outline: none;
`;

const FontStylesAndColor = styled.div`
    color: #000000;
    font-weight: bold;
`;

const Container = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
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
    margin-right: -23px
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
    border: 1px solid #000000;
    border-radius: 21px;
`;

const Border = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #000000;
    border-radius: 21px;
    margin-top: .5rem;
`;

const PaddingForButtons = styled.div`
    padding-top: .5rem;
    padding-bottom: .5rem;
`;

const CenteredText = styled.div`
    text-align: center;
    padding-top: .5rem;
    padding-bottom: .5rem;
`;

export default EditControlPanel;