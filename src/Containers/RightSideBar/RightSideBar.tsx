import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';

export interface reqCheckbox {
    label: string;
    value: boolean
}

export interface RequirementProps {
    title: string;
    checkboxArr: reqCheckbox[]
}

export const RightSideBar: React.FC<RequirementProps> = ({
    title,
    checkboxArr
}): React.ReactElement => {

    function checkHandler(){
        console.log('changed')
    }

    return (
        <Wrapper>
            <h1>{ title }</h1>
            {Object.values(checkboxArr).map((checkbox) => (
                <Checkbox
                    label={checkbox.label}
                    value={checkbox.value}
                    onChange={checkHandler}
                    name='checkbox'
                />
            ))};
        </Wrapper>
    );
};

const Wrapper = styled.div`
`;