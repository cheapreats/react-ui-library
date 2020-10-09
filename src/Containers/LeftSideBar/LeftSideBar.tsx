import React, { useState } from 'react';
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
import { ReceiptElements, draggableComponentsObj } from './ReceiptElements';
import { CollapsibleHeader } from './CollapsibleHeader';
import { List } from '../List';
import { SearchBar } from '../../Inputs/SearchBar';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

const isToggleable = true;
const isLeftToggle = true;
const dropDisabled = true;
const backgroundColor = '#f5f5f5';
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

export const LeftSideBar: React.FC<LeftSideBarProps> = ({
    ...props
}): React.ReactElement => {
    const [loading, setLoading] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchOption, setSearchOption] = useState<HTMLInputElement>();
      
    const onDragEnd = () => {
        console.log('hello');
    };

    return (
        <Wrapper {...props}>
            <List 
                id='left-sidebar'
                loading={loading}
                cssPosition='absolute'
                margin='0'
                left='0'
                right='auto'
                onToggleTranslateXAxis='-100%'
                isToggleable={isToggleable}
                isLeftToggle={isLeftToggle}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                backgroundColor={backgroundColor}
                header={(
                    <>
                        <StyledSearchBar
                            placeholder='Search'
                            backgroundColor='white'
                            borderRadius='40px'
                            onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setSearchOption(e.target);
                            }}
                            onChange={(e: { value: string, name: string }): void => {
                                setSearchValue(e.name);
                            }}
                            value={searchValue}
                        >
                            {Object.values(draggableComponentsObj).map((draggable) => (
                                <option value={draggable.key}>
                                    {draggable.field}
                                </option>
                            ))}
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
                                style={getStyle(snapshot.isDraggingOver)}
                            >
                                {Object.values(ReceiptElements).map((ReceiptElement, index) => (
                                    <CollapsibleHeader 
                                        key={ReceiptElement.key}
                                        icon={iconsList[index]}
                                        category={ReceiptElement.editorCategory}
                                    />
                                ))}
                                { provided.placeholder }
                            </Wrapper>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </Wrapper>  
    )
};

const Wrapper = styled.div`
`;
const getStyle = (isDraggingOver: boolean):{} => ({
    // will add styling
});
const StyledSearchBar = styled(SearchBar)`
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;