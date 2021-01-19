import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BusinessTime } from '@styled-icons/fa-solid/BusinessTime';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { ICategoryWithHoursTypes, ICategoryNew } from './types';
import { findActive } from './CategoryScheduleFunctions';
import { TimeDisplay } from './TimeDisplay';
import { ErrorModal } from './ErrorModal';
import { ConfirmModal } from './ConfirmModal';
import { EditTimesModal } from './EditTimesModal';
import { EditCategoryModal } from './EditCategoryModal';
import { CreateHoursModal } from './CreateHoursModal';
import { SettingsCard } from '../SettingsCard/SettingsCard';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button/Button';
import { Mixins } from '../../Utils';
import { I_DICT } from '../../Utils/Constants/dict';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface StoreHoursListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    allCategories: ICategoryNew;
    textHeaders: I_DICT;
    width: string;
}

export const StoreHoursList: React.FC<StoreHoursListProps> = ({
    allCategories,
    textHeaders,
    width
}): React.ReactElement => {
    const editModal = useState(false);
    const [editModalState, setEditModalState] = editModal;
    const addModal = useState(false);
    const editCategoryModal = useState(false);
    const confirmModal = useState(false);
    const errorModal = useState(false);

    const [allCategoriesWithHours, setAllCategoriesWithHours] = useState<ICategoryNew>(allCategories);
    const [deletedCategory, setDeletedCategory] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    const [error] = useState('');

    const [is24, setIs24] = useState(true);
    const handleRemoveHours = (day: string, hoursIndex: number) => {
        const allCategoriesWithHoursCopy = {...allCategoriesWithHours};
        // Should remove the hours index of the array
        allCategoriesWithHoursCopy[activeCategory][day].splice(hoursIndex, 1)
        setAllCategoriesWithHours(allCategoriesWithHoursCopy);
    }

    useEffect((): void => {
        const initialActive: string | undefined = Object.keys(allCategories)[0];
        if(initialActive) {
            setActiveCategory(initialActive);
        }
    }, []);

    return (
        <>
            <SettingsCard
                heading={textHeaders.TITLES.HEADING}
                icon={BusinessTime}
                width={width}
            >
                <ButtonsContainer>
                    <Section
                        as={Button}
                        icon={Edit}
                        onClick={(): void => {
                            setEditModalState(!editModalState);
                        }}
                    >
                        {textHeaders.BUTTONS.EDIT}
                    </Section>
                    <Section as={Button} onClick={(): void => setIs24(!is24)}>
                        {textHeaders.BUTTONS.TOGGLE}
                    </Section>
                </ButtonsContainer>
                <StyledHeading type="h6">
                    {textHeaders.TITLES.OPERATIONS}
                    {allCategoriesWithHours[activeCategory].category}
                </StyledHeading>
                <TimeDisplay
                    allCategoriesWithHours={allCategoriesWithHours[activeCategory].hoursByDay}
                    handleRemoveHours={handleRemoveHours}
                    is24={is24}
                />
            </SettingsCard>
            <EditTimesModal
                isVisible={editModal}
                FIRST_MODAL_HEADER={textHeaders.TITLES.FIRST_MODAL_HEADER}
                allCategories={allCategoriesWithHours}
                setAllCategories={setAllCategoriesWithHours}
                addModal={addModal}
                editCategoryModal={editCategoryModal}
                ADD_HOURS_BUTTON={textHeaders.BUTTONS.ADD_HOURS}
                EDIT_CATEGORY_BUTTON={textHeaders.BUTTONS.EDIT_CATEGORIES}
                CHANGE_ACTIVE={textHeaders.TITLES.CHANGE_ACTIVE}
                CHANGE_ACTIVE_SUBTITLE={
                    textHeaders.TITLES.CHANGE_ACTIVE_SUBTITLE
                }
                SET_ACTIVE_BUTTON={textHeaders.BUTTONS.SET_ACTIVE}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <EditCategoryModal
                isVisible={editCategoryModal}
                thirdModalHeader={textHeaders.TITLES.THIRD_MODAL_HEADER}
                CANNOT_ADD_EMPTY={textHeaders.ERRORS.CANNOT_ADD_EMPTY}
                CATEGORY_EXISTS={textHeaders.ERRORS.CATEGORY_EXISTS}
                ALL_CATEGORIES={textHeaders.TITLES.ALL_CATEGORIES}
                ADD_CATEGORIES_SUBTITLE={
                    textHeaders.TITLES.ALL_CATEGORIES_SUBTITLE
                }
                CANNOT_DELETE_ACTIVE={
                    textHeaders.ERRORS.CANNOT_DELETE_ACTIVE_CATEGORY
                }
                ADD_CATEGORY_BUTTON={textHeaders.BUTTONS.ADD_CATEGORY}
                allCategories={allCategoriesWithHours}
                setAllCategories={setAllCategoriesWithHours}
                activeCategory={activeCategory}
                isConfirmModal={confirmModal}
                setDeletedCategory={setDeletedCategory}
            />
            <CreateHoursModal
                isVisible={addModal}
                MODAL_HEADER={textHeaders.TITLES.SECOND_MODAL_HEADER}
                SELECT_A_DAY_TITLE={textHeaders.TITLES.SELECT_A_DAY}
                fromTimeTooBigError={textHeaders.ERRORS.FROM_TIME_TOO_BIG}
                toTimeTooSmallError={textHeaders.ERRORS.TO_TIME_TOO_SMALL}
                SELECT_A_CATEGORY={textHeaders.TITLES.SELECT_A_CATEGORY}
                ADD_HOURS_BUTTON={textHeaders.BUTTONS.ADD_HOURS}
                errorMessage={textHeaders.ERRORS.ONLY_ONE_TIME}
                allCategories={allCategoriesWithHours}
                activeCategory={activeCategory}
            />
            <ConfirmModal
                isVisible={confirmModal}
                confirmDelete={textHeaders.TITLES.CONFIRM_DELETE}
                yesButtonLabel={textHeaders.BUTTONS.YES}
                noButtonLabel={textHeaders.BUTTONS.NO}
                allCategories={allCategoriesWithHours}
                setAllCategories={setAllCategoriesWithHours}
                deletedCategory={deletedCategory}
            />
            <ErrorModal modalState={errorModal} errorMessage={error} />
        </>
    );
};

const ButtonsContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const Section = styled.div`
    margin: 5px;
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
`;
