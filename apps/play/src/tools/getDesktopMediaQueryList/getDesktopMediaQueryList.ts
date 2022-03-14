import { theme } from '../../theme';

const getDesktopMediaQueryList = (): MediaQueryList =>
  window.matchMedia(theme.breakpoints.tabletUp.replace('@media ', ''));

export { getDesktopMediaQueryList };
