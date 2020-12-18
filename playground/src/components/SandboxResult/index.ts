import { withLive } from 'react-live';
import withStyles from 'react-jss';
import { SandboxResult as Component } from './SandboxResult.component';
import { styles } from './SandboxResult.styles';

const SandboxResult = withStyles(styles)(withLive(Component));

export { SandboxResult };
