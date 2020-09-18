import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BusinessTime } from '@styled-icons/fa-solid/BusinessTime';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { ICategoryWithHoursTypes } from './types';
import { findActive } from './CategoryScheduleFunctions';
import { convertTime } from './TimeFunctions';
import { ErrorModal } from './ErrorModal';
import { ConfirmModal } from './ConfirmModal';
import { EditTimesModal } from './EditTimesModal';
import { EditCategoryModal } from './EditCategoryModal';
import { CreateHoursModal } from './CreateHoursModal';
import { SettingsCard } from '../SettingsCard';
import { Modal } from '../Modal';
import { Tag } from '../Tag';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button';
import { Mixins } from '../../Utils';
import { I_DICT } from '../../Utils/Constants/dict';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface StoreHoursListProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    allCategories: ICategoryWithHoursTypes[],
    textHeaders: I_DICT
};

const CHECKBOX_DAY = 0;
const CHECKBOX_TIME = 1;
const FIRST_TIME = 0;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;

export const StoreHoursList: React.FC<StoreHoursListProps> = ({
    allCategories,
    textHeaders
}): React.ReactElement => {
    const editModal = useState(false);
    const [editModalState, setEditModalState] = editModal;
    const addModal = useState(false);
    const editCategoryModal = useState(false);
    const confirmModal = useState(false);
    const errorModal = useState(false);

    const [allCategoriesWithHours, setAllCategoriesWithHours] = useState<ICategoryWithHoursTypes []>(allCategories);
    const [deletedCategory, setDeletedCategory] = useState('');
    
    const [activeCategory, setActiveCategory] = useState(findActive(allCategoriesWithHours).category);
    const [activeCategorySchedule, setActiveCategorySchedule] = useState<ICategoryWithHoursTypes>(findActive(allCategoriesWithHours));

    const [error, setError] = useState('');

    const [is24, setIs24] = useState(true);
    
    /**
     * Gets the active schedule 
     * @param {string} categoryName - Name of category user creates
     * @returns {ICategoryWithHoursTypes} 
     */
    const getActiveSchedule = (categoryName: string): ICategoryWithHoursTypes => {
        findActive(allCategoriesWithHours).isActive = false;
        setActiveCategory(categoryName);
        const activeSchedule = allCategoriesWithHours.find((el): ICategoryWithHoursTypes | null | boolean => categoryName === el.category);
        if (activeSchedule) {
            activeSchedule.isActive = true;
            return activeSchedule;
        }
        return activeCategorySchedule;
    };

    useEffect((): void => {
        setActiveCategorySchedule(getActiveSchedule(activeCategory))
    }, [activeCategorySchedule]);

    return (    
        <>
            <SettingsCard heading={textHeaders.TITLES.HEADING} icon={BusinessTime}>
                <ButtonsContainer>
                    <Section
                        as={Button}
                        icon={Edit}
                        onClick={(): void => {
                            setEditModalState(!editModalState);
                        }}
                    >
                        { textHeaders.BUTTONS.EDIT }
                    </Section>
                    <Section
                        as={Button}
                        onClick={(): void => setIs24(!is24)}
                    > 
                        { textHeaders.BUTTONS.TOGGLE } 
                    </Section>
                </ButtonsContainer>
                <StyledHeading type='h6'>
                    { textHeaders.TITLES.OPERATIONS }
                    { activeCategorySchedule.category }
                </StyledHeading>
                {Object.entries(activeCategorySchedule.hoursByDay).map((day): React.ReactElement | null => {
                    const capitalDay = day[CHECKBOX_DAY].replace(MATCH_FIRST_LETTER_PATTERN, (chr: string): string =>
                        chr.toUpperCase(),
                    );
                    return day[CHECKBOX_TIME].length > 0 ? (
                        <div>
                            <Heading bold size='0.95em' padding='5'>
                                { capitalDay }
                            </Heading>
                            <Section
                                as={Tag}
                                key={day[CHECKBOX_DAY]}
                                onClick={(): void => {
                                    const firstTime = activeCategorySchedule.hoursByDay[day[CHECKBOX_DAY]];
                                    firstTime.pop() // only works with one time tag
                                    setActiveCategorySchedule({
                                        ...activeCategorySchedule,
                                        [day[CHECKBOX_DAY]]: []
                                    });
                                }}
                            >
                                { convertTime(day[CHECKBOX_TIME][FIRST_TIME].from, is24) } 
                                {` - `} 
                                { convertTime(day[CHECKBOX_TIME][FIRST_TIME].to, is24) }
                            </Section>
                        </div>
                    ) : (
                        <Heading bold size='0.95em' margin='0'>
                            { capitalDay }
                        </Heading>
                    )
                })}
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
                CHANGE_ACTIVE_SUBTITLE={textHeaders.TITLES.CHANGE_ACTIVE_SUBTITLE}
                SET_ACTIVE_BUTTON={textHeaders.BUTTONS.SET_ACTIVE}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeCategorySchedule={activeCategorySchedule}
                setActiveCategorySchedule={setActiveCategorySchedule}
            />
            {/* <StyledModal state={editModal}>
                <StyledHeading type='h3'> 
                    { textHeaders.TITLES.FIRST_MODAL_HEADER } 
                </StyledHeading>
                <ButtonsContainer>
                    <Section
                        as={Button}
                        icon={Add}
                        onClick={(): void => {
                            setAddModalState(!addModalState);
                        }}
                    > 
                        { textHeaders.BUTTONS.ADD_HOURS }
                    </Section>
                    <Section
                        as={Button}
                        icon={Edit}
                        onClick={(): void => {
                            setEditCategoryModalState(!editCategoryModalState);
                        }}
                    > 
                        { textHeaders.BUTTONS.EDIT_CATEGORIES }
                    </Section>
                </ButtonsContainer>
                <Section
                    as={Select}
                    label={textHeaders.TITLES.CHANGE_ACTIVE}
                    description={textHeaders.TITLES.CHANGE_ACTIVE_SUBTITLE}
                    placeholder={activeCategory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setSelectActiveCategory(e.target.value);
                    }}
                    value={selectActiveCategory}
                >
                    {Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
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
                        { textHeaders.BUTTONS.SET_ACTIVE }
                    </Section>
                </ButtonsContainer>        
            </StyledModal> */}
            <EditCategoryModal
                isVisible={editCategoryModal}
                thirdModalHeader={textHeaders.TITLES.THIRD_MODAL_HEADER}
                CANNOT_ADD_EMPTY={textHeaders.ERRORS.CANNOT_ADD_EMPTY}
                CATEGORY_EXISTS={textHeaders.ERRORS.CATEGORY_EXISTS}
                ALL_CATEGORIES={textHeaders.TITLES.ALL_CATEGORIES}
                ADD_CATEGORIES_SUBTITLE={textHeaders.TITLES.ALL_CATEGORIES_SUBTITLE}
                CANNOT_DELETE_ACTIVE={textHeaders.ERRORS.CANNOT_DELETE_ACTIVE_CATEGORY}
                ADD_CATEGORY_BUTTON={textHeaders.BUTTONS.ADD_CATEGORY}
                allCategories={allCategoriesWithHours}
                setAllCategories={setAllCategoriesWithHours}
                activeCategory={activeCategory}
                isConfirmModal={confirmModal}
                setDeletedCategory={setDeletedCategory}
            />
            <CreateHoursModal
                isVisible={addModal}
                modalHeader={textHeaders.TITLES.SECOND_MODAL_HEADER} 
                selectADayTitle={textHeaders.TITLES.SELECT_A_DAY}
                fromTimeTooBigError={textHeaders.ERRORS.FROM_TIME_TOO_BIG}
                selectACategory={textHeaders.TITLES.SELECT_A_CATEGORY}
                addHoursButton={textHeaders.BUTTONS.ADD_HOURS}
                errorMessage={textHeaders.ERRORS.ONLY_ONE_TIME}
                allCategories={allCategoriesWithHours}
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
            <ErrorModal
                modalState={errorModal}
                errorMessage={error}
            />
        </>
    );
};

const ContainerPadding = css`
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
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
const Section = styled.div`
    margin: 5px;
`;
const StyledModal = styled(Modal)`
    max-height: 70%;
    ${ContainerPadding};
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
`;