import { Mixins } from "@Utils";
import React from "react";
import styled from "styled-components";
import { SmallText } from "../../Text";
import { DisplayItem } from "../DisplayItem/DisplayItem";

export interface IStoreHours {
    from: string,
    to: string
}

export interface ITodaysStoreHours {
    storeClosedLabel: string,
    startTime: string,
    endTime: string,
    /* A Sorted array of store hours */
    storeHours: IStoreHours[]
}

export const TodaysStoreHours: React.FC<ITodaysStoreHours> = ({
    startTime,
    endTime,
    storeHours,
    storeClosedLabel,
    ...props
}) => (
    <div {...props}>
        {storeHours.length > 0 ? (
            <>
                <Items>
                    <DisplayItem
                        margin="2px 15px 2px 0"
                        label="Start Time"
                        value={startTime}
                    />
                    <DisplayItem
                        label="End Time"
                        value={endTime}
                    />
                </Items>
                <DisplayItem
                    label="All Store Hours"
                    value={storeHours
                        .map(({ from, to }) => `${from} - ${to}`)
                        .join(', ')}
                />
            </>
        ) : (
            <SmallText color="secondary" bold>
                {storeClosedLabel}
            </SmallText>
        )}
    </div>
)

const Items = styled.div`
    ${Mixins.flex()}
    margin-bottom: auto;
`;