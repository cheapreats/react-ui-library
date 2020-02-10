import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { ImplicitPropsInterface } from '@Utils/Hooks';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Heading } from '../Text';
import { Tag } from '../Containers';
import Select from './Select';
import Datepicker from './Datepicker';

export interface ExcelOptionsProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface {
    headers: string[];
    defaultHeaders: string[];
    onResult?: Function;
    onClick?: Function;
}

const keyToHeader = (data: string[]) => {
    return data.map(header => {
        return header
            .replace(/[^a-zA-Z0-9 ]/g, ' ')
            .replace(/(^\w{1})|(\s{1}\w{1})/g, matchedLetter =>
                matchedLetter.toUpperCase(),
            )
            .trim();
    });
};

let properHeaders: string[] = [];
let properDefaultHeaders: string[] = [];

export const ExcelOptions: React.FC<ExcelOptionsProps> = ({
    headers = [],
    defaultHeaders = [],
    onResult = () => {},
}) => {
    const [resultObject, setResultObject] = useState({
        dates: { from: undefined, to: undefined },
        headers: [''],
        groupBy: 'None',
    });

    useEffect(() => {
        properHeaders = keyToHeader(headers);
        properDefaultHeaders = keyToHeader(defaultHeaders);
        setResultObject(prevState => ({
            ...prevState,
            headers: properDefaultHeaders,
        }));
    }, []);

    const headersInSelect = properHeaders.filter(
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
    return (
        <div>
            <div>
                <div>
                    <Heading>Customize</Heading>
                </div>
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    <div>
                        <Droppable droppableId="labels" direction="horizontal">
                            {provided => (
                                <div
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
                                                    {dragProvided => (
                                                        <span
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
                                                                {header}
                                                            </ChoiceTag>
                                                        </span>
                                                    )}
                                                </Draggable>
                                            );
                                        },
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
                <Select
                    placeholder="Add additional headers"
                    onChange={({ target }: { target: { value: string } }) => {
                        setResultObject(prevState => ({
                            ...prevState,
                            headers: [...resultObject.headers, target.value],
                        }));
                    }}
                >
                    {headersInSelect.map((header, index) => (
                        <option key={header} value={header}>
                            {header}
                        </option>
                    ))}
                </Select>
            </div>
            <div>
                <p>Date Picker</p>
                {['from', 'to'].map((date, index) => {
                    return (
                        <div>
                            <p>
                                {date.replace(
                                    /(^\w{1})|(\s{1}\w{1})/g,
                                    matchedLetter =>
                                        matchedLetter.toUpperCase(),
                                )}
                            </p>
                            <Datepicker
                                key={date}
                                value={
                                    resultObject.dates[date] &&
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
                                            ...resultObject.dates,
                                            [date]: target.value,
                                        },
                                    }));
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                <p>Grouping Options</p>
                <p>Group results by:</p>
                <Select
                    value={resultObject.groupBy}
                    onChange={({ target }: { target: { value: string } }) => {
                        setResultObject(prevState => ({
                            ...prevState,
                            groupBy: target.value,
                        }));
                    }}
                >
                    <option key={1} value="None">
                        None
                    </option>
                    <option key={2} value="Daily">
                        Daily
                    </option>
                </Select>
            </div>
            <button type="submit" onClick={handleExport}>
                Export
            </button>
        </div>
    );
};

const ChoiceTag = styled(Tag)`
    margin-right: 5px;
    margin-top: 5px;
    padding: 7px 12px;
`;
