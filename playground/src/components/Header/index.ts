import withStyles from 'react-jss';
import { Header as Component } from './Header.component';
import { styles } from './Header.styles';

const Header = withStyles(styles)(Component);

export { Header };
