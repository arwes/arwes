import withStyles from 'react-jss/lib/injectSheet';
import withSounds from '../tools/withSounds';
import Project from './Project';
import styles from './styles';

export default withStyles(styles)(
  withSounds()(Project)
);
