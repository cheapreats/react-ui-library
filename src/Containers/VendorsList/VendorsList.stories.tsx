import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TableView } from '@styled-icons/material/TableView';
import { List } from '@styled-icons/bootstrap/List';
import { ViewGrid } from '@styled-icons/heroicons-solid/ViewGrid';
import { Row, HeaderGroup, CellProps } from 'react-table';
import moment from 'moment';
import { ListHeader } from '@Containers/List';
import { TagFilterSelect } from '@Containers/CollapsibleHeading/TagFilterSelect';
import { DateFilterSelect } from '@Containers/CollapsibleHeading/DateFilterSelect';
import { Cog } from '@styled-icons/fa-solid/Cog';
import { DefaultFilter } from './DefaultFilter';
import { Profile } from './Profile';
import { TagContainer } from './TagContainer';
import { SmallText } from '../../Text/SmallText';
import { VendorsList, IVendorsListProps } from './VendorsList';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Vendors List'),
    component: VendorsList,
} as Meta;

interface IGroups {
    name: string;
}

const TIME_FRAME_DAYS = 'days';
const INITIAL_GROUP_COUNT = 0;
const INCREMENT_GROUP_COUNT_ONE = 1;

interface IOriginalValues {
    email: string;
    name: string;
    groups: IGroups[];
    created_at: string;
}
const tabFilterMethod = (
    rows: Row<object>[],
    theColumns: string[],
    filterValue: any,
) => {
    const filteredRows = rows.filter((row) => {
        let groupContainsCount = INITIAL_GROUP_COUNT;
        const { groups }: IOriginalValues = row.original as IOriginalValues;
        groups.map(({ name }) => {
            if (filterValue.includes(name)) {
                groupContainsCount += INCREMENT_GROUP_COUNT_ONE;
            }
        });
        if (groupContainsCount === filterValue.length) {
            return true;
        }
        return false;
    });
    return filteredRows;
};

const timeFilterMethod = (
    rows: Row<object>[],
    theColumns: string[],
    filterValue: { date: Date; selectedOption: string },
) => {
    const { date, selectedOption } = filterValue;
    const filteredRows = rows.filter((row) => {
        const { created_at }: IOriginalValues = row.original as IOriginalValues;
        if (selectedOption === 'Before') {
            return moment(created_at).isBefore(moment(date), TIME_FRAME_DAYS);
        }
        if (selectedOption === 'After') {
            return moment(created_at).isAfter(moment(date), TIME_FRAME_DAYS);
        }
        return false;
    });
    return filteredRows;
};

