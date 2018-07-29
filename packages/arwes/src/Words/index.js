import withStyles from '../tools/withStyles';
import { withSounds } from '@arwes/sounds';
import Words from './Words';
import styles from './styles';

export default withStyles(styles)(withSounds()(Words));
