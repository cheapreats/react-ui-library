import React, { useState } from 'react';
import styled from 'styled-components';
import { AddCircle }from '@styled-icons/ionicons-solid/AddCircle';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { ICategoryWithHoursTypes } from './types';
import { findActive } from './CategoryScheduleFunctions';
import { Modal } from '../Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button';
import { Select } from '../../Inputs/Select';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface EditTimeProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    addModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    editCategoryModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    FIRST_MODAL_HEADER: string,
    ADD_HOURS_BUTTON: string,
    EDIT_CATEGORY_BUTTON: string,
    CHANGE_ACTIVE: string,
    CHANGE_ACTIVE_SUBTITLE: string,
    SET_ACTIVE_BUTTON: string,
    allCategories: ICategoryWithHoursTypes[],
    setAllCategories: React.Dispatch<React.SetStateAction<ICategoryWithHoursTypes[]>>,
    activeCategory: string,
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>,
    activeCategorySchedule: ICategoryWithHoursTypes,
    setActiveCategorySchedule: React.Dispatch<React.SetStateAction<ICategoryWithHoursTypes>>,
};

const CATEGORY_INDEX = 0;
const CATEGORY_SCHEDULE = 1;

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
    activeCategorySchedule,
    setActiveCategorySchedule,
    allCategories,
    ...props
}): React.ReactElement => {
    const [addModalState, setAddModalState] = addModal;
    const [editCategoryModalState, setEditCategoryModalState] = editCategoryModal;

    const [selectActiveCategory, setSelectActiveCategory] = useState(findActive(allCategories).category);

    /**
     * Gets the active schedule 
     * @param {string} categoryName - Name of category user creates
     * @returns {ICategoryWithHoursTypes} 
     */
    const getActiveSchedule = (categoryName: string): ICategoryWithHoursTypes => {
        findActive(allCategories).isActive = false;
        setActiveCategory(categoryName);
        const activeSchedule = allCategories.find((el): ICategoryWithHoursTypes | null | boolean => categoryName === el.category);
        if (activeSchedule) {
            activeSchedule.isActive = true;
            return activeSchedule;
        }
        return activeCategorySchedule;
    };

    return (
        <StyledModal state={isVisible} {...props}>
            <StyledHeading type='h3'> 
                { FIRST_MODAL_HEADER } 
            </StyledHeading>
            <ButtonsContainer>
                <Section
                    as={Button}
                    icon={AddCircle}
                    onClick={(): void => {
                        setAddModalState(!addModalState);
                    }}
                > 
                    { ADD_HOURS_BUTTON }
                </Section>
                <Section
                    as={Button}
                    icon={Edit}
                    onClick={(): void => {
                        setEditCategoryModalState(!editCategoryModalState);
                    }}
                > 
                    { EDIT_CATEGORY_BUTTON }
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
                {Object.entries(allCategories).map((listAllCategories): React.ReactElement => {
                    return (
                        <option
                            key={listAllCategories[CATEGORY_INDEX]} 
                            value={listAllCategories[CATEGORY_SCHEDULE].category}
                        >
                            { listAllCategories[CATEGORY_SCHEDULE].category}
                        </option>
                    )
                })}
            </Section>
            <ButtonsContainer>
                <Section
                    as={Button}
                    onClick={(): void => {
                        setActiveCategorySchedule(getActiveSchedule(selectActiveCategory));
                    }}
                > 
                    { SET_ACTIVE_BUTTON }
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