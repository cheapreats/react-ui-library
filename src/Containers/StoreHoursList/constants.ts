export interface CategoryWithHoursTypes {
    category: string,
    hoursByDay: {
        monday: { to: string, from: string }[],
        tuesday: { to: string, from: string }[],
        wednesday: { to: string, from: string }[],
        thursday: { to: string, from: string }[],
        friday: { to: string, from: string }[],
        saturday: { to: string, from: string }[],
        sunday: { to: string, from: string }[]
    }
};

export const sampleCategories: CategoryWithHoursTypes [] = [
    {
        category: 'Winter',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    },
    {
        category: 'Summer',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        } 
    },
    {
        category: 'Holidays',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }], 
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    }
];

export const sampleActiveCategorySchedule: CategoryWithHoursTypes = {
    category: 'Winter',
    hoursByDay: {
        monday: [                    
            {
                from: '12:00',
                to: '20:00'
            }],
        tuesday: [], 
        wednesday: [], 
        thursday: [
            {
                from: '12:00',
                to: '20:00'
            }
        ], 
        friday: [], 
        saturday: [], 
        sunday: [] 
    }
};