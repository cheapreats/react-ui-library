import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BusinessTime } from '@styled-icons/fa-solid/BusinessTime';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { CircleWithCross } from '@styled-icons/entypo/CircleWithCross';
import { Alert } from './Alert';
import { ICategoryWithHoursTypes, ITimeTypes } from './types';
import { convertTime } from './TimeFunctions';
import { SettingsCard } from '../SettingsCard';
import { Modal } from '../Modal';
import { Tag } from '../Tag';
import { Heading, SmallText } from '../../Text';
import { Button } from '../../Inputs/Button';
import { Checkbox } from '../../Inputs/Checkbox';
import { Select } from '../../Inputs/Select';
import { Timepicker } from '../../Inputs/Timepicker';
import { Input } from '../../Inputs/Input';
import { Mixins } from '../../Utils';
import { I_DICT } from '../../Utils/Constants/dict';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface StoreHoursListProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    allCategories: ICategoryWithHoursTypes[],
    textHeaders: I_DICT
};

const START_INDEX_OF_SELECTION = 0;
const END_INDEX_OF_SELECTION_DATE_TO_HOURS = -3;
const CHECKED_INITIAL_INDEX = 0; 
const INITIAL_TIME_INDEX = 0; 
const INITIAL_DATE_INDEX = 1; 
const CHECKBOX_DAY = 0;
const CHECKBOX_TIME = 1;
const FIRST_TIME = 0;
const ALL_CATEGORIES_INDEX = 0;
const ALL_CATEGORIES_TIMES = 1;
const FIRST_CATEGORY = 0;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;

