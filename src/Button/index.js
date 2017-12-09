import withStyles from 'react-jss/lib/injectSheet';
import withSounds from '../tools/withSounds';
import Button from './Button';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Button)
);
