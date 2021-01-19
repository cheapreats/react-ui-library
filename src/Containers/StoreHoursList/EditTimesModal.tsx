import React, { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { ICategoryWithHoursTypes, ICategoryNew } from './types';
import { findActive } from './CategoryScheduleFunctions';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button/Button';
import { Select } from '../../Inputs/Select/Select';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface EditTimeProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    addModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    editCategoryModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    FIRST_MODAL_HEADER: string;
    ADD_HOURS_BUTTON: string;
    EDIT_CATEGORY_BUTTON: string;
    CHANGE_ACTIVE: string;
    CHANGE_ACTIVE_SUBTITLE: string;
    SET_ACTIVE_BUTTON: string;
    allCategories: ICategoryNew;
    setAllCategories: React.Dispatch<React.SetStateAction<ICategoryNew>>
    activeCategory: string;
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const EditTimesModal: React.FC<EditTimeProps> = ({
    isVisible,
    addModal,
    editCategoryModal,
    FIRST_MODAL_HEADER,
    ADD_HOURS_BUTTON,
    EDIT_CATEGORY_BUTTON,
    CHANGE_ACTIVE,
    CHANGE_ACTIVE_SUBTITLE,
    SET_ACTIVE_BUTTON,
    activeCategory,
    setActiveCategory,
    allCategories,
    ...props
}): React.ReactElement => {
    const [addModalState, setAddModalState] = addModal;
    const [
        editCategoryModalState,
        setEditCategoryModalState,
    ] = editCategoryModal;

    const [selectActiveCategory, setSelectActiveCategory] = useState(activeCategory);


    return (
        <StyledModal state={isVisible} {...props}>
            <StyledHeading type="h3">{FIRST_MODAL_HEADER}</StyledHeading>
            <ButtonsContainer>
                <Section
                    as={Button}
                    icon={Add}
                    onClick={(): void => {
                        setAddModalState(!addModalState);
                    }}
                >
                    {ADD_HOURS_BUTTON}
                </Section>
                <Section
                    as={Button}
                    icon={Edit}
                    onClick={(): void => {
                        setEditCategoryModalState(!editCategoryModalState);
                    }}
                >
                    {EDIT_CATEGORY_BUTTON}
                </Section>
            </ButtonsContainer>
            <Section
                as={Select}
                label={CHANGE_ACTIVE}
                description={CHANGE_ACTIVE_SUBTITLE}
                placeholder={activeCategory}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setSelectActiveCategory(e.target.value);
                }}
                value={selectActiveCategory}
            >
                {Object.values(allCategories).map(
                    ({category}): React.ReactElement => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ),
                )}
            </Section>
            <ButtonsContainer>
                <Section
                    as={Button}
                    onClick={(): void => setActiveCategory(selectActiveCategory)}
                >
                    {SET_ACTIVE_BUTTON}
                </Section>
            </ButtonsContainer>
        </StyledModal>
    );
};
const Section = styled.div`
    margin: 5px;
`;
const ButtonsContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const StyledModal = styled(Modal)`
    max-height: 70%;
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
`;
