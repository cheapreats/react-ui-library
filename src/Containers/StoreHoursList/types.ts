export interface ICategoryWithHoursTypes {
    category: string;
    hoursByDay: {
        monday: { to: string; from: string }[];
        tuesday: { to: string; from: string }[];
        wednesday: { to: string; from: string }[];
        thursday: { to: string; from: string }[];
        friday: { to: string; from: string }[];
        saturday: { to: string; from: string }[];
        sunday: { to: string; from: string }[];
    };
    isActive: boolean;
}

export interface ITimeTypes {
    to: Date | string;
    from: Date | string;
}

export interface InitialCheckboxState {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}
