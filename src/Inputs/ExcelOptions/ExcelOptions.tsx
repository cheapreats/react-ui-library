import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import { Heading, Paragraph } from '@Text';
import { Tag } from '@Containers/Tag/Tag';
import { Mixins } from '@Utils';
import { Select } from '../Select/Select';
import { Datepicker } from '../Datepicker';
import { Button } from '../Button/Button';

export interface ExcelOptionsProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface,
        React.HTMLAttributes<HTMLDivElement> {
    headers: string[];
    defaultHeaders: string[];
    onResult?: Function;
}

const FROM_TO = ['from', 'to'];

const keyToHeader = (data: string): string =>
    data
        .replace(/[^a-zA-Z0-9 ]/g, ' ')
        .replace(/(^\w{1})|(\s{1}\w{1})/g, (matchedLetter): string =>
            matchedLetter.toUpperCase(),
        )
        .trim();

const DATA_TYPE = {
    NONE: 'None',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    PAYMENT_METHOD: 'Payment Method',
};

interface ResultObjectType {
    dates: {
        from?: Date;
        to?: Date;
    };
    headers: string[];
    groupBy: string;
}

export const ExcelOptions: React.FC<ExcelOptionsProps> = ({
    headers = [],
    defaultHeaders = [],
    onResult = (): void => undefined,
}): React.ReactElement => {
    const [resultObject, setResultObject] = useState<ResultObjectType>({
        dates: { from: undefined, to: undefined },
        headers: [''],
        groupBy: 'NONE',
    });

    useEffect((): void | (() => undefined | void) => {
        setResultObject(
            (prevState): ResultObjectType => ({
                ...prevState,
                headers: defaultHeaders,
            }),
        );
    }, []);

    const headersInSelect = headers.filter(
        (header): boolean => !resultObject.headers.includes(header),
    );
    const handleExport = (): void => {
        onResult(resultObject);
    };
    const removeHeader = (index: number): void => {
        const headersCopy = [...resultObject.headers];
        const updatedHeaders = headersCopy
            .slice(0, index)
            .concat(headersCopy.slice(index + 1));
        setResultObject(
            (prevState): ResultObjectType => ({
                ...prevState,
                headers: updatedHeaders,
            }),
        );
    };
    const onDragEnd = (event: DropResult): void => {
        if (event.destination) {
            const headerCopy = [...resultObject.headers];
            headerCopy.splice(event.source.index, 1);
            headerCopy.splice(
                event.destination.index,
                0,
                resultObject.headers[event.source.index],
            );
            setResultObject(
                (prevState: ResultObjectType): ResultObjectType => ({
                    ...prevState,
                    headers: headerCopy,
                }),
            );
        }
    };
    return (
        <div>
            <div>
                <div>
                    <Heading>Customize Your Excel Export</Heading>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ShownHeadersDiv>
                        <Heading type="h3">Headers</Heading>
                        <Paragraph>
                            You can <b>Add/Remove</b> desired headers and
                            <b> Rearrange The Order</b> by dragging them
                        </Paragraph>
                        <Droppable droppableId="labels" direction="horizontal">
                            {(provided): React.ReactElement => (
                                <DragDiv
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {resultObject.headers.map(
                                        (
                                            header: string,
                                            index: number,
                                        ): React.ReactElement => (
                                            <Draggable
                                                draggableId={`draggable-${header}`}
                                                index={index}
                                                key={header}
                                            >
                                                {(
                                                    dragProvided,
                                                ): React.ReactElement => (
                                                    <div
                                                        ref={
                                                            dragProvided.innerRef
                                                        }
                                                        {...dragProvided.draggableProps}
                                                        {...dragProvided.dragHandleProps}
                                                    >
                                                        <ChoiceTag
                                                            key={header}
                                                            onClick={(): void =>
                                                                removeHeader(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            {keyToHeader(
                                                                header,
                                                            )}
                                                        </ChoiceTag>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ),
                                    )}
                                    {provided.placeholder}
                                </DragDiv>
                            )}
                        </Droppable>
                    </ShownHeadersDiv>
                </DragDropContext>
                <Select
                    placeholder="Add additional headers"
                    disabled={headersInSelect.length === 0}
                    onChange={({
                        target,
                    }: {
                        target: { value: string };
                    }): void => {
                        setResultObject(
                            (prevState): ResultObjectType => ({
                                ...prevState,
                                headers: [...prevState.headers, target.value],
                            }),
                        );
                    }}
                >
                    {headersInSelect.map(
                        (header): React.ReactElement => (
                            <option key={header} value={header}>
                                {keyToHeader(header)}
                            </option>
                        ),
                    )}
                </Select>
            </div>
            <div>
                <Heading type="h3">Date Picker</Heading>
                <Paragraph>Filter the results by Date</Paragraph>
                {FROM_TO.map(
                    (date): React.ReactElement => (
                        <div key={date}>
                            <p>
                                <b>
                                    {date.replace(
                                        /(^\w{1})|(\s{1}\w{1})/g,
                                        (matchedLetter): string =>
                                            matchedLetter.toUpperCase(),
                                    )}
                                </b>
                            </p>
                            <Datepicker
                                key={date}
                                value={
                                    !resultObject.dates[date] && date === 'to'
                                        ? new Date()
                                        : resultObject.dates[date] &&
                                          resultObject.dates[date]
                                }
                                onChange={({
                                    target,
                                }: React.ChangeEvent<HTMLInputElement>): void => {
                                    setResultObject(
                                        (prevState): ResultObjectType => ({
                                            ...prevState,
                                            dates: {
                                                ...prevState.dates,
                                                [date]: target.value,
                                            },
                                        }),
                                    );
                                }}
                                onClear={(): void => {
                                    setResultObject(
                                        (prevState): ResultObjectType => ({
                                            ...prevState,
                                            dates: {
                                                ...prevState.dates,
                                                [date]: undefined,
                                            },
                                        }),
                                    );
                                }}
                            />
                        </div>
                    ),
                )}
            </div>
            <div>
                <Heading type="h3">Group Results</Heading>
                <Paragraph>Group results into sheets by:</Paragraph>
                <Select
                    margin="10px 0"
                    value={resultObject.groupBy}
                    onChange={({
                        target,
                    }: React.ChangeEvent<HTMLInputElement>): void => {
                        setResultObject(
                            (prevState): ResultObjectType => ({
                                ...prevState,
                                groupBy: target.value,
                            }),
                        );
                    }}
                >
                    {Object.keys(DATA_TYPE).map(
                        (type): React.ReactElement => (
                            <option key={type} value={type}>
                                {DATA_TYPE[type]}
                            </option>
                        ),
                    )}
                </Select>
            </div>
            <Button onClick={handleExport}>Export</Button>
        </div>
    );
};

const ChoiceTag = styled(Tag)`
    margin-right: 5px;
    margin-top: 5px;
    padding: 7px 12px;
`;
const DragDiv = styled.div`
    ${Mixins.flex('row')};
    margin-top: 10px;
`;
const ShownHeadersDiv = styled.div`
    margin-bottom: 20px;
    margin-top: 10px;
`;
