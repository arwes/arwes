import withStyles from '../tools/withStyles';
import { withSounds } from '@arwes/sounds';
import Frame from './Frame';
import styles from './styles';

export default withStyles(styles)(withSounds()(Frame));
