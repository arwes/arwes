import withStyles from 'react-jss';
import { SandboxEditor as Component } from './SandboxEditor.component';
import { styles } from './SandboxEditor.styles';

const SandboxEditor = withStyles(styles)(Component);

export { SandboxEditor };
