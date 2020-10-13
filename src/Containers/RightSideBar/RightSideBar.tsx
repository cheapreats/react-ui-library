import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../../Inputs/Checkbox';

export interface reqCheckbox {
    [key: string]: {
        label: string;
        value: boolean
    }
}

export interface RequirementProps {
    title: string;
    checkboxArr: reqCheckbox
}

export const Checkboxes: RequirementProps = {
    title: 'Requirement',
    checkboxArr: {
        NAME_OF_BUSINESS: {
            label: 'Name of Business',
            value: false
        },
    }
}

export const RightSideBar: React.FC<RequirementProps> = ({
    title,
}): React.ReactElement => {

    function checkHandler(){
        console.log('changed')
    }

    return (
        <Wrapper>
            <h1>{ Checkboxes.title }</h1>
            {Object.values(Checkboxes.checkboxArr).map((key) => (
                <Checkbox
                    label={key.label}
                    value={key.value}
                    onChange={checkHandler}
                    name='checkbox'
                />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
`;