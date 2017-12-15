import withStyles from '../tools/withStyles';
import withSounds from '../tools/withSounds';
import Button from './Button';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Button)
);
