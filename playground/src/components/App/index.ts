import withStyles from 'react-jss';
import { App as Component } from './App.component';
import { styles } from './App.styles';

const App = withStyles(styles)(Component);

export { App };
