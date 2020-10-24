import React, { useState }  from 'react';
import styled from 'styled-components';
import { Select } from '@Inputs/Select';
import { Bold } from '@styled-icons/boxicons-regular/Bold';
import { Italic } from '@styled-icons/boxicons-regular/Italic';
import { Underline } from '@styled-icons/boxicons-regular/Underline';
import { TextColor } from '@styled-icons/foundation/TextColor';
import { AlignMiddle } from '@styled-icons/boxicons-regular/AlignMiddle';
import { AlignLeft } from '@styled-icons/boxicons-regular/AlignLeft';
import { AlignRight } from '@styled-icons/boxicons-regular/AlignRight';

// API KEY: AIzaSyBW6afsWt6KM6yvzXgfJ9UmUGImHvedZbc
// STYLED COMPONENTS
const Wrapper = styled.div`
`;
const StyledSelect = styled(Select)`
    width: 143px;
`;
const FontStyledSelect = styled(Select)`
    width: 143px;
`;

const Title = styled.h1`
    font-size: 18px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-top: 20px;
    text-align: left;
`;
const Txt = styled.h1`
    text-align: left;
    font-size: 15px;
`;
const StyleTxt = styled.h1`
    float: right;
    line-height: 4px;
    font-size: 15px;
    padding-left: 8px;
`;


const TxtWrapper = styled.div`
    text-align: center;
`;
const Container = styled.div`
    width: 150px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    display: inline-block;
`;
const SmallContainer = styled.div`
    text-align: center;
    margin-left: 18px;
    margin-right: 18px;
    display: inline-block;
`;
const StyledContainer = styled.div`
    margin-top: 30px;
    display: inline-block;
    text-align: center;
`;
const StyledContainerNested = styled.div`
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
`;

const StyledBold = styled(Bold)`
    width: 24px;
    height: 24px;
`;
const StyledItalic = styled(Italic)`
    width: 24px;
    height: 24px;
`;
const StyledUnderline = styled(Underline)`
    width: 24px;
    height: 24px;
`;
const StyledTextColor = styled(TextColor)`
    width: 24px;
    height: 24px;
`;
const StyledAlignMiddle = styled(AlignMiddle)`
    width: 24px;
    height: 24px
`;
const StyledAlignLeft = styled(AlignLeft)`
    width: 24px;
    height: 24px
`;
const StyledAlignRight = styled(AlignRight)`
    width: 24px;
    height: 24px
`;

export interface EditTextProps {
};

const fontSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
                    '21', '22', '23', '24', '25', '26', '26', '27', '28', '29', '30',
                    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
                    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'];
const fontStyles = ['test', 'test', 'test', 'test'];


export const EditText: React.FC<EditTextProps> = ({
}): React.ReactElement => {
    const [select, setSelect] = useState(fontSizes[0]);
    return (
        <Wrapper>
            <Title>Edit Text</Title>

            <TxtWrapper>
                <Container>
                    <Txt>Font</Txt>
                    <StyledSelect
                        placeholder={ fontSizes[0] }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSelect(e.target.value); 
                        }}
                        value={select} 
                        >
                        {Object.entries(fontSizes).map((font): React.ReactElement => {
                            return (
                                <option
                                    key={font[0]}
                                    value={font[1]} 
                                >
                                    { font[1]} 
                                </option>
                            )
                        })}
                    </StyledSelect>
                </Container>
                <Container>
                    <Txt>Size</Txt>
                    <FontStyledSelect
                        placeholder={ fontStyles[0] }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSelect(e.target.value); 
                        }}
                        value={select} 
                        >
                        {Object.entries(fontStyles).map((font): React.ReactElement => {
                            return (
                                <option
                                    key={font[0]}
                                    value={font[1]} 
                                >
                                    { font[1]} 
                                </option>
                            )
                        })}
                    </FontStyledSelect>
                </Container>
            </TxtWrapper>

            <StyledContainer>
                <StyledContainerNested>
                    <SmallContainer>
                        <Txt>Style</Txt>
                        <StyledBold />
                        <StyleTxt>Bold</StyleTxt>
                    </SmallContainer>
                    <SmallContainer>
                        <StyledItalic />
                        <StyleTxt>Italic</StyleTxt>
                    </SmallContainer>
                    <SmallContainer>
                        <StyledUnderline />
                        <StyleTxt>Underline</StyleTxt>
                    </SmallContainer>
                </StyledContainerNested>
            </StyledContainer>

            <StyledContainer>
                <StyledContainerNested>
                    <SmallContainer>
                        <Txt>Color</Txt>
                        <StyledTextColor />
                    </SmallContainer>
                </StyledContainerNested>
            </StyledContainer>

            <StyledContainer>
                <StyledContainerNested>
                    <SmallContainer>
                        <Txt>Alignment</Txt>
                        <StyledAlignLeft />
                        <StyleTxt>Left</StyleTxt>
                    </SmallContainer>
                    <SmallContainer>
                        <StyledAlignMiddle />
                        <StyleTxt>Center</StyleTxt>
                    </SmallContainer>
                    <SmallContainer>
                        <StyledAlignRight />
                        <StyleTxt>Right</StyleTxt>
                    </SmallContainer>
                </StyledContainerNested>
            </StyledContainer>
            
        </Wrapper>
    )   
};

