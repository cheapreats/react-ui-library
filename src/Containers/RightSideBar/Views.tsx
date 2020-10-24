import React  from 'react';
import styled from 'styled-components';

// VIEW PROPS
export interface StandardProps {
    standard: string,
    isGray: string,
    txtColor: string,
};
export interface AlternativeProps {
    alternative: string,
    isGray: string,
    txtColor: string,
};
// END OF VIEW PROPS

// STYLED COMPONENTS
const Td = styled.td`
    border: 2px solid black;
`;
const Tr = styled.tr`
    border: 2px solid black;
    text-align: left;
`;
const Table = styled.table`
    margin-left: auto;
    margin-right: auto;
    border: 2px solid black;  
    border-collapse: collapse;
    border-radius: 30px;
    width: 330px;
`;
export const Wrapper = styled.div`
    text-align: center;
`;
export const Txt = styled.p`
    display: inline-block;
    padding-left: 26px;
    padding-right: 26px;
    font-family: Quicksand;
    font-size: 13.8px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
`;
// END OF STYLED COMPONENTS

export const StandardView: React.FC<StandardProps> = ({
    standard,
    isGray,
    txtColor,
    ...props
}): React.ReactElement => {
    return(
        <Wrapper>
            <Txt>{ standard }</Txt>
            <Table style={{border: isGray}}>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>Qty</Txt>
                        <Txt style={{color: txtColor}}>Product(UPC)</Txt>
                        <Txt style={{color: txtColor}}>Price</Txt>
                    </Td>
                </Tr>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>Add Item</Txt>
                    </Td>
                </Tr>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>Specific item intructions</Txt>
                    </Td>
                </Tr>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>...</Txt>
                    </Td>
                </Tr>
            </Table>
        </Wrapper>
    ); 
};

export const AlternativeView: React.FC<AlternativeProps> = ({
    alternative,   
    isGray, 
    txtColor,
    ...props
}): React.ReactElement => {
    return(
        <Wrapper>
            <Txt>{ alternative }</Txt>
            <Table style={{border: isGray}}>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>Product(UPC)</Txt>
                        <Txt style={{color: txtColor}}>Qty</Txt>
                        <Txt style={{color: txtColor}}>Price</Txt>
                    </Td>
                </Tr>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>Add Item</Txt>
                    </Td>
                </Tr>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>Specific item intructions</Txt>
                    </Td>
                </Tr>
                <Tr style={{border: isGray}}>
                    <Td style={{border: isGray}}>
                        <Txt style={{color: txtColor}}>...</Txt>
                    </Td>
                </Tr>
            </Table> 
        </Wrapper>
    );
};