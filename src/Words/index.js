import withStyles from 'react-jss/lib/injectSheet';
import withSounds from '../tools/withSounds';
import Words from './Words';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Words)
);
