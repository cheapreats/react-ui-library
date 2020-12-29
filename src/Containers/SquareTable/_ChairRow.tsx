import React from 'react';
import styled from 'styled-components';
import { Chair, IChair } from '../Chair';

type Position = 'top' | 'bottom' | 'left' | 'right';

type getChairsTopBottomType = (array: Array<IChair>) => JSX.Element[];

type getChairsLeftRightType = (array: Array<IChair>) => JSX.Element[];

type generateKeyType = (pre: string) => string;

type chairRowSwitchType = () => JSX.Element;

interface IChairRow {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;
}

/**
 * ChairRow component for chair placement around tables
 */
export const ChairRow: React.FC<IChairRow> = ({
    position = 'top',
    chairs = [],
    relativeSize = 1.0,
    ...props
}) => {
    /**
     * Returns the chairs for the top and bottom rows
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - chairs on top and bottom row
     */
    const getChairsTopBottom: getChairsTopBottomType = (array) => {
        return array.map((i) => (
            <ChairCol key={generateKey(position + i)}>
                <Chair
                    position={i.position}
                    occupiedBy={i.occupiedBy}
                    isSeated={i.isSeated}
                    isVisible={i.isVisible}
                    relativeSize={relativeSize}
                />
            </ChairCol>
        ));
    };

    /**
     * Return the chairs for the left and right rows
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - chairs on right and left row
     */
    const getChairsLeftRight: getChairsLeftRightType = (array) => {
        return array.map((i) => (
            <SideChairRow
                relativeSize={relativeSize}
                key={generateKey(position + i)}
            >
                <SideChairCentering>
                    <Chair
                        position={i.position}
                        occupiedBy={i.occupiedBy}
                        isSeated={i.isSeated}
                        isVisible={i.isVisible}
                        relativeSize={relativeSize}
                    />
                </SideChairCentering>
            </SideChairRow>
        ));
    };

    /**
     * Generates a unique key based on a string and a current timestamp
     * @param pre - a string to append to timestamp
     * @returns {string} a unique key
     */
    const generateKey: generateKeyType = (pre) => {
        return `${pre}_${Math.random()}`;
    };

    /**
     * Returns a JSX element for the ChairRow with the correct styles
     * based on whether position is top/bottom or left/right
     * @returns {JSX.Element} the correct JSX.Element based on position
     */
    const chairRowSwitch: chairRowSwitchType = () => {
        switch (position) {
            case 'top':
                return (
                    <div>
                        <TopBottomRow
                            relativeSize={relativeSize}
                            chairNumOnSide={chairs.length}
                        >
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'bottom':
                return (
                    <div>
                        <TopBottomRow
                            relativeSize={relativeSize}
                            chairNumOnSide={chairs.length}
                        >
                            {getChairsTopBottom(chairs)}
                        </TopBottomRow>
                    </div>
                );
            case 'left':
                return <div>{getChairsLeftRight(chairs)}</div>;
            case 'right':
                return <div>{getChairsLeftRight(chairs)}</div>;
            default:
                return <div />;
        }
    };

    return <div {...props}>{chairRowSwitch()}</div>;
};

/**
 * variables for the styled components for the ChairRow component
 */

interface ITopBottomRow {
    chairNumOnSide: number;
    relativeSize: number;
}

const TopBottomRow = styled.div<ITopBottomRow>`
    display: flex;
    flex-wrap: wrap;
    width: ${({ chairNumOnSide, relativeSize }) =>
        chairNumOnSide * 20 * relativeSize}rem;
    margin-left: ${({ relativeSize }) => relativeSize * 2.7}rem;
`;

const ChairCol = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
`;

interface ISideChairRow {
    relativeSize: number;
}

const SideChairRow = styled.div<ISideChairRow>`
    display: flex;
    flex-wrap: wrap;
    margin-right: ${({ relativeSize }) => -15 * relativeSize}px;
    margin-left: ${({ relativeSize }) => -15 * relativeSize}px;
    height: ${({ relativeSize }) => 20 * relativeSize}rem;
`;

const SideChairCentering = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;
