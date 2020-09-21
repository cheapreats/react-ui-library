import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ICategoryWithHoursTypes } from './types';
import { convertDateToHours } from './TimeFunctions';
import { findActive } from './CategoryScheduleFunctions';
import { ErrorModal } from './ErrorModal';
import { TwoTimeSelector } from './FromToDualTimeSelector';
import { Modal } from '../Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button';
import { Checkbox } from '../../Inputs/Checkbox';
import { Select } from '../../Inputs/Select';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface CreateHoursProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    MODAL_HEADER: string,
    SELECT_A_DAY_TITLE: string,
    fromTimeTooBigError: string,
    toTimeTooSmallError: string
    SELECT_A_CATEGORY: string,
    ADD_HOURS_BUTTON: string,
    errorMessage: string,
    allCategories: ICategoryWithHoursTypes[]
};

const CHECKED_INITIAL_INDEX = 0; 
const CHECKED_VALUE = 1;
const ALL_CATEGORIES_INDEX = 0;
const ALL_CATEGORIES_TIMES = 1;
const CHECKBOX_DAY = 0;
const CHECKBOX_TIME = 1;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;

const initialCheckboxState = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
};

export const CreateHoursModal: React.FC<CreateHoursProps> = ({
    isVisible,
    MODAL_HEADER,
    SELECT_A_DAY_TITLE,
    fromTimeTooBigError,
    toTimeTooSmallError,
    SELECT_A_CATEGORY,
    ADD_HOURS_BUTTON,
    errorMessage,
    allCategories,
    ...props
}): React.ReactElement => {

    const [addModalState, setAddModalState] = isVisible;
    const errorModal = useState(false);
    const [errorModalState, setErrorModalState] = errorModal;

    const [checkboxes, setCheckboxes] = useState(initialCheckboxState);

    const [storeHours, setStoreHours] = useState({
        from: new Date(),
        to: new Date()
    });

    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(findActive(allCategories).category);

    const [error, setError] = useState('');

    useEffect((): void => {
        setCheckboxes(initialCheckboxState);
    }, [addModalState])

    /**
     * Checks if there is more than one time
     * @param {string} categoryName - Name of category that needs hours to be saved
     * @returns {boolean} - Returns true if more than one category appears
     */
    const notMoreThanOneTime = (categoryName: string): boolean => {
        let check = false;
        const timedArray = allCategories.find((categorySchedule: ICategoryWithHoursTypes): ICategoryWithHoursTypes | null | boolean => categorySchedule.category === categoryName);
        if (timedArray !== undefined) {
            Object.entries(checkboxes).forEach((checkbox): void => {
                if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length >= 1) { // cannot have more than one time per day
                    check = true;
                } 
            });
        }
        return check;
    };

    /**
     * Saves selected time from user
     * @param {string} categoryName - Name of category that needs hours to be saved
     * @returns {ICategoryWithHoursType | null} - Updated category schedule with new time 
     */
    const saveHours = (categoryName: string): void => {
        if (Object.values(checkboxes).includes(true)) {
            const timedArray = allCategories.find((categorySchedule: ICategoryWithHoursTypes): ICategoryWithHoursTypes | null | boolean => categorySchedule.category === categoryName);
            if (timedArray !== undefined) {
                Object.entries(checkboxes).map((checkbox): ICategoryWithHoursTypes | null => {
                    if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length === 0) { // add time
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

    const handleChange = (): void => {
        if(notMoreThanOneTime(addStoreHoursCategory)) {
            setError(errorMessage);
            setErrorModalState(!errorModalState);
        } else {
            saveHours(addStoreHoursCategory);
            setAddModalState(!addModalState);
        }
    };

    return (
        <>
            <StyledModal state={isVisible} {...props}>
                <StyledHeading type='h3'> 
                    { MODAL_HEADER }
                </StyledHeading>
                <DaysDiv>
                    <StyledHeading type='h6'> 
                        { SELECT_A_DAY_TITLE } 
                    </StyledHeading>
                    {Object.entries(checkboxes).map((checked): React.ReactElement => {
                        return (
                            <Section 
                                as={Checkbox}
                                key={checked[CHECKED_INITIAL_INDEX]}
                                label={checked[CHECKED_INITIAL_INDEX].replace(
                                    MATCH_FIRST_LETTER_PATTERN,
                                    (char: string): string => char.toUpperCase(),
                                )}
                                onChange={(): void => {
                                    setCheckboxes({
                                        ...checkboxes,
                                        [checked[CHECKED_INITIAL_INDEX]]: !checked[CHECKED_VALUE]
                                    })
                                }}
                            />
                        );
                    })}
                </DaysDiv>
                <TwoTimeSelector 
                    fromTimeTooBigError={fromTimeTooBigError}
                    toTimeTooSmallError={toTimeTooSmallError}
                    storeHours={storeHours}
                    setStoreHours={setStoreHours}
                />
                <StyledHeading type='h6'>
                    { SELECT_A_CATEGORY }
                </StyledHeading>
                <Section
                    as={Select}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setAddStoreHoursCategory(e.target.value);
                    }}
                    value={addStoreHoursCategory}
                >
                    {Object.entries(allCategories).map((listAllCategories): React.ReactElement => {
                        return ( 
                            <option
                                key={listAllCategories[ALL_CATEGORIES_INDEX]} 
                                value={listAllCategories[ALL_CATEGORIES_TIMES].category}
                            >
                                { listAllCategories[ALL_CATEGORIES_TIMES].category }
                            </option>
                        );
                    })}
                </Section>
                <CenteredButton 
                    onClick={handleChange}
                    disabled={storeHours.from > storeHours.to || checkboxes === initialCheckboxState}
                >
                    { ADD_HOURS_BUTTON } 
                </CenteredButton> 
            </StyledModal>
            <ErrorModal
                modalState={errorModal}
                errorMessage={error}
            />
        </>
    )
};

const Section = styled.div`
    margin: 5px;
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
const DaysDiv = styled.div`
    margin: 5px;
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const CenteredButton = styled(Button)`
    margin: 10px auto;
`;