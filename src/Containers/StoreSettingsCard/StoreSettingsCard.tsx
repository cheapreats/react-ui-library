import { Mixins } from "@Utils";
import React from "react";
import { StoreAlt } from '@styled-icons/fa-solid/StoreAlt';
import { DoorClosed } from '@styled-icons/fa-solid/DoorClosed';
import { DoorOpen } from '@styled-icons/fa-solid/DoorOpen';
import { StopCircle } from '@styled-icons/fa-solid/StopCircle';
import { PlayCircle } from '@styled-icons/fa-solid/PlayCircle';
import styled from "styled-components";
import {Button, Switch} from '../../Inputs';
import { SettingsCard, DisplayItem } from "..";
import {IStoreHours, TodaysStoreHours} from '../TodaysStoreHours/TodaysStoreHours';


export interface IStoreSettingsCard {
    header: string,
    storeNameLabel: string,
    storeName: string,
    vendorIdLabel: string,
    vendorId: string,
    storeStatusLabel: string,
    storeStatus: string,
    isAcceptingOrders: boolean,
    isLoadingAcceptingOrdersStatus: boolean,
    isStoreClosed: boolean,
    isAutomaticallyStartingOrderPreparation: boolean,
    onToggleAutomaticStartOrderPreparation: (isChecked: boolean) => void,
    onToggleStoreStatus: () => void,
    onToggleAcceptingOrders: () => void,
    storeClosedLabel: string,
    startTime: string,
    endTime: string,
    storeHours: IStoreHours[]
}

export const StoreSettingsCard: React.FC<IStoreSettingsCard> = ({
    header,
    storeNameLabel,
    storeName,
    vendorIdLabel,
    vendorId,
    storeStatusLabel,
    storeStatus,
    isAcceptingOrders,
    isAutomaticallyStartingOrderPreparation,
    isLoadingAcceptingOrdersStatus,
    isStoreClosed,
    onToggleAutomaticStartOrderPreparation,
    onToggleStoreStatus,
    onToggleAcceptingOrders,
    startTime,
    endTime,
    storeClosedLabel,
    storeHours,
    ...props
}) => (
    <SettingsCard
        heading={header}
        icon={StoreAlt}
        {...props}
    >
        <DisplayItem
            label={storeNameLabel}
            value={storeName}
        />
        <DisplayItem
            label={vendorIdLabel}
            value={vendorId}
            margin="2px 0 auto"
        />
        <DisplayItem
            label={storeStatusLabel}
            value={storeStatus}
            data-cy="storeStatusDiv"
        />
        <TodaysStoreHours storeClosedLabel={storeClosedLabel} startTime={startTime} endTime={endTime} storeHours={storeHours} />
        <Switch
            leftTag="Automatic Start Order Preparation"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onToggleAutomaticStartOrderPreparation(event.target.checked);
            }}
            isChecked={isAutomaticallyStartingOrderPreparation}
        />
        <ButtonsContainer>
            <Button
                margin="20px 0 0"
                onClick={onToggleStoreStatus}
                loading={isLoadingAcceptingOrdersStatus}
                disabled={isLoadingAcceptingOrdersStatus}
                icon={isStoreClosed ? DoorOpen : DoorClosed}
                data-cy="toggleStoreStatusButton"
            >
                {isStoreClosed
                    ? 'Store Open'
                    : 'Store Close'}{' '}
                Store Status
            </Button>
            <ToggleAcceptingOrdersButton
                onClick={onToggleAcceptingOrders}
                loading={isLoadingAcceptingOrdersStatus}
                disabled={isLoadingAcceptingOrdersStatus || isStoreClosed}
                icon={isAcceptingOrders ? StopCircle : PlayCircle}
                data-cy="toggleAcceptingOrdersStatusButton"
            >
                {isAcceptingOrders
                    ? 'Stop Accepting Orders'
                    : 'Start Accepting Orders'}
            </ToggleAcceptingOrdersButton>
        </ButtonsContainer>
    </SettingsCard>   
)

const ButtonsContainer = styled.div`
    ${Mixins.flex('space-between', 'center')}
`;

const ToggleAcceptingOrdersButton = styled(Button)`
    margin: 20px 0 0;
`;