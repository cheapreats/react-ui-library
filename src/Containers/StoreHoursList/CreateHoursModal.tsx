import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import  moment  from 'moment';
import { useFormik, FieldArray } from 'formik';
import { MergeModal } from './MergeModal';
import { ICategoryWithHoursTypes, InitialCheckboxState, IToFromHours, IHoursByDay, DAYS_OF_THE_WEEK, upperCaseFirstLetter } from './constants';
import { convertDateToHours } from './TimeFunctions';
import { ErrorModal } from './ErrorModal';
import { FromToDualTimeSelector } from './FromToDualTimeSelector';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button/Button';
import { Checkbox } from '../../Inputs/CheckBox/Checkbox';
import { Select } from '../../Inputs/Select/Select';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface CreateHoursProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    MODAL_HEADER: string;
    SELECT_A_DAY_TITLE: string;
    fromTimeTooBigError: string;
    toTimeTooSmallError: string;
    SELECT_A_CATEGORY: string;
    ADD_HOURS_BUTTON: string;
    errorMessage: string;
    allCategories: ICategoryWithHoursTypes[];
    activeCategory: number;
}

export interface ICreateHoursInitalState {
    checkboxes : InitialCheckboxState,
    storeHours: IToFromHours
}

const initialMergeState = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
}

const initialState: ICreateHoursInitalState = {
    checkboxes: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    },
    storeHours: {
        from: moment().format('HH:mm'),
        to: moment().format('HH:mm'),
    }
};

export const CreateHoursModal: React.FC<CreateHoursProps> = ({
    isVisible,
    MODAL_HEADER,
    SELECT_A_DAY_TITLE,
    SELECT_A_CATEGORY,
    ADD_HOURS_BUTTON,
    errorMessage,
    allCategories,
    activeCategory,
    ...props
}): React.ReactElement => {
    const [addModalState, setAddModalState] = isVisible;
    const [mergeModalState, setMergeModalState] = useState(false);
    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(activeCategory);
    const [mergeMessage, setMergeMessage] = useState('');
    const [mergedStoreHours, setMergedStoreHours] = useState(initialMergeState);
    const [overWrittenHours, setOverWrittenHours] = useState(initialMergeState);
    const {
        values,
        dirty,
        isValid,
        errors,
        handleChange,
        setFieldValue
    } = useFormik({
        initialValues: initialState,
        onSubmit: ()=> undefined,
        enableReinitialize: true,
    });
    // useEffect((): void => {
    //     setCheckboxes(initialState);
    // }, [addModalState]);

    /**
     * Checks if there is more than one time in a day given a category name
     * @param {number} activeCategoryIndex - Name of category that needs hours to be saved
     * @returns {IHoursByDay} - Returns the merged hours
     */
    const mergeOrAddTime = (activeCategoryIndex: number) => {
        const category = allCategories[activeCategoryIndex]
        const mergedToFromHours = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };
        const overWrittenTimes = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };
        DAYS_OF_THE_WEEK.map(day => {
        
            const hoursForDayOfWeek: IToFromHours[] = category.hoursByDay[day];
            if (values.checkboxes[day]) {
                const hoursCopy = {...values.storeHours};
                if(hoursForDayOfWeek.length > 0) {
                    hoursForDayOfWeek.map(hours => {
                        if(moment(hoursCopy.to, 'HH:mm').isAfter(moment(hours.from, 'HH:mm'), 'minutes')  && moment(hoursCopy.to, 'HH:mm').isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                            hoursCopy.to = hours.to
                            if (moment(hoursCopy.from).isAfter(moment(hours.from,'HH:mm'), 'minutes')) {
                                hoursCopy.from = hours.from
                            }
                            overWrittenTimes[day].push(hours);
                        } else  if (moment(hoursCopy.from, 'HH:mm').isAfter(moment(hours.from, 'HH:mm'), 'minutes')  && moment(hoursCopy.from, 'HH:mm').isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                            hoursCopy.from = hours.from
                            if (moment(hoursCopy.to).isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                                hoursCopy.to = hours.to
                            }
                            overWrittenTimes[day].push(hours);
                        } else  if (moment(hoursCopy.from, 'HH:mm').isBefore(moment(hours.from, 'HH:mm'), 'minutes')  && moment(hoursCopy.to, 'HH:mm').isAfter(moment(hours.to, 'HH:mm'), 'minutes')) {
                            overWrittenTimes[day].push(hours);
                        } else {
                            mergedToFromHours[day].push(hours)
                        }
                    })
                }
                mergedToFromHours[day].push(hoursCopy)
            } else {
                mergedToFromHours[day] = hoursForDayOfWeek;
            }
        })
        setMergedStoreHours(mergedToFromHours)
        setOverWrittenHours(overWrittenTimes);
        setMergeModalState(true);
        console.log(overWrittenTimes, mergedToFromHours, 'merged')
    };
    
    const setStoreHours = (hours: IToFromHours) => {
        setFieldValue('storeHours', hours)
    }
 
    return (
        <>
            <StyledModal state={isVisible} {...props}>
                <StyledHeading type="h3">{MODAL_HEADER}</StyledHeading>
                <DaysDiv>
                    <StyledHeading type="h6">
                        {SELECT_A_DAY_TITLE}
                    </StyledHeading>
                    { DAYS_OF_THE_WEEK.map(
                        (day): React.ReactElement => (
                            <Section
                                as={Checkbox}
                                key={day}
                                name={`checkboxes.${day}`}
                                label={upperCaseFirstLetter(day)}
                                onChange={handleChange}
                            />
                        ),
                    )}
                </DaysDiv>
                <FromToDualTimeSelector
                    storeHours={values.storeHours}
                    setStoreHours={setStoreHours}
                />
                <StyledHeading type="h6">{SELECT_A_CATEGORY}</StyledHeading>
                <Section
                    as={Select}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setAddStoreHoursCategory(e.target.value as unknown as number);
                    }}
                    placeholder={allCategories[addStoreHoursCategory].category}
                    value={allCategories[addStoreHoursCategory].category}
                >
                    {Object.values(allCategories).map(
                        ({category}, index): React.ReactElement => (
                            <option
                                key={category}
                                value={index}
                            >
                                {category}
                            </option>
                        ),
                    )}
                </Section>
                <CenteredButton
                    onClick={()=>mergeOrAddTime(addStoreHoursCategory)}
                    disabled={!isValid || !dirty}
                >
                    {ADD_HOURS_BUTTON}
                </CenteredButton>
            </StyledModal>
            <MergeModal isVisible={[mergeModalState, setMergeModalState]} storeHours={values.storeHours} mergedToFromHours={mergedStoreHours} overWrittenTimes={overWrittenHours} />
        </>
    );
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
