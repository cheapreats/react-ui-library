import React, { useState } from 'react';
import styled from 'styled-components';
import { flex, position, transition, scroll } from '../Utils/Mixins';
import { Select } from '../Inputs/Select';

export interface ScrollListProps {
    labelArray: string[];
    menuName: string;
}

export interface ListItemProps {
    hoveredLabelProp: string;
    label: string;
}

export const HorizontalScrollList: React.FC<ScrollListProps> = ({
    labelArray,
    menuName = 'Menu',
    ...props
}): React.ReactElement => {
    const [hoveredLabel, setHoveredLabel] = useState('string');
    return (
        <HorizontalListDiv>
            <DropDownDiv>
                <Select
                    name="demo"
                    placeholder={menuName}
                    onChange={({ target }) => {
                        console.log(target.value);
                        setHoveredLabel(target.value);
                    }}
                >
                    {labelArray.map(label => (
                        <option value={label}>{label}</option>
                    ))}
                </Select>
            </DropDownDiv>
            <HorizontalList>
                {labelArray.map(label => (
                    <HorizontalListItem
                        label={label}
                        hoveredLabelProp={hoveredLabel}
                    >
                        {label}
                    </HorizontalListItem>
                ))}
            </HorizontalList>
        </HorizontalListDiv>
    );
};

const DropDownDiv = styled.div`
    min-width: 100px;
`;

const HorizontalList = styled.ul`
    ${scroll}
    ${flex()}
    overflow: auto;
    list-style-type: none;
    padding-left: 10px;
`;

const HorizontalListItem = styled.li<ListItemProps>`
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    padding: 0px 10px 10px 0px;
`;

const HorizontalListDiv = styled.div`
    ${flex()}
    align-items: center;
`;