const globalFilterMethod = (
    rows: Row<object>[],
    theColumns: string[],
    filterValue: any,
) => {
    const stringRegexMatch = new RegExp(filterValue, 'gi');
    const filteredRows = rows.filter((row) => {
        const { email, name, groups, created_at }: IOriginalValues =
            row.original as IOriginalValues;
        const emailMatch = stringRegexMatch.test(email);
        const nameMatch = stringRegexMatch.test(name);
        const tagsMatch = stringRegexMatch.test(
            groups.map((group) => group.name).join(''),
        );
        const isDateBefore = moment(created_at).isBefore(moment(filterValue));
        if (emailMatch || nameMatch || tagsMatch || isDateBefore) {
            return true;
        }
        return false;
    });
    return filteredRows;
};
const sampleGroupsMapped = [
    'VIP Client',
    'Early Adopter',
    'Pizza Fanatic',
    'Dog Lover',
    'Frogger',
    'Jogger',
    'Dogger',
];
const sampleDateOptions = ['Before', 'After'];
const sampleData = [
    {
        key: 1,
        id: '1',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }, { name: 'Early Adopter' }],
        created_at: moment().subtract('10', 'weeks').toString(),
    },
    {
        key: 2,
        id: '2',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }, { name: 'Dogger' }],
        created_at: moment().subtract('7', 'weeks').toString(),
    },
    {
        key: 3,
        id: '3',
        name: 'Josh Bro',
        email: 'joshbro@bros.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [
            { name: 'VIP Client' },
            { name: 'Early Adopter' },
            { name: 'Pizza Fanatic' },
        ],
        created_at: moment().subtract('6', 'weeks').toString(),
    },
    {
        key: 4,
        id: '4',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [
            { name: 'VIP Client' },
            { name: 'Dog Lover' },
            { name: 'Dogger' },
        ],
        created_at: moment().subtract('5', 'weeks').toString(),
    },
    {
        key: 5,
        id: '5',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [
            { name: 'VIP Client' },
            { name: 'Early Adopter' },
            { name: 'Frogger' },
        ],
        created_at: moment().subtract('1', 'weeks').toString(),
    },
    {
        key: 6,
        id: '6',
        name: 'Ruroni Kenshin',
        email: 'rurko@anime.com',
        groups: [{ name: 'VIP Client' }, { name: 'Dog Lover' }],
        created_at: moment().subtract('4', 'weeks').toString(),
    },
    {
        key: 6,
        id: '7',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }, { name: 'Jogger' }],
        created_at: '02/30/2018',
    },
    {
        key: 8,
        id: '8',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('1', 'weeks').toString(),
    },
    {
        key: 9,
        id: '9',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('2', 'weeks').toString(),
    },
    {
        key: 10,
        id: '10',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('2', 'weeks').toString(),
    },
    {
        key: 11,
        id: '11',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('12', 'weeks').toString(),
    },
    {
        key: 12,
        id: '12',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }, { name: 'Early Adopter' }],
        created_at: moment().subtract('22', 'weeks').toString(),
    },
    {
        key: 13,
        id: '13',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }, { name: 'Early Adopter' }],
        created_at: moment().subtract('21', 'weeks').toString(),
    },
    {
        key: 14,
        id: '14',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('12', 'weeks').toString(),
    },
    {
        key: 15,
        id: '15',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }, { name: 'Early Adopter' }],
        created_at: moment().subtract('25', 'weeks').toString(),
    },
    {
        key: 16,
        id: '16',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('2', 'weeks').toString(),
    },
    {
        key: 21,
        id: '21',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }, { name: 'Early Adopter' }],
        created_at: moment().subtract('10', 'weeks').toString(),
    },
    {
        key: 22,
        id: '22',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }, { name: 'Dogger' }],
        created_at: moment().subtract('7', 'weeks').toString(),
    },
    {
        key: 23,
        id: '23',
        name: 'Josh Bro',
        email: 'joshbro@bros.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [
            { name: 'VIP Client' },
            { name: 'Early Adopter' },
            { name: 'Pizza Fanatic' },
        ],
        created_at: moment().subtract('6', 'weeks').toString(),
    },
    {
        key: 24,
        id: '24',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [
            { name: 'VIP Client' },
            { name: 'Dog Lover' },
            { name: 'Dogger' },
        ],
        created_at: moment().subtract('5', 'weeks').toString(),
    },
    {
        key: 25,
        id: '25',
        name: 'Emy Jackson',
        email: 'emy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [
            { name: 'VIP Client' },
            { name: 'Early Adopter' },
            { name: 'Frogger' },
        ],
        created_at: moment().subtract('1', 'weeks').toString(),
    },
    {
        key: 26,
        id: '26',
        name: 'Ruroni Kenshin',
        email: 'rurko@anime.com',
        groups: [{ name: 'VIP Client' }, { name: 'Dog Lover' }],
        created_at: moment().subtract('4', 'weeks').toString(),
    },
    {
        key: 26,
        id: '27',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }, { name: 'Jogger' }],
        created_at: '02/30/2018',
    },
    {
        key: 28,
        id: '28',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('1', 'weeks').toString(),
    },
    {
        key: 29,
        id: '29',
        name: 'Amy Jackson',
        email: 'amy_jac@upmind.com',
        imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        groups: [{ name: 'VIP Client' }],
        created_at: moment().subtract('2', 'weeks').toString(),
    },
];

