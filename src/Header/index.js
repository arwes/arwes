import withStyles from 'react-jss/lib/injectSheet';
import withSounds from '../tools/withSounds';
import Header from './Header';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Header)
);
