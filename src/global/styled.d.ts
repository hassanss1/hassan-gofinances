import styled from 'styled-components';
import theme from '../global/styles';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
