import React from 'react';
import styled from 'styled-components';
import { Chair, IChair } from '../Chair/Chair';

type Position = 'top' | 'bottom' | 'left' | 'right';

type tableUseTypes =
    | 'AddTableButton'
    | 'TableForEditCanvas'
    | 'TableForManagement';

type getChairsTopBottomType = (array: Array<IChair>) => JSX.Element[];

type getChairsLeftRightType = (array: Array<IChair>) => JSX.Element[];

type generateChairRowKeyType = (pre: string) => string;

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
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;
}

/**
 * ChairRow component for chair placement around tables
 */
export const ChairRow: React.FC<IChairRow> = ({
    position = 'top',
    chairs = [],
    relativeSize = 1.0,
    tableUse = 'TableForManagement',
    selectedIndex = -1,
    ...props
}) => {
    /**
     * Returns the chairs for the top and bottom rows
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - chairs on top and bottom row
     */
    const getChairsTopBottom: getChairsTopBottomType = (array) =>
        array.map((i) => (
            <ChairCol key={generateChairRowKey(position + i)}>
                <Chair
                    position={i.position}
                    occupiedBy={i.occupiedBy}
                    isSeated={i.isSeated}
                    isVisible={i.isVisible}
                    relativeSize={relativeSize}
                    tableUse={tableUse}
                    chairIndex={i.chairIndex}
                    tableIndex={i.tableIndex}
                    onChairClick={i.onChairClick}
                    selectedIndex={selectedIndex}
                />
            </ChairCol>
        ));

    /**
     * Return the chairs for the left and right rows
     * @param array {Array<IChair>} - array of chairs
     * @return {JSX.Element[]} - chairs on right and left row
     */
    const getChairsLeftRight: getChairsLeftRightType = (array) =>
        array.map((i) => (
            <SideChairRow
                relativeSize={relativeSize}
                key={generateChairRowKey(position + i)}
            >
                <SideChairCentering>
                    <Chair
                        position={i.position}
                        occupiedBy={i.occupiedBy}
                        isSeated={i.isSeated}
                        isVisible={i.isVisible}
                        relativeSize={relativeSize}
                        tableUse={tableUse}
                        chairIndex={i.chairIndex}
                        tableIndex={i.tableIndex}
                        onChairClick={i.onChairClick}
                        selectedIndex={selectedIndex}
                    />
                </SideChairCentering>
            </SideChairRow>
        ));

    /**
     * Generates a unique key based on a string and a current timestamp
     * @param prefix - a string to append to timestamp
     * @returns {string} a unique key
     */
    const generateChairRowKey: generateChairRowKeyType = (prefix) =>
        `${prefix}_${Math.random()}`;

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
    ${({ chairNumOnSide, relativeSize }) => {
        const MIN_WIDTH_OF_ROW = 20;
        const BASE_MARGIN_LEFT_FOR_TOP_BOTTOM_ROW = 2.7;
        return `width: ${chairNumOnSide * MIN_WIDTH_OF_ROW * relativeSize}rem;
        margin-left: ${relativeSize * BASE_MARGIN_LEFT_FOR_TOP_BOTTOM_ROW}rem;`;
    }}
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
    ${({ relativeSize }) => {
        const WHITE_SPACE_BESIDE_VERTICAL_CHAIRS = -15;
        const MIN_SIDE_CHAIR_ROW_HEIGHT = 20;
        return `margin-right: ${
            WHITE_SPACE_BESIDE_VERTICAL_CHAIRS * relativeSize
        }px;
        margin-left: ${WHITE_SPACE_BESIDE_VERTICAL_CHAIRS * relativeSize}px;
        height: ${MIN_SIDE_CHAIR_ROW_HEIGHT * relativeSize}rem;`;
    }}
`;

const SideChairCentering = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;