const renderTimeFilter = (column: HeaderGroup<any>) => (
    <DateFilterSelect
        placeholder="Select Date"
        filterValue={column.filterValue}
        selectOptions={sampleDateOptions}
        selectProps={{ margin: '10px 0' }}
        onOptionsSelected={(value) => column.setFilter(value)}
    />
);
const renderTagFilter = (column: HeaderGroup<any>) => (
    <TagFilterSelect
        placeholder="Select Group Names"
        filterValue={column.filterValue}
        tagProps={{ style: { marginTop: '8px' } }}
        selectOptions={sampleGroupsMapped}
        selectProps={{ margin: '10px 0' }}
        onOptionsSelected={(selectedOptions) =>
            column.setFilter(selectedOptions)
        }
    />
);

const COG_WHEEL_ICON = Cog;

const filterHeader = (
    <ListHeader
        label="Filters"
        headerFlex="space-between"
        icon={COG_WHEEL_ICON}
        iconProps="width: 20px; margin-right: 10px"
        iconClick={() => alert('Icon Clicked')}
    />
);

const getVendorsListProps = (): IVendorsListProps => ({
    filterHeader,
    headerText: 'Clients',
    headerRightButtonText: 'Add Client',
    selectedNavLabel: 'Overview',
    groups: sampleGroupsMapped,
    navigationBarItems: [
        {
            icon: TableView,
            label: 'Overview',
            onNavigate: (label, event) =>
                console.log(label, event?.target, 'this event'),
        },
        {
            icon: List,
            label: 'ListView',
            onNavigate: (label, event) =>
                console.log(label, event?.target, 'this event'),
        },
        {
            icon: ViewGrid,
            label: 'Segment',
            onNavigate: (label, event) =>
                console.log(label, event?.target, 'this event'),
        },
    ],
    filterItems: [
        {
            title: 'Name',
        },
        {
            title: 'Groups',
            element: renderTagFilter,
        },
        {
            title: 'Created',
            element: renderTimeFilter,
        },
    ],
    columns: [
        {
            Header: 'Client',
            accessor: 'name',
            Cell: ({
                row,
            }: CellProps<{
                id: number;
                name: string;
                email: string;
                imageUrl: string;
            }>) => (
                <Profile
                    key={row.original.id}
                    name={row.original.name}
                    email={row.original.email}
                    imageUrl={row.original?.imageUrl}
                />
            ),
            Filter: DefaultFilter,
        },
        {
            Header: 'Groups',
            Cell: ({ row }: CellProps<{ groups: { name: string }[] }>) => (
                <TagContainer
                    tags={row.original.groups.map(
                        (group: IGroups) => group.name,
                    )}
                    isHoverable={false}
                    tagProps={{ style: { marginRight: '10px' } }}
                />
            ),
            Filter: DefaultFilter,
            filter: tabFilterMethod,
        },
        {
            Header: 'Created',
            accessor: 'created_at',
            Cell: ({ row }: CellProps<{ created_at: string }>) => (
                <SmallText
                    style={{ padding: '0 10px' }}
                    key={row.original.created_at}
                >
                    {moment(row.original.created_at).format('LL')}
                </SmallText>
            ),
            Filter: DefaultFilter,
            filter: timeFilterMethod,
        },
    ],
    data: sampleData,
    onSelectRow: (original) => console.log(original, 'contact clicked'),
    listProps: {
        id: 'vendor_list',
        columnWidth: '275px',
        loading: false,
        cssPosition: 'relative',
        margin: '0',
        left: '0',
        right: 'auto',
        mediaMixin: 'tablet',
        mediaCssPosition: 'absolute',
        mediaLeft: '0',
        mediaRight: 'auto',
        mediaMargin: 'auto',
        mediaOnCloseTranslateXAxis: '-100%',
        zIndex: 1,
    },
    globalFilterMethod,
    onExportButtonClick: (rows) => console.log(rows, 'import clicked'),
    onAddButtonClick: () => console.log('add button clicked'),
    tableHeight: '51vh',
    tableMediaHeight: '40vh',
    tableMediaMixin: 'tablet',
});

const Template: Story<IVendorsListProps> = (args) => <VendorsList {...args} />;

export const Basic = Template.bind({});
Basic.args = getVendorsListProps();
