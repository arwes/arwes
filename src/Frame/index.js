import withStyles from 'react-jss/lib/injectSheet';
import withSounds from '../tools/withSounds';
import Frame from './Frame';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Frame)
);
