import withStyles from 'react-jss/lib/injectSheet';
import withSounds from '../tools/withSounds';
import Footer from './Footer';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Footer)
);
