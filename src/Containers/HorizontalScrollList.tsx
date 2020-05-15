import React, { useState } from 'react';
import styled from 'styled-components';
import { flex, scroll } from '../Utils/Mixins';
import { Select } from '../Inputs/Select';

export interface ScrollListProps extends React.HTMLAttributes<HTMLDivElement> {
    labelArray: string[];
    menuName: string;
    menuWidth: number;
    labelPadding: string;
    hoveredStyle?: Function;
    selectedStyle?: Function;
    displaySelected?: boolean;
    displayDropDown?: boolean;
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
    menuWidth,
    hoveredStyle = defaultHoveredStyle,
    selectedStyle = defaultSelectedStyle,
    displaySelected = true,
    displayDropDown = true,
    ...props
}): React.ReactElement => {
    const [selectedLabel, setSelectedLabel] = useState('');
    return (
        <HorizontalListDiv {...props}>
            {displayDropDown && (
                <DropDownDiv menuWidth={menuWidth}>
                    <Select
                        placeholder={menuName}
                        onChange={({ target }: { target: any }) => {
                            setSelectedLabel(target.value);
                        }}
                        value={displaySelected ? selectedLabel : menuName}
                    >
                        {labelArray.map(label => (
                            <option value={label}>{label}</option>
                        ))}
                    </Select>
                </DropDownDiv>
            )}
            <HorizontalList>
                {labelArray.map((label, index) => (
                    <HorizontalListItem
                        key={label + index}
                        onClick={() => setSelectedLabel(label)}
                        label={label}
                        hoveredStyle={hoveredStyle}
                        selectedStyle={selectedStyle}
                        isSelected={label == selectedLabel ? true : false}
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
