```javascript
// import { ThemeProvider, createTheme, withStyles } from 'arwes';

const MyColor = withStyles(theme => ({
    root: {
        width: 300,
        height: 120,
        transition: 'background-color 200ms ease-out',
        backgroundColor: theme.color.primary.base,
    },
}))(props => (
    <div className={props.classes.root} />
));

class MyApp extends React.Component {
    constructor () {
        super(...arguments);
        this.state = { color: '#22179a' };
        this.onChange = this.onChange.bind(this);
    }
    render () {
        const { color } = this.state;
        const theme = createTheme({
            color: {
                primary: { base: color }
            }
        });
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <label htmlFor='colorPrimary'>Primary Color: </label>
                    <input
                        id='colorPrimary'
                        value={color}
                        onChange={this.onChange}
                    />
                    <MyColor />
                </div>
            </ThemeProvider>
        );
    }
    onChange (ev) {
        this.setState({ color: ev.target.value });
    }
}

render(<MyApp />);
```
