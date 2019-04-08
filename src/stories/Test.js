import React, { Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Draggable } from '../components/preview';

const test = {
    "data": {
      "vendors": [
        {
          "_id": "5b1c24c0fea5e777a2ad71ea",
          "categories": [
            {
              "_id": "5b2ad652728f436eeee78482",
              "name": "Salads",
              "sort_order": 1,
              "menu_item_count": 9
            },
            {
              "_id": "5b2ad58a728f436eeee78469",
              "name": "Hot Drinks",
              "sort_order": 2,
              "menu_item_count": 3
            },
            {
              "_id": "5c8ab96acf72163546d0bbdd",
              "name": "Bananas",
              "sort_order": 3,
              "menu_item_count": 0
            }
          ]
        }
      ]
    }
  };

const Item = styled.li`
    background-color: rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
`;

storiesOf('DragMe', module)
    .add('with text', () => (
        <Draggable
          onChange={(a, b) => console.log(a, b)}
        >
            {
                test.data.vendors[0].categories.map(({ _id, name, menu_item_count }) => (
                    <Fragment key={ _id } as={ Item } onClick={() => console.log('CLICK')}>
                        <p>{ name }</p>
                        <p>{ menu_item_count }</p>
                    </Fragment>
                ))
            }
        </Draggable>
    ), {
        notes: ``
    });