export const StoreHoursList: React.FC<StoreHoursListProps> = ({
    allCategories,
    textHeaders
}): React.ReactElement => {
    
    const editModal = useState(false);
    const [editModalState, setEditModalState] = editModal;
    const addModal = useState(false);
    const [addModalState, setAddModalState] = addModal;
    const editCategoryModal = useState(false);
    const [editCategoryModalState, setEditCategoryModalState] = editCategoryModal;

    const initialCheckboxState = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    };
    const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
    
    const [storeHours, setStoreHours] = useState({
        from: new Date(),
        to: new Date()
    });

    const [allCategoriesWithHours, setAllCategoriesWithHours] = useState<ICategoryWithHoursTypes []>(allCategories);
    const [input, setInput] = useState('');

    /**
     * Finds the active category schedulebased on the isActive boolean value
     * @param {ICategoryWithHoursTypesp[]} categoryName - All schedules
     * @returns {ICategoryWithHoursTypes} 
     */
    const findActive = (categorySchedules: ICategoryWithHoursTypes[]): ICategoryWithHoursTypes => {
        const activeCategorySchedule = categorySchedules.find((categorySchedule: ICategoryWithHoursTypes): ICategoryWithHoursTypes | null | boolean => categorySchedule.isActive);
        if (activeCategorySchedule !== undefined) {
            return activeCategorySchedule;
        }
        return categorySchedules[FIRST_CATEGORY];
    };

    
    const [activeCategory, setActiveCategory] = useState(findActive(allCategoriesWithHours).category);
    const [selectActiveCategory, setSelectActiveCategory] = useState(findActive(allCategoriesWithHours).category);
    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(findActive(allCategoriesWithHours).category);
    const [activeCategorySchedule, setActiveCategorySchedule] = useState<ICategoryWithHoursTypes>(findActive(allCategoriesWithHours));

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [is24, setIs24] = useState(true);

    /**
     * Creates a store hours schedule with a new category
     * @param {string} categoryName - Name of category user creates
     * @returns {ICategoryWithHoursTypes} 
     */
    const createCategoryWithHours = (categoryName: string): ICategoryWithHoursTypes => {
        const oneCategoryWithHours: ICategoryWithHoursTypes = {
            category: categoryName,
            hoursByDay: {
                monday: [], 
                tuesday: [], 
                wednesday: [], 
                thursday: [], 
                friday: [], 
                saturday: [], 
                sunday: [] 
            },
            isActive: false
        };
        return oneCategoryWithHours;
    };

    /**
     * Shows success message when category is created
     * @param {string} categoryName - Name of category user creates
     * @returns {React.ReactElement | null} 
     */
    const showSuccess = (content: string): React.ReactElement | null => {
        if (success) {
            return (
                <Alert success> 
                    { ` ${content} ` }
                </Alert> 
            );
        } 
        return null;
    };
    
    /**
     * Shows error messages depending on the error flagged
     * @param {string} err - Name of error
     * @returns {React.ReactElement | null} 
     */
    const showError = (err: string): React.ReactElement | null => {
        switch(err) {
        case ('Cannot delete active'):
            return (
                <Alert error icon={CircleWithCross}> 
                    { ` ${textHeaders.ERRORS.CANNOT_DELETE_ACTIVE_CATEGORY} ` }
                </Alert> 
            );
        case ('Only one time allowed'):
            return (
                <Alert error icon={CircleWithCross}> 
                    { ` ${textHeaders.ERRORS.ONLY_ONE_TIME} ` }
                </Alert>   
            );
        case ('From time too big'):
            return (
                <Alert error icon={CircleWithCross}>
                    { ` ${textHeaders.ERRORS.FROM_TIME_TOO_BIG} ` }
                </Alert>
            );
        default:
            return null; 
        }
    };

    /**
     * Converts a date type to time string type (hour:minute)
     * @param {ITimeTypes} timeObj - Date type for added 
     * @returns {ITimeTypes | null} 
     */
    const convertDateToHours = (timeObj: ITimeTypes): ITimeTypes | null => {
        const parsedToDate = new Date(timeObj.to);
        const to = parsedToDate.toLocaleTimeString('it-IT')
            .slice(START_INDEX_OF_SELECTION, END_INDEX_OF_SELECTION_DATE_TO_HOURS);
        const parsedFromDate = new Date(timeObj.from);
        const from = parsedFromDate.toLocaleTimeString('it-IT')
            .slice(START_INDEX_OF_SELECTION, END_INDEX_OF_SELECTION_DATE_TO_HOURS);
        if (parsedFromDate >= parsedToDate) {
            setError('From time too big');
            return null;
        } 
        timeObj = {
            'to': to,
            'from': from
        };
        return timeObj;
    };
    
    /**
     * Saves selected time from user
     * @param {string} categoryName - Name of category that needs hours to be saved
     * @returns {ICategoryWithHoursType | null} - Updated category schedule with new time 
     */
    const saveHours = (categoryName: string): void => {
        if (Object.values(checkboxes).includes(true)) {
            const timedArray = allCategoriesWithHours.find((categorySchedule: ICategoryWithHoursTypes): ICategoryWithHoursTypes | null | boolean => categorySchedule.category === categoryName);
            if (timedArray !== undefined) {
                Object.entries(checkboxes).map((checkbox): ICategoryWithHoursTypes | null => {
                    if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length >= 1) { // cannot have more than one time per day
                        setError('Only one time allowed');
                    } else if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length === 0) { // add time
                        const convertedTime = convertDateToHours(storeHours);
                        if (convertedTime !== null) {
                            timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].push({
                                from: convertedTime.from,
                                to: convertedTime.to
                            });
                            setCheckboxes(initialCheckboxState);
                            return timedArray;
                        }
                    }
                    return null;
                })
            }
        }
    };
    
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
        <div>
            <SettingsCard heading={textHeaders.TITLES.HEADING} icon={BusinessTime}>
                <ButtonsContainer>
                    <StyledButton
                        icon={Edit}
                        onClick={(): void => {
                            setError('');
                            setEditModalState(!editModalState);
                        }}
                    >
                        { textHeaders.BUTTONS.EDIT }
                    </StyledButton>
                    <StyledButton onClick={(): void => setIs24(!is24)}> 
                        { textHeaders.BUTTONS.TOGGLE } 
                    </StyledButton>
                </ButtonsContainer>
                <StyledHeading type='h6'>
                    { textHeaders.TITLES.OPERATIONS }
                    { activeCategorySchedule.category }
                </StyledHeading>
                {Object.entries(activeCategorySchedule.hoursByDay).map((day): React.ReactElement | null => {
                    const capitalDay = day[0].replace(MATCH_FIRST_LETTER_PATTERN, (chr: string): string =>
                        chr.toUpperCase(),
                    );
                    return day[CHECKBOX_TIME].length > 0 ? (
                        <div>
                            <Heading bold size='0.95em' padding='5'>
                                { capitalDay }
                            </Heading>
                            <StyledTag 
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
                            </StyledTag>
                        </div>
                    ) : (
                        <Heading bold size='0.95em' margin='0'>
                            { capitalDay }
                        </Heading>
                    )
                })}
            </SettingsCard>
            <StyledModal state={editModal}>
                <StyledHeading type='h3'> 
                    { textHeaders.TITLES.FIRST_MODAL_HEADER } 
                </StyledHeading>
                <ButtonsContainer>
                    <StyledButton
                        icon={Add}
                        onClick={(): void => {
                            setAddModalState(!addModalState);
                            setSuccess(false);
                            setError('');
                        }}
                    > 
                        { textHeaders.BUTTONS.ADD_HOURS }
                    </StyledButton>
                    <StyledButton
                        icon={Edit}
                        onClick={(): void => {
                            setEditCategoryModalState(!editCategoryModalState);
                            setSuccess(false);
                            setError('');
                        }}
                    > 
                        { textHeaders.BUTTONS.EDIT_CATEGORIES }
                    </StyledButton>
                </ButtonsContainer>
                { showError(error) }
                { showSuccess(textHeaders.SUCCESS.CATEGORY_CREATED) }
                <StyledModal state={editCategoryModal}>
                    <StyledHeading type='h3'> 
                        { textHeaders.TITLES.THIRD_MODAL_HEADER }
                    </StyledHeading>
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setInput(e.target.value);
                    }} 
                    /> 
                    <TextContainer>
                        <StyledHeading type='h6'> 
                            { textHeaders.TITLES.ALL_CATEGORIES }
                        </StyledHeading>
                        <SmallText>
                            { textHeaders.TITLES.ALL_CATEGORIES_SUBTITLE }
                        </SmallText>
                    </TextContainer>
                    <TagContainer>
                        {Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                            return (
                                <StyledTag
                                    key={listAllCategories[0]} 
                                    onClick={(): void => {
                                        if (listAllCategories[1].category === activeCategory) { // prevent deleting active category as it would throw errors
                                            setError('Cannot delete active');
                                            setEditCategoryModalState(!editCategoryModal);
                                        }
                                        else if (allCategoriesWithHours.length !== 1) { 
                                            setAllCategoriesWithHours(allCategoriesWithHours.filter((el): ICategoryWithHoursTypes | null | boolean => el.category !==  listAllCategories[1].category)); 
                                        } 
                                    }}
                                >
                                    { listAllCategories[1].category }
                                </StyledTag>
                            )
                        })}
                    </TagContainer>
                    <CenteredButton 
                        icon={Add} 
                        onClick={(): void => {
                            if(input !== null || input !== undefined || input === '') {
                                const newCategory = createCategoryWithHours(input);
                                setAllCategoriesWithHours([...allCategoriesWithHours, newCategory]);
                                setSuccess(true);
                            }
                            setEditCategoryModalState(!editCategoryModal);
                        }}
                    > 
                        { textHeaders.BUTTONS.ADD_CATEGORY } 
                    </CenteredButton> 
                </StyledModal>
                <StyledSelect
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
                                key={listAllCategories[0]} 
                                value={listAllCategories[1].category}
                            >
                                { listAllCategories[1].category}
                            </option>
                        )
                    })}
                </StyledSelect>
                <ButtonsContainer>
                    <StyledButton 
                        onClick={(): void => {
                            setActiveCategorySchedule(getActiveSchedule(selectActiveCategory));
                            setError('');
                        }}
                    > 
                        { textHeaders.BUTTONS.SET_ACTIVE }
                    </StyledButton>
                </ButtonsContainer>        
            </StyledModal>
            <StyledModal state={addModal}>
                <StyledHeading type='h3'> 
                    { textHeaders.TITLES.SECOND_MODAL_HEADER } 
                </StyledHeading>
                <DaysDiv>
                    <StyledHeading type='h6'> 
                        { textHeaders.TITLES.SELECT_A_DAY } 
                    </StyledHeading>
                    {Object.entries(checkboxes).map((checked): React.ReactElement => {
                        return (
                            <StyledCheckbox
                                key={checked[CHECKED_INITIAL_INDEX]}
                                label={checked[CHECKED_INITIAL_INDEX].replace(
                                    MATCH_FIRST_LETTER_PATTERN,
                                    (char: string): string => char.toUpperCase(),
                                )}
                                onChange={(): void => {
                                    setCheckboxes({
                                        ...checkboxes,
                                        [checked[CHECKED_INITIAL_INDEX]]: !checked[1]
                                    })

                                }}
                            />
                        );
                    })}
                </DaysDiv>
                {Object.entries(storeHours).map((time): React.ReactElement => {
                    return (
                        <StyledTimepicker 
                            key={time[INITIAL_TIME_INDEX]}
                            name={time[INITIAL_TIME_INDEX]}
                            label={time[INITIAL_TIME_INDEX].replace(
                                MATCH_FIRST_LETTER_PATTERN,
                                (char): string => char.toUpperCase()
                            )}
                            value={time[INITIAL_DATE_INDEX]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                                setStoreHours({
                                    ...storeHours,
                                    [time[INITIAL_TIME_INDEX]]: e.target.value
                                })
                            }
                        /> 
                    );
                })}
                <StyledHeading type='h6'>
                    { textHeaders.TITLES.SELECT_A_CATEGORY }
                </StyledHeading>
                <StyledSelect
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setAddStoreHoursCategory(e.target.value);
                    }}
                    value={addStoreHoursCategory}
                >
                    {Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                        return ( 
                            <option
                                key={listAllCategories[ALL_CATEGORIES_INDEX]} 
                                value={listAllCategories[ALL_CATEGORIES_TIMES].category}
                            >
                                { listAllCategories[ALL_CATEGORIES_TIMES].category }
                            </option>
                        );
                    })}
                </StyledSelect>
                <CenteredButton 
                    onClick={(): void => {
                        setAddModalState(!addModalState);
                        saveHours(addStoreHoursCategory);
                    }}
                >
                    { textHeaders.BUTTONS.ADD_HOURS } 
                </CenteredButton> 
            </StyledModal>
        </div>
    );
};

const BaseContainerPadding = css`
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;
const MediaResponsiveness = css`
    ${Mixins.flex('center')};
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const ButtonsContainer = styled.div`
    ${MediaResponsiveness};
`;
const TextContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.flex('column')};
`;
const StyledButton = styled(Button)`
    margin: 10px;
`;
const CenteredButton = styled(Button)`
    margin: 10px auto;
`;
const StyledModal = styled(Modal)`
    max-height: 60%;
    ${BaseContainerPadding};
`;
const StyledTimepicker = styled(Timepicker)`
    ${BaseContainerPadding};
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
`;
const DaysDiv = styled.div`
    margin: 5px;
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const StyledCheckbox = styled(Checkbox)`
    margin: 5px;
`;
const StyledSelect = styled(Select)`
    margin: 5px;
`;
const StyledTag = styled(Tag)`
    margin: 5px;
`;
const TagContainer = styled.div`
    ${BaseContainerPadding};
`;