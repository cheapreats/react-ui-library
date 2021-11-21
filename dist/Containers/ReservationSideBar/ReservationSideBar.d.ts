import React from 'react';
export interface IReservationSideBar {
    SeatedList: Array<ISeatedList>;
    WaitingRoomList: Array<IWaitingRoomList>;
    UpcomingList: Array<IUpComingList>;
    AvailableRoomsList: Array<string>;
    onAddReservationButtonClick: () => void;
    onAddWaitingButtonClick: () => void;
    onAddNewCustomerClick: () => void;
    onSeatCustomer: () => void;
}
declare type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
export interface IUpComingList {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * The Time of the Reservation
     */
    time: string;
    /**
     * The size of the party
     */
    partySize: number;
    /**
     * The room the table should be located
     */
    layoutName?: string;
}
export interface ISeatedList {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * The Time of the Reservation
     */
    time: string;
    /**
     * The size of the party
     */
    partySize: number;
    /**
     * The room the table should be located
     */
    layoutName?: string;
}
export interface IWaitingRoomList {
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The size of the party
     */
    partySize: number;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * How long they have been on the wait list
     */
    time: string;
    /**
     * The room the table should be located
     */
    layoutName?: string;
}
/**
 * Primary UI component for user interaction
 * ReservationSideBar
 */
export declare const ReservationSideBar: React.FC<IReservationSideBar>;
export default ReservationSideBar;
