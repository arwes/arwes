import { Styles } from 'jss';

import { theme } from '../../theme';

const styles: Styles = {
  root: {
    display: 'block'
  },
  rendered: {
    display: 'block'
  },
  error: {
    display: 'block',
    margin: 0,
    padding: 10,
    color: theme.color.error
  }
};

export { styles };
