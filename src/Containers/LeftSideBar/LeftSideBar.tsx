import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextFields } from '@styled-icons/material/TextFields';
import { ImageAlt } from '@styled-icons/boxicons-solid/ImageAlt';
import { Layout3 } from '@styled-icons/remix-fill/Layout3';
import { ListNumbered } from '@styled-icons/icomoon/ListNumbered';
import { Dollar } from '@styled-icons/boxicons-regular/Dollar';
import { Qrcode } from '@styled-icons/icomoon/Qrcode';
import { Settings } from '@styled-icons/ionicons-sharp/Settings';
import { 
    DragDropContext, 
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { ReceiptElements, draggableComponentsObj, ElementWithCategory } from './ReceiptElements';
import { CollapsibleHeader } from './CollapsibleHeader';
import { List, ListToggle } from '../List';
import { SearchBar } from '../../Inputs/SearchBar';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

const loading = false;
const isLeftToggle = true;
const dropDisabled = true;
const GREY_BACKGROUND_COLOR = '#f2f2f2';
const iconsList = [
    TextFields,
    ImageAlt,
    Layout3,
    ListNumbered,
    Dollar,
    Qrcode,
    Settings
]

export interface LeftSideBarProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {

};

interface WrapperProps {
    isDragging: boolean
};


export const LeftSideBar: React.FC<LeftSideBarProps> = ({
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
      
    const onDragEnd = () => {
        console.log('I have been dragged.');
    };

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
                setIsOpen={setIsOpen}
                toggleComponent={(
                    <ListToggle
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isLeftToggle={isLeftToggle}
                    />
                )}
                backgroundColor={GREY_BACKGROUND_COLOR}
                header={(
                    <>
                        <StyledSearchBar
                            placeholder='Search'
                            backgroundColor='white'
                            borderRadius='40px'
                            onChange={(e: { value: string, name: string }): void => {
                                setSearchValue(e.name);
                            }}
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
                    onDragEnd={onDragEnd}
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
                                        isCollapsedProp={[isCollapsedArr, setIsCollapsedArr]}
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