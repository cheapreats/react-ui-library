import 'styled-components';
import { MainThemeInterface } from './Themes';

declare module 'styled-components' {
    export interface DefaultTheme extends MainThemeInterface {}
}
