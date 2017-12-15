import React from 'react';
import withStyles from '../tools/withStyles';
import Grid from './Grid';
import styles from './styles';

const GridWithStyles = withStyles(styles)(Grid);

export const Row = props => <GridWithStyles row {...props} />;
export const Col = props => <GridWithStyles col {...props} />;

export default GridWithStyles;
