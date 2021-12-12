import React  from 'react';
import { Global } from '../src';
import { MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';

// Storybook Parameter Configuration
export const parameters = {
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Design System'],
            locales: 'en-US',
        },
    },
    actions: { 
        argTypesRegex: "^on[A-Z].*" 
    },
    controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/,
        },
    },
    // Storybook a11y addon configuration
    a11y: {
        // optional selector which element to inspect
        element: '#root',
        // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
        config: {},
        // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
        options: {},
        // optional flag to prevent the automatic check
        manual: true,
    },
    backgrounds: {
        default: '',
        values: [
            {
                name: 'CheaprEats White',
                value: '#00aced'
            },
            {
                name: 'CheaprEats Black',
                value: '#3b5998'
            },
        ],
    },
    viewport: {
        viewports: {
            ...MINIMAL_VIEWPORTS,
            kindleFire2: {
                name: 'Kindle Fire 2',
                styles: {
                    width: '600px',
                    height: '963px',
                },
              },
              kindleFireHD: {
                  name: 'Kindle Fire HD',
                  styles: {
                      width: '533px',
                      height: '801px',
                  },
              },
        },
    },
};

export const globalTypes = {
    locale: {
        name: 'Locale',
        description: 'Internationalization locale',
        defaultValue: 'none',
        toolbar: {
            icon: 'globe',
            items: [
                { value: 'none', right: '', title: 'None' },
                { value: 'en', right: '🇺🇸', title: 'English' },
                { value: 'fr', right: '🇫🇷', title: 'Français' },
                { value: 'es', right: '🇪🇸', title: 'Español' },
                { value: 'zh', right: '🇨🇳', title: '中文' },
                { value: 'kr', right: '🇰🇷', title: '한국어' },
            ],
        },
    },
};

// Global provider
const style = theme => `
    body {
        padding: 20px;
        box-sizing: border-box;
        min-height: 100vh;
    }
`;


export const decorators = [
    story => {
        if (!document.querySelector('#modal')) {
            const modal = document.createElement('div');
            document.body.append(modal);
            modal.id = 'modal';
        }
        return <Global style={ style }>{ story() }</Global>;
    }
];