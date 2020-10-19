import React, { useState }  from 'react';
import styled from 'styled-components';
import { Select } from '@Inputs/Select';
import { Bold } from '@styled-icons/boxicons-regular/Bold';
import { Italic } from '@styled-icons/boxicons-regular/Italic';
import { Underline } from '@styled-icons/boxicons-regular/Underline';
import { ColorFill } from '@styled-icons/boxicons-solid/ColorFill';
import { AlignMiddle } from '@styled-icons/boxicons-regular/AlignMiddle';
import { AlignLeft } from '@styled-icons/boxicons-regular/AlignLeft';
import { AlignRight } from '@styled-icons/boxicons-regular/AlignRight';

// API KEY: AIzaSyBW6afsWt6KM6yvzXgfJ9UmUGImHvedZbc
// STYLED COMPONENTS
const Wrapper = styled.div`
`;
const StyledSelect = styled(Select)`
    width: 70px;
`;
const Title = styled.h1`
    font-size: 22px;
`;
const StyledBold = styled(Bold)`
    width: 30px;
    height: 30px
`;
const StyledItalic = styled(Italic)`
    width: 30px;
    height: 30px
`;
const StyledUnderline = styled(Underline)`
    width: 30px;
    height: 30px
`;
const StyledColorFill = styled(ColorFill)`
    width: 30px;
    height: 30px
`;
const StyledAlignMiddle = styled(AlignMiddle)`
    width: 30px;
    height: 30px
`;
const StyledAlignLeft = styled(AlignLeft)`
    width: 30px;
    height: 30px
`;
const StyledAlignRight = styled(AlignRight)`
    width: 30px;
    height: 30px
`;
// END OF STYLED COMPONENTS

// EditText PROPS
export interface EditTextProps {
};
// END OF EditText PROPS

const fontSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
                    '21', '22', '23', '24', '25', '26', '26', '27', '28', '29', '30',
                    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
                    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'];

export const EditText: React.FC<EditTextProps> = ({
}): React.ReactElement => {
    const [select, setSelect] = useState(fontSizes[0]);
    return (
        <Wrapper>
            <Title>Edit Text</Title>
            <StyledSelect
                label='Size'
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
            <StyledBold />
            <StyledItalic />
            <StyledUnderline />
            <StyledColorFill />
            <StyledAlignMiddle />
            <StyledAlignLeft />
            <StyledAlignRight />
        </Wrapper>
    )   
};

