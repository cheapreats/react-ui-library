import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';
import { List } from '../List';


export interface DefCheckbox {
    [key: string]: {
        label: string;
        value: boolean;
    }
}
export interface CheckListProps {
    title: string,
    CRATitle: string,
    ReqTitle: string,
    RecTitle: string,
    ReqInfoArr: DefCheckbox[]
    RecInfoArr: DefCheckbox[]
}
// STYLED COMPONENTS
const Wrapper = styled.div`
`;
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
    width: 192px;
    height: 20px;
`;
const REQTitle = styled(DefaultTxt)`
    width: 166px;
    height: 20px;
`;
const RECTitle = styled(DefaultTxt)`
    width: 166px;
    height: 20px;
`;
const Element = styled.div`
    display: block;
`;
// END OF STYLED COMPONENTS

const isToggleable = false;
const isLeftToggle = false;

export const CheckList: React.FC<CheckListProps> = ({
    title,
    CRATitle,
    ReqTitle,
    RecTitle,
    ReqInfoArr,
    RecInfoArr,
}): React.ReactElement => {
    const [loading, setLoading] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    function checkHandler(){
        console.log('changed')
    }

    return (
        <Wrapper>
            <List
                id='right-sidebar'
                columnWidth = '387px'
                loading={loading}
                cssPosition='absolute'
                margin='0'
                left='auto'
                right='0'
                isToggleable={isToggleable}
                isLeftToggle={isLeftToggle}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                header={(<h1>{ title }</h1>)}
            >
                <CraTitle>{ CRATitle }</CraTitle>
                <REQTitle>{ ReqTitle }</REQTitle>
                {Object.keys( ReqInfoArr ).map((key) => (
                    <Element>
                        <Checkbox
                            label={ReqInfoArr[key].label}
                            value={ReqInfoArr[key].value}
                            onChange={checkHandler}
                            name='checkbox'
                        />
                    </Element>
                ))}
                <RECTitle>{ RecTitle }</RECTitle>
                {Object.keys( RecInfoArr ).map((key) => (
                    <Element>
                        <Checkbox
                            label={RecInfoArr[key].label}
                            value={RecInfoArr[key].value}
                            onChange={checkHandler}
                            name='checkbox'
                        />
                    </Element>
                ))}
            </List>
        </Wrapper>
    );
};
