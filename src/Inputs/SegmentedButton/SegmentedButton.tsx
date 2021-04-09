import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { clickable, flex, transition } from '../../Utils/Mixins';

export interface ISegment {
    active?: boolean;
    name: string;
    icon?: StyledIcon;
}

export interface ISegmentedButtonProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    width?: string;
    height?: string;
    borderRadius?: string;
    onClick: (
        event: React.MouseEvent<Element, MouseEvent>,
        index: number,
    ) => void;
    segments: ISegment[];
}

/**
 *@type  {ISegment[]}
 *@param {segments} - objects with a name, active boolean, and icon properties;
 * */

export const SegmentedButton: React.FC<ISegmentedButtonProps> = ({
    width,
    height,
    segments,
    borderRadius = '99px',
    onClick,
    ...props
}): React.ReactElement => {
    const renderSegments = useCallback(
        () =>
            segments.map((segment, index) => (
                <Segment
                    active={segment.active}
                    onClick={(event) => onClick(event, index)}
                    key={segment.name}
                    id={segment.name}
                >
                    {segment.icon && <Icon as={segment.icon} />}
                    {segment.name}
                </Segment>
            )),
        [segments],
    );

    return (
        <SegmentContainer
            width={width}
            height={height}
            segmentLength={segments.length}
            borderRadius={borderRadius}
            {...props}
        >
            {renderSegments()}
        </SegmentContainer>
    );
};

interface ISegmentProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
}

interface ISegmentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
    segmentLength: number;
    borderRadius?: string;
}

const SegmentContainer = styled.div<ISegmentContainerProps>`
    display: grid;
    overflow: hidden;
    font-weight: bold;
    ${({ theme, width, height, segmentLength, borderRadius }) => `
        grid-template-columns: repeat(${segmentLength},1fr);
        grid-column-gap: 1px;
        background-color:${theme.colors.border};
        border: 1px solid ${theme.colors.border};
        border-radius: ${borderRadius};
        font-family: ${theme.font.family};
        width: ${width};
        height: ${height};
    `}
`;
const activeStyle = css`
    ${({ theme }) => `
        background-color: ${theme.colors.primary}; color: ${theme.colors.background};
    `}
`;
const inactiveStyle = css`
    ${({ theme }) => `
        background-color: ${theme.colors.background}; color: ${theme.colors.text};
    `}
`;
const Segment = styled.div<ISegmentProps>`
    cursor: pointer;
    ${transition(['background-color', 'opacity'])}
    ${flex('center')}
    ${clickable('#ffffff', 0.05)};
    ${({ active }) => (active ? activeStyle : inactiveStyle)}
`;
const Icon = styled.svg`
    width: 14px;
    height: 14px;
    margin-right: 8px;
`;
