import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { Mixins } from '@Utils';
import { Button } from '@Inputs/Button/Button';
import { Select } from '@Inputs/Select/Select';
import {
    IHoursByDay,
    IToFromHours,
    MergeActions,
    IMergeDays,
} from './interfaces';
import {
    DAYS_OF_THE_WEEK,
    upperCaseFirstLetter,
    convertTime,
    DASH_BEWTWEEN_TIME_PERIODS,
} from './constants';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface MergeModalProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    storeHours: IToFromHours;
    mergedHours: IHoursByDay;
    overWrittenHours: IHoursByDay;
    confirmMerge: (merge: IMergeDays) => void;
}

const initalValues: IMergeDays = {
    monday: MergeActions.MERGE,
    tuesday: MergeActions.MERGE,
    wednesday: MergeActions.MERGE,
    thursday: MergeActions.MERGE,
    friday: MergeActions.MERGE,
    saturday: MergeActions.MERGE,
    sunday: MergeActions.MERGE,
};
export const MergeModal: React.FC<MergeModalProps> = ({
    isVisible,
    storeHours,
    mergedHours,
    overWrittenHours,
    confirmMerge,
    ...props
}): React.ReactElement => {
    const [mergeModalState, setMergeModalState] = isVisible;
    const [is24, setIs24] = useState(false);
    const { values, handleChange, resetForm } = useFormik({
        initialValues: initalValues,
        onSubmit: () => undefined,
        enableReinitialize: true,
    });

    // render store hours
    const renderStoreHours = (
        <Column>
            <HoursItem>
                {convertTime(storeHours.from, is24)}
                {DASH_BEWTWEEN_TIME_PERIODS}
                {convertTime(storeHours.to, is24)}
            </HoursItem>
        </Column>
    );

    // create list of store hours that require resolution
    // if no hours require merging return null
    const renderStoreHoursMerge = () =>
        DAYS_OF_THE_WEEK.map((day) => {
            if (overWrittenHours[day].length > 0) {
                // create elements to display overWritten times
                const renderOverwrittenTimes = (
                    <Column>
                        {overWrittenHours[day].map((time: IToFromHours) => (
                            <HoursItem>
                                {convertTime(time.from, is24)}
                                {DASH_BEWTWEEN_TIME_PERIODS}
                                {convertTime(time.to, is24)}
                            </HoursItem>
                        ))}
                    </Column>
                );
                // create elements to display merged times
                const renderMergedTime = (
                    <Column>
                        {mergedHours[day].map((time: IToFromHours) => (
                            <HoursItem>
                                {convertTime(time.from, is24)}
                                {DASH_BEWTWEEN_TIME_PERIODS}
                                {convertTime(time.to, is24)}
                            </HoursItem>
                        ))}
                    </Column>
                );

                // render different resolution based on the day's merge action to be performed
                const renderResolution = () => {
                    switch (values[day]) {
                        case MergeActions.MERGE:
                            return renderMergedTime;
                        case MergeActions.REPLACE:
                            return renderStoreHours;
                        case MergeActions.KEEP:
                            return renderOverwrittenTimes;
                        default:
                            return null;
                    }
                };

                return (
                    <Column>
                        <Heading type="h4" bold>
                            {upperCaseFirstLetter(day)}
                        </Heading>
                        <SelectRow>
                            <>
                                <Heading type="h6">Conflicts</Heading>
                                <div />
                                <Heading type="h6">Resolved</Heading>
                            </>
                            <>
                                {renderOverwrittenTimes}
                                <Select
                                    name={`${day}`}
                                    value={values[day]}
                                    onChange={handleChange}
                                >
                                    <option value={MergeActions.MERGE}>
                                        {MergeActions.MERGE}
                                    </option>
                                    <option value={MergeActions.REPLACE}>
                                        {MergeActions.REPLACE}
                                    </option>
                                    <option value={MergeActions.KEEP}>
                                        {MergeActions.KEEP}
                                    </option>
                                </Select>
                                {renderResolution()}
                            </>
                        </SelectRow>
                    </Column>
                );
            }
            return null;
        });

    const resolveMergeConflicts = () => {
        confirmMerge(values);
        resetForm({ values: initalValues });
    };

    return (
        <StyledModal state={[mergeModalState, setMergeModalState]} {...props}>
            <StyledHeading type="h2">Resolve Hours Conflicts</StyledHeading>
            <Button margin="auto" onClick={() => setIs24(!is24)}>
                Toggle 24 hrs
            </Button>
            {renderStoreHoursMerge()}
            <Button
                margin="20px 10px auto auto"
                primary
                onClick={resolveMergeConflicts}
            >
                Resolve
            </Button>
        </StyledModal>
    );
};

const Column = styled.div`
    ${Mixins.flex('column')};
`;
const SelectRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.75fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-rows: auto auto;
    width: calc(100% - 20px);
    margin: 10px 0 auto 20px;
`;
const StyledModal = styled(Modal)`
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
    min-height: 50vh;
    max-height: 100vh;
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
`;
const HoursItem = styled.div`
    ${({ theme }): string => `
        border: 1px solid ${theme.colors.border};
        color: ${theme.colors.text};
        background-color: ${Mixins.darken('#ffffff', 0.03)};
    `}
    text-align: center;
    margin-bottom: 5px;
    padding: 10px;
    border-radius: 999px;
`;
