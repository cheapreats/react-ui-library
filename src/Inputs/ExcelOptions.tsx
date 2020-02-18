import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Heading, Paragraph } from '../Text';
import { Tag } from '../Containers';
import Select from './Select';
import Datepicker from './Datepicker';
import Button from './Button';

export interface ExcelOptionsProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    headers: string[];
    defaultHeaders: string[];
    onResult?: Function;
    onClick?: Function;
}

const FROM_TO = ['from', 'to'];

const keyToHeader = (data: string): string => {
    return data
        .replace(/[^a-zA-Z0-9 ]/g, ' ')
        .replace(/(^\w{1})|(\s{1}\w{1})/g, matchedLetter =>
            matchedLetter.toUpperCase(),
        )
        .trim();
};

const DATA_TYPE = {
    NONE: 'None',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    PAYMENT_METHOD: 'Payment Method',
};

export const ExcelOptions: React.FC<ExcelOptionsProps> = ({
    headers = [],
    defaultHeaders = [],
    onResult = () => {},
}) => {
    const [resultObject, setResultObject] = useState({
        dates: { from: undefined, to: undefined },
        headers: [''],
        groupBy: 'NONE',
    });

    useEffect(() => {
        setResultObject(prevState => ({
            ...prevState,
            headers: defaultHeaders,
        }));
    }, []);

    const headersInSelect = headers.filter(
        header => !resultObject.headers.includes(header),
    );
    const handleExport = () => {
        onResult(resultObject);
    };
    const removeHeader = (index: number) => {
        const headersCopy = [...resultObject.headers];
        const updatedHeaders = headersCopy
            .slice(0, index)
            .concat(headersCopy.slice(index + 1));
        setResultObject(prevState => ({
            ...prevState,
            headers: updatedHeaders,
        }));
    };
    const onDragEnd = (event: any) => {
        const headerCopy = [...resultObject.headers];
        headerCopy.splice(event.source.index, 1);
        headerCopy.splice(
            event.destination.index,
            0,
            resultObject.headers[event.source.index],
        );
        setResultObject(prevState => ({
            ...prevState,
            headers: headerCopy,
        }));
    };
    console.log(
        'IN SELECT',
        headersInSelect,
        'OBJECT',
        resultObject.headers,
        'HEDERS',
        headers,
    );
    return (
        <div>
            <div>
                <div>
                    <Heading>Customize</Heading>
                </div>
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    <ShownHeadersDiv>
                        <Heading type="h3">Headers</Heading>
                        <Paragraph>
                            You can <b>Add/Remove</b> desired headers and
                            <b> Rearrange The Order</b> by dragging them
                        </Paragraph>
                        <Droppable droppableId="labels" direction="horizontal">
                            {(provided, snapshot) => (
                                <DragDiv
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {resultObject.headers.map(
                                        (header, index) => {
                                            return (
                                                <Draggable
                                                    draggableId={`draggable-${header}`}
                                                    index={index}
                                                    key={`draggable-${header}`}
                                                >
                                                    {(
                                                        dragProvided,
                                                        dragSnapshot,
                                                    ) => (
                                                        <div
                                                            key={`span-${header}`}
                                                            ref={
                                                                dragProvided.innerRef
                                                            }
                                                            {...dragProvided.draggableProps}
                                                            {...dragProvided.dragHandleProps}
                                                        >
                                                            <ChoiceTag
                                                                key={header}
                                                                onClick={() =>
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
                                            );
                                        },
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
                    onChange={({ target }: { target: { value: string } }) => {
                        setResultObject(prevState => ({
                            ...prevState,
                            headers: [...prevState.headers, target.value],
                        }));
                    }}
                >
                    {headersInSelect.map((header, index) => (
                        <option key={header} value={header}>
                            {keyToHeader(header)}
                        </option>
                    ))}
                </Select>
            </div>
            <div>
                <Heading type="h3">Date Picker</Heading>
                <Paragraph>Filter the results by Date</Paragraph>
                {FROM_TO.map((date, index) => {
                    return (
                        <div key={`div-${date}`}>
                            <p key={`p-${date}`}>
                                <b>
                                    {date.replace(
                                        /(^\w{1})|(\s{1}\w{1})/g,
                                        matchedLetter =>
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
                                }: {
                                    target: { value: string };
                                }) => {
                                    setResultObject(prevState => ({
                                        ...prevState,
                                        dates: {
                                            ...prevState.dates,
                                            [date]: target.value,
                                        },
                                    }));
                                }}
                                onClear={(clear: undefined): void => {
                                    setResultObject(prevState => ({
                                        ...prevState,
                                        dates: {
                                            ...prevState.dates,
                                            [date]: clear,
                                        },
                                    }));
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                <Heading type="h3">Group Results</Heading>
                <Paragraph>Group results into sheets by:</Paragraph>
                <GroupBySelect
                    value={resultObject.groupBy}
                    onChange={({ target }: { target: { value: string } }) => {
                        setResultObject(prevState => ({
                            ...prevState,
                            groupBy: target.value,
                        }));
                    }}
                >
                    {Object.keys(DATA_TYPE).map((type, index) => {
                        return (
                            <option key={type} value={type}>
                                {DATA_TYPE[type]}
                            </option>
                        );
                    })}
                </GroupBySelect>
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
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`;
const ShownHeadersDiv = styled.div`
    margin-bottom: 20px;
    margin-top: 10px;
`;
const GroupBySelect = styled(Select)`
    margin-top: 10px;
    margin-bottom: 10px;
`;
