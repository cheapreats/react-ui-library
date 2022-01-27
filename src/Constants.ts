import { useGlobals } from '@storybook/addons';

export const COMPONENTS_TITLE = 'Components';

export const createStoryTitle = (componentName: string): string =>
    `${COMPONENTS_TITLE}/${componentName}`;

export const getCaptionForLocale = (children?: string): string => {
    const [{ locale }] = useGlobals();
    if (children && locale === 'none') {
        return children;
    }
    switch (locale) {
    case 'es':
        return 'Hola!';
    case 'fr':
        return 'Bonjour!';
    case 'kr':
        return '안녕하세요!';
    case 'zh':
        return '你好!';
    default:
        return 'Hello!';
    }
};
