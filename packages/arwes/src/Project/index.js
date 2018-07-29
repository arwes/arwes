import withStyles from '../tools/withStyles';
import { withSounds } from '@arwes/sounds';
import Project from './Project';
import styles from './styles';

export default withStyles(styles)(withSounds()(Project));
