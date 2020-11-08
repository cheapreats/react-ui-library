import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';


export interface DefCheckbox {
    [key: string]: {
        label: string;
        value: boolean;
    };
}
export interface CheckListProps {
    CRATitle: string;
    ReqTitle: string;
    RecTitle: string;
    ReqInfoArr: DefCheckbox;
    RecInfoArr: DefCheckbox;
}


const Wrapper = styled.div``;
const DefaultTxt = styled.h1`
    font-family: Quicksand;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
`;
const CraTitle = styled(DefaultTxt)`
    margin: 20px;
    width: 192px;
    height: 20px;
`;
const REQTitle = styled(DefaultTxt)`
    margin: 20px;
    color: red;
    width: 100%;
    height: 20px;
`;
const RECTitle = styled(DefaultTxt)`
    margin: 20px;
    color: blue;
    width: 100%;
    height: 20px;
`;
const Element = styled.div`
    margin: 20px;
    display: block;
`;


export const CheckList: React.FC<CheckListProps> = ({
    CRATitle,
    ReqTitle,
    RecTitle,
    ReqInfoArr,
    RecInfoArr,
}): React.ReactElement => {

    function checkHandler() {
        console.log('changed');
    }

    return (
        <Wrapper>
            <CraTitle>{CRATitle}</CraTitle>
            <REQTitle>{ReqTitle}</REQTitle>
            {Object.keys(ReqInfoArr).map((key) => (
                <Element>
                    <Checkbox
                        label={ReqInfoArr[key].label}
                        value={ReqInfoArr[key].value}
                        onChange={checkHandler}
                        name="checkbox"
                    />
                </Element>
            ))}
            <RECTitle>{RecTitle}</RECTitle>
            {Object.keys(RecInfoArr).map((key) => (
                <Element>
                    <Checkbox
                        label={RecInfoArr[key].label}
                        value={RecInfoArr[key].value}
                        onChange={checkHandler}
                        name="checkbox"
                    />
                </Element>
            ))}
        </Wrapper>
    );
};
