import React from 'react';
import { storiesOf } from '@storybook/react';
import { Settings } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Settings'), module).add('with Default', () => <Settings />);
