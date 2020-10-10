import React from 'react';
import styled from 'styled-components';
import { Requirement } from './Requirement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Checkbox } from '../../Inputs/Checkbox';

export interface RightSideBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
};

export const RightSideBar: React.FC<RightSideBarProps> = ({
    ...props
}): React.ReactElement => {

    function checkHandler(){
        console.log('checkHandler function triggered!')
    };

    return (
        <Wrapper {...props}>
            {Object.values(Requirement).map((requirement) => (
                <Checkbox
                    label={requirement.key}
                    onChange={checkHandler}
                    value={requirement.value}
                    name='checkbox'
                />
            ))}
        </Wrapper>  
    )
};

const Wrapper = styled.div`
`;