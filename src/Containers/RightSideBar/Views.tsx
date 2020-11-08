import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch } from '@Inputs/Switch';


export interface StandardProps {
    standard: string;
    isGray: string;
    txtColor: string;
}
export interface AlternativeProps {
    alternative: string;
    isGray: string;
    txtColor: string;
}


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
    padding-left: 27px;
    padding-right: 27px;
    font-family: Quicksand;
    font-size: 13.8px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: normal;
    color: #000000;
`;
const StyledSwitch = styled(Switch)`
    width: 10px;
    height: 10px;
`;


export const StandardView: React.FC<StandardProps> = ({
    standard,
    isGray,
    txtColor,
    ...props
}): React.ReactElement => {
    const [isDemo, setDemo] = useState(false);
    if(isDemo){
        return (
            <>
                <StyledSwitch
                label="Preview"
                onChange={() => setDemo(!isDemo)}/>
                <Wrapper>
                    <Txt>{standard}</Txt>
                    <Table style={{ border: isGray }}>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>Qty</Txt>
                                <Txt style={{ color: txtColor }}>Product(UPC)</Txt>
                                <Txt style={{ color: txtColor }}>Price</Txt>
                            </Td>
                        </Tr>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>
                                    Specific item intructions
                                </Txt>
                            </Td>
                        </Tr>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>...</Txt>
                            </Td>
                        </Tr>
                    </Table>
                </Wrapper>
            </>
        )
    } else {
        return (
            <>
                <StyledSwitch
                label="Preview"
                onChange={() => setDemo(!isDemo)}/>
                <Wrapper>
                    <Txt>{standard}</Txt>
                    <Table style={{ border: isGray }}>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>Qty</Txt>
                                <Txt style={{ color: txtColor }}>Product(UPC)</Txt>
                                <Txt style={{ color: txtColor }}>Price</Txt>
                            </Td>
                        </Tr>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>
                                    Specific item intructions
                                </Txt>
                            </Td>
                        </Tr>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>...</Txt>
                            </Td>
                        </Tr>
                    </Table>
                </Wrapper>
            </>
        )
    }
};

export const AlternativeView: React.FC<AlternativeProps> = ({
    alternative,
    isGray,
    txtColor,
    ...props
}): React.ReactElement => {
    const [isDemo, setDemo] = useState(true);
    if(isDemo){
        return (
            <>
                <StyledSwitch
                label="Preview"
                onChange={() => setDemo(!isDemo)}/>
                <Wrapper>
                    <Txt>{alternative}</Txt>
                    <Table style={{ border: isGray }}>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>Qty</Txt>
                                <Txt style={{ color: txtColor }}>Product(UPC)</Txt>
                                <Txt style={{ color: txtColor }}>Price</Txt>
                            </Td>
                        </Tr>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>
                                    Specific item intructions
                                </Txt>
                            </Td>
                        </Tr>
                        <Tr style={{ border: isGray }}>
                            <Td style={{ border: isGray }}>
                                <Txt style={{ color: txtColor }}>...</Txt>
                            </Td>
                        </Tr>
                    </Table>
                </Wrapper>
            </>
        )
    } else {
        return (
            <>
                <StyledSwitch
                label="Preview"
                onChange={() => setDemo(!isDemo)}/>
                <Wrapper>
                    <Txt>{alternative}</Txt>
                    <Table style={{ border: isGray }}>
                            <Tr style={{ border: 'white' }}>
                                <Td style={{ border: 'white' }}>
                                    <Txt>2x</Txt>
                                    <Txt>Hot Dog</Txt>
                                    <Txt>$12.99</Txt>
                                </Td>
                            </Tr>
                            <Tr style={{ border: 'white' }}>
                                <Td style={{ border: 'white' }}>
                                    <Txt style={{ textAlign:  'right' }}>1x</Txt>
                                    <Txt style={{ textAlign:  'right' }}>Hamburgers</Txt><br/>
                                    <Txt style={{ lineHeight: 0.2 }}>No bun no burger, please!</Txt><br/>
                                    <Txt style={{ lineHeight: 0.2 }}>Add Lettuce</Txt>
                                    <Txt>$9.99</Txt>
                                </Td>
                            </Tr>
                            <Tr style={{ border: 'white' }}>
                                <Td style={{ border:  'white' }}>
                                    <Txt>1x</Txt>
                                    <Txt>French Fries</Txt>
                                    <Txt>$2.99</Txt>
                                </Td>
                            </Tr>
                            <Tr style={{ border: 'white' }}>
                                <Td style={{ border:  'white' }}>
                                    <Txt>...</Txt>
                                </Td>
                            </Tr>
                    </Table>
                </Wrapper>
            </>
        )
    }
};