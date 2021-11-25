import React, { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { ICategoryWithHoursTypes } from './interfaces';
import { Modal } from '../Modal/Modal';
import { ConfirmModal } from './ConfirmModal';
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
    allCategories: ICategoryWithHoursTypes[];
    activeCategory: number;
    setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
    saveStoreHours: () => void;
    resetForm: () => void;
    isDirty: boolean;
}

export const EditModal: React.FC<EditTimeProps> = ({
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
    saveStoreHours,
    resetForm,
    isDirty,
    ...props
}): React.ReactElement => {
    const [addModalState, setAddModalState] = addModal;
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [editCategoryModalState, setEditCategoryModalState] =
        editCategoryModal;
    const [selectActiveCategory, setSelectActiveCategory] =
        useState(activeCategory);
    const confirm = () => {
        saveStoreHours();
        setActiveCategory(selectActiveCategory);
    };

    const reject = () => {
        resetForm();
        setActiveCategory(selectActiveCategory);
    };

    const onSetNewActive = () => {
        if (isDirty) {
            setConfirmModalState(true);
        } else {
            setActiveCategory(selectActiveCategory);
        }
    };

    return (
        <StyledModal state={isVisible} {...props}>
            <StyledHeading type="h3">{FIRST_MODAL_HEADER}</StyledHeading>
            <ButtonsContainer>
                <Section
                    data-cy="editStoreAddHoursButton"
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
                placeholder={allCategories[selectActiveCategory].name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setSelectActiveCategory(parseFloat(e.target.value));
                }}
                value={allCategories[selectActiveCategory].name}
            >
                {Object.values(allCategories).map(
                    ({ name }, index): React.ReactElement => (
                        <option key={name} value={index}>
                            {name}
                        </option>
                    ),
                )}
            </Section>
            <ButtonsContainer>
                <Section
                    as={Button}
                    onClick={onSetNewActive}
                    disabled={activeCategory === selectActiveCategory}
                >
                    {SET_ACTIVE_BUTTON}
                </Section>
            </ButtonsContainer>
            <ConfirmModal
                isVisible={[confirmModalState, setConfirmModalState]}
                confirmDelete="Save or Discard current changes"
                yesButtonLabel="Save"
                noButtonLabel="Discard"
                onConfirm={confirm}
                onReject={reject}
            />
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
