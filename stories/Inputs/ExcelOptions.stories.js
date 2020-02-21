import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { ExcelOptions } from '../../src';

storiesOf('ExcelOptions', module)
    .addDecorator(withKnobs)
    .add('with default', () => {
        return (
            <div>
                <ExcelOptions
                    headers={[
                        '_id',
                        'created_at',
                        'total',
                        'reason',
                        'description',
                        'status',
                    ]}
                    defaultHeaders={[
                        '_id',
                        'created_at',
                        'total',
                        'reason',
                        'description',
                        'status',
                    ]}
                    onResult={data => console.log(data)}
                />
            </div>
        );
    });
