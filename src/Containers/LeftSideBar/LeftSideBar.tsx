import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { 
    DragDropContext, 
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { IDraggableComponent, IElementWithCategory, ILeftSideBarInterface } from './ReceiptElements';
import { CollapsibleHeader } from './CollapsibleHeader';
import { List, ListToggle } from '../List';
import { SearchBar } from '../../Inputs/SearchBar';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

const loading = false;
const isLeftToggle = true;

export interface LeftSideBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    ReceiptElements: ILeftSideBarInterface,
    ElementWithCategory: IElementWithCategory [],
    onDrag: () => void,
    iconsList: StyledIcon[],
    backgroundColor?: string,
    hasIcon?: boolean,
    dropDisabled?: boolean
};

interface WrapperProps {
    isDragging: boolean
};

export const LeftSideBar: React.FC<LeftSideBarProps> = ({
    ReceiptElements,
    ElementWithCategory,
    onDrag,
    iconsList,
    backgroundColor = '#f2f2f2',
    hasIcon = false,
    dropDisabled = false,
    ...props
}): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [isCollapsedArr, setIsCollapsedArr] = useState(Array(Object.values(ReceiptElements).length).fill(false))

    useEffect((): void => {
        ElementWithCategory.forEach((el, index) => {
            if(el.field.includes(searchValue)) {
                setIsCollapsedArr(isCollapsedArr.map((isCollapsed, idx) => {
                    if(idx === index) return true;
                    return false;
                }));
            }
        })
    }, [searchValue]);
      
    const draggableComponentsObj: IDraggableComponent = Object.values(ReceiptElements).map((ReceiptElement)  => {
        return ReceiptElement.draggableComponents;
    }).reduce((prev, current) => {
        return {...prev, ...current};
    });

    return (
        <div {...props}>
            <List 
                id='left-sidebar'
                loading={loading}
                cssPosition='absolute'
                margin='0'
                left='0'
                right='auto'
                onCloseTranslateXAxis='-100%'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                toggleComponent={(
                    <ListToggle
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isLeftToggle={isLeftToggle}
                    />
                )}
                backgroundColor={backgroundColor}
                header={(
                    <>
                        <StyledSearchBar
                            placeholder='Search'
                            backgroundColor='white'
                            borderRadius='40px'
                            onChange={(e: { value: string, name: string }): void => {
                                setSearchValue(e.name);
                            }}
                            hasIcon={hasIcon}
                            value={searchValue}
                        >
                            {Object.values(draggableComponentsObj).map((draggable) => {
                                return (
                                    <option value={draggable.key}>
                                        {draggable.field}
                                    </option>
                                );
                            })}
                        </StyledSearchBar>
                    </>
                )}
            >
                <DragDropContext
                    onDragEnd={onDrag}
                >
                    <Droppable
                        droppableId='LEFT-BAR'
                        isDropDisabled={dropDisabled}
                    >
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                            <Wrapper
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDragging={snapshot.isDraggingOver}
                            >
                                {Object.values(ReceiptElements).map((ReceiptElement, index) => (
                                    <CollapsibleHeader 
                                        key={ReceiptElement.key}
                                        icon={iconsList[index]}
                                        category={ReceiptElement.editorCategory}
                                        position={index}
                                        isCollapsedArr={isCollapsedArr}
                                        setIsCollapsedArr={setIsCollapsedArr}
                                        ReceiptElements={ReceiptElements}
                                    />
                                ))}
                                { provided.placeholder }
                            </Wrapper>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </div>  
    )
};

const Wrapper = styled.div<WrapperProps>`
`;
const StyledSearchBar = styled(SearchBar)`
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;