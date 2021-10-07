import React from 'react';
import styled from 'styled-components';
import { ClickableSmallText } from '@Text';
import { Heading } from '@Text';
import { flex } from '@Utils/Mixins';
import { useArgs } from '@storybook/client-api';
import { 
    List,
    ListFooter,
    ListHeader,
    ListHeaderProps,
    ListItem,
    ListProps,
    ListToggle,
} from '../../index';



interface RowProps {
    padding?: string;
    width?: number;
}

export interface HighlightedTextProps {
    labels: Array<string>;
    options: Array<Array<string>>;
    display?: string;
    type?: string;
    padding?: string;
    width?: number;
    size?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
    labels,
    options,
    display,
    type,
    padding,
    width,
    size,
    children,
    ...props
}): React.ReactElement => {
    const onClick = () => {
        console.log('hey')
    };
    
    let items = [
        { key: '1', data: 'data', date: 'today' },
        { key: '2', data: 'data', date: 'yesterday' },
        { key: '3', data: 'data', date: 'today' },
        { key: '4', data: 'data', date: 'yesterday' },
        { key: '5', data: 'data', date: 'today' },
        { key: '7', data: 'data', date: 'yesterday' },
        { key: '8', data: 'data', date: 'today' },
        { key: '9', data: 'data', date: 'yesterday' },
        { key: '10', data: 'data', date: 'today' },
        { key: '11', data: 'data', date: 'yesterday' },
        { key: '12', data: 'data', date: 'today' },
    ];
    let args = {
        header: (
            <ListHeader
                label="Header"
                headerFlex="space-between"
                // icon={COG_WHEEL_ICON}
                iconProps="width: 20px; margin-right: 10px;"
                iconClick={() => alert('Icon Clicked')}
            />
        ),
        footer: (
            <ListFooter>
                <p>This is a list Footer</p>
            </ListFooter>
        ),
        // isOpen: false,
        columnWidth: '300px',
        loading: false,
        cssPosition: 'string',
        margin: '0',
        left: '0',
        right: 'auto',
        id: '1',
        mediaMixin: 'tablet',
        mediaCssPosition: 'string',
        mediaLeft: '0',
        mediaRight: 'auto',
        mediaMargin: 'auto',
        mediaOnCloseTranslateXAxis: '-100%',
    }

    return (
        <HighlightedRow padding={padding} width={width} {...props}>
            <p>
            We’re a <ClickableSmallText onClick={onClick}>Team</ClickableSmallText> of professionals working
            hard to provide free learning content.
            </p>
            <List {...args}>
                {items.map((item) => (
                    <ListItem
                        onClick={() => alert(`You clicked ${item.date}`)}
                    >
                        <p>{item.date}</p>
                    </ListItem>
                ))}
            </List>
        </HighlightedRow>
    )
};

const HighlightedRow = styled.div<RowProps>`
    padding: ${(props): string => props.padding || '10px 10px'};
    width: ${(props): number | undefined => props.width}px;
`;
