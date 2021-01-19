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

export interface IToFromHours { 
    to: string; from: string 
}

export interface IHoursByDay {
    monday: IToFromHours[];
    tuesday: IToFromHours[];
    wednesday: IToFromHours[];
    thursday: IToFromHours[];
    friday: IToFromHours[];
    saturday: IToFromHours[];
    sunday: IToFromHours[]; 
}

// Change to use activeCategory and keys since array is awful
export interface ICategoryNew {
    [category: string] : {
        category: string;
        hoursByDay: IHoursByDay
    }
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
