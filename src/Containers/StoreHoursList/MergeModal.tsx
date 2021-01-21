import React, {useState} from 'react';
import styled from 'styled-components';
// import { useFormik } from 'Formik';
import { Cross } from '@styled-icons/entypo/Cross';
import { Swap } from '@styled-icons/entypo/Swap';
import { Merge } from '@styled-icons/entypo/Merge';
// import { ArrowForward } from '@styled-icons/evaicons-outline/ArrowForwardOutline';
import { Mixins } from '@Utils';
import { Button } from '@Inputs/Button/Button';
import { Tag } from '../Tag/Tag';
import { ICategoryWithHoursTypes, IHoursByDay, IToFromHours, DAYS_OF_THE_WEEK, upperCaseFirstLetter} from './constants';
import { convertTime } from './TimeFunctions';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface MergeModalProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    storeHours: IToFromHours;
    mergedToFromHours: IHoursByDay;
    overWrittenTimes: IHoursByDay;
}

export const MergeModal: React.FC<MergeModalProps> = ({
    isVisible,
    storeHours,
    mergedToFromHours,
    overWrittenTimes,
    ...props
}): React.ReactElement => {
    const [mergeModalState, setMergeModalState] = isVisible;
    const [is24, setIs24] = useState(false);
    // const {
    //     values,
    //     dirty,
    //     isValid,
    //     errors,
    //     handleChange,
    //     setFieldValue
    // } = useFormik({
    //     initialValues: initialState,
    //     onSubmit: ()=> undefined,
    //     enableReinitialize: true,
    // });

    const storeHoursChange = (
        <Tag
            isHoverable={false}
        >
            {convertTime(
                storeHours.from,
                is24,
            )}
            {` - `}
            {convertTime(
                storeHours.to,
                is24,
            )}
        </Tag>
    )
    
    const renderStoreHoursMerge = () => DAYS_OF_THE_WEEK.map(day => {
        if (overWrittenTimes[day].length > 0) {
            const overWrittenTimesDisplay = overWrittenTimes[day].map((time: IToFromHours)=> (
                <Tag
                    key={day}
                    isHoverable={false}
                >
                    {convertTime(
                        time.from,
                        is24,
                    )}
                    {` - `}
                    {convertTime(
                        time.to,
                        is24,
                    )}
                </Tag>
            ))
            const mergedTime = mergedToFromHours[day].map((time: IToFromHours)=> (
                <Tag
                    key={day}
                    isHoverable={false}
                >
                    {convertTime(
                        time.from,
                        is24,
                    )}
                    {` - `}
                    {convertTime(
                        time.to,
                        is24,
                    )}
                </Tag>
            ))
            return (
                <>
                    <Heading type="h5">{upperCaseFirstLetter(day)}</Heading>
                    <MergeConflictGrid>
                        <Row>
                            {mergedTime}
                            <Button icon={Merge}>Merge Hours</Button>
                        </Row>
                        <Row>
                            {storeHoursChange}
                            <Button icon={Swap}>Replace Hours</Button>
                        </Row>
                        <Row>
                            {overWrittenTimesDisplay}
                            <Button icon={Cross}>Keep Current</Button>
                        </Row>
                    </MergeConflictGrid>
                </>
            )
        } 
        return null
        
    })

    // Function to determine if Confirm or Merge Overwrite

    // If overwritten times display messages to either merge or overwrite
    // If no overwritten times confirm to add store hours display 
    return (
        <StyledModal state={isVisible} {...props}>
            <StyledHeading type="h2">Merge, Replace, Cancel</StyledHeading>
            {renderStoreHoursMerge()}
        </StyledModal>
    );
};

const MergeConflictGrid = styled.div`
${Mixins.flex('column')};
    margin: auto;
`;
const Row = styled.div`
    ${Mixins.flex('row')};
    margin: 0px 5px;
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
const ButtonsContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('Row')};  
    `,
    )}
`;
