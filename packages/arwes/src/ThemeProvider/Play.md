```javascript
// import { ThemeProvider, createTheme, withStyles } from 'arwes';

const MyColor = withStyles(theme => ({
    root: {
        width: 300,
        height: 120,
        transition: `background-color ${theme.animTime}ms ease-out`,
        backgroundColor: theme.color.primary.base,
    },
}))(props => (
    <div className={props.classes.root} />
));

class MyApp extends React.Component {
    constructor () {
        super(...arguments);
        const color = '#22179a';
        this.state = { color, theme: this.getTheme(color) };
        this.onChange = this.onChange.bind(this);
    }
    render () {
        const { color, theme } = this.state;
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
        const color = ev.target.value;
        const theme = this.getTheme(color);
        this.setState({ color, theme });
    }
    getTheme (color) {
        return createTheme({
            color: {
                primary: { base: color }
            }
        });
    }
}

render(<MyApp />);
```
