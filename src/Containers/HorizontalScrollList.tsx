import React, { useState } from 'react';
import styled from 'styled-components';
import { flex, scroll } from '../Utils/Mixins';
import { Select } from '../Inputs/Select';

export interface ScrollListProps {
    labelArray: string[];
    menuName: string;
    menuWidth: number;
    labelPadding: string;
    hoveredStyle?: Function;
    selectedStyle?: Function;
}

export interface ScrollListDivProps {
    menuWidth?: number;
}

export interface ListItemProps {
    label: string;
    hoveredStyle: Function;
    selectedStyle: Function;
    isSelected: boolean;
}

export const HorizontalScrollList: React.FC<ScrollListProps> = ({
    labelArray,
    menuName = 'Menu',
    hoveredStyle,
    menuWidth,
    selectedStyle,
    ...props
}): React.ReactElement => {
    const [hoveredLabel, setHoveredLabel] = useState('string');
    return (
        <HorizontalListDiv {...props}>
            <DropDownDiv menuWidth={menuWidth}>
                <Select
                    placeholder={menuName}
                    onChange={({ target }: { target: any }) => {
                        console.log(target.value);
                        setHoveredLabel(target.value);
                    }}
                    value={hoveredLabel}
                >
                    {labelArray.map(label => (
                        <option value={label}>{label}</option>
                    ))}
                </Select>
            </DropDownDiv>
            <HorizontalList>
                {labelArray.map((label, index) => (
                    <HorizontalListItem
                        key={label + index}
                        onClick={() => setHoveredLabel(label)}
                        label={label}
                        hoveredStyle={
                            hoveredStyle ? hoveredStyle : defaultHoveredStyle
                        }
                        selectedStyle={
                            selectedStyle ? selectedStyle : defaultSelectedStyle
                        }
                        isSelected={label == hoveredLabel ? true : false}
                    >
                        {label}
                    </HorizontalListItem>
                ))}
            </HorizontalList>
        </HorizontalListDiv>
    );
};

const defaultHoveredStyle = () => `
    color: red;
`;

const defaultSelectedStyle = () => `
    color: red;
    font-weight: bold;
`;

const DropDownDiv = styled.div<ScrollListDivProps>`
    ${({ menuWidth }): string =>
        menuWidth
            ? `
           width: ${menuWidth}px;
            `
            : 'width: auto'};
`;

const HorizontalList = styled.ul`
    ${scroll}
    ${flex()}
    overflow: auto;
    list-style-type: none;
    margin-left: 20px;
    padding: 0;
`;

const HorizontalListItem = styled.li<ListItemProps>`
    ${flex()}
    position: relative;
    cursor: pointer;
    padding: 10px;
    &:hover {
        ${({ hoveredStyle, isSelected }): string =>
            isSelected ? `` : `${hoveredStyle()}`}
    }

    ${({ isSelected, selectedStyle }): string =>
        isSelected ? `${selectedStyle()}` : ``};
`;

const HorizontalListDiv = styled.div`
    ${flex('flex-start', 'center')}
`;
