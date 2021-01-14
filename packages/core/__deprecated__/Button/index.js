import withStyles from '../tools/withStyles';
import { withSounds } from '@arwes/sounds';
import Button from './Button';
import styles from './styles';

export default withStyles(styles)(withSounds()(Button));
