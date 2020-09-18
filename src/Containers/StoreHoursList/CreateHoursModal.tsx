import React, { useState } from 'react';
import styled from 'styled-components';
import { ICategoryWithHoursTypes } from './types';
import { convertDateToHours } from './TimeFunctions';
import { findActive } from './CategoryScheduleFunctions';
import { ErrorModal } from './ErrorModal';
import { Modal } from '../Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button';
import { Checkbox } from '../../Inputs/Checkbox';
import { Timepicker } from '../../Inputs/Timepicker';
import { Select } from '../../Inputs/Select';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface CreateHoursProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    MODAL_HEADER: string,
    SELECT_A_DAY_TITLE: string,
    fromTimeTooBigError: string,
    SELECT_A_CATEGORY: string,
    ADD_HOURS_BUTTON: string,
    errorMessage: string,
    allCategories: ICategoryWithHoursTypes[]
};

const CHECKED_INITIAL_INDEX = 0; 
const CHECKED_VALUE = 1;
const INITIAL_TIME_INDEX = 0; 
const INITIAL_DATE_INDEX = 1; 
const ALL_CATEGORIES_INDEX = 0;
const ALL_CATEGORIES_TIMES = 1;
const CHECKBOX_DAY = 0;
const CHECKBOX_TIME = 1;
const MATCH_FIRST_LETTER_PATTERN = /^\w/;

export const CreateHoursModal: React.FC<CreateHoursProps> = ({
    isVisible,
    MODAL_HEADER,
    SELECT_A_DAY_TITLE,
    fromTimeTooBigError,
    SELECT_A_CATEGORY,
    ADD_HOURS_BUTTON,
    errorMessage,
    allCategories
}): React.ReactElement => {

    const [addModalState, setAddModalState] = isVisible;
    const errorModal = useState(false);
    const [errorModalState, setErrorModalState] = errorModal;

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

    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(findActive(allCategories).category);

    const errors = {
        fromTooBig: storeHours.from > storeHours.to ? fromTimeTooBigError : ''
    }
    const [error, setError] = useState('');

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
                    if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length >= 1) { // cannot have more than one time per day
                        setError(errorMessage);
                        setErrorModalState(!errorModalState);
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

    const handleChange = (): void => {
        setAddModalState(!addModalState);
        saveHours(addStoreHoursCategory);
    }

    return (
        <>
            <StyledModal state={isVisible}>
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
                {Object.entries(storeHours).map((time): React.ReactElement => {
                    return (
                        <Container
                            as={Timepicker} 
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
                            error={errors.fromTooBig}
                        /> 
                    );
                })}
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
                    disabled={errors.fromTooBig}
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
const Container = styled.div`
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
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