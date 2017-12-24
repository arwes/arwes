```javascript
const Item = withStyles(theme => ({
    root: {
        marginBottom: 20,
        width: '100%',
        height: 20,
        transition: `all ${theme.animTime}ms ease-out`,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 1,
        color: '#fff',
        background: '#0d94fe',
        [`@media (min-width: ${theme.responsive.small + 1}px)`]: {
            background: '#00be02'
        },
        [`@media (min-width: ${theme.responsive.medium + 1}px)`]: {
            background: '#8f009c'
        },
        [`@media (min-width: ${theme.responsive.large + 1}px)`]: {
            background: '#ba7b01'
        },
    },
}))(({ classes, n }) => (
    <div className={classes.root}>{n}</div>
));
render(
    <div>
        <Row col s={6} m={4} offset={['s3', 'm4']}>
            <Item n={1} />
        </Row>
        <Row>
            <Col s={12} m={6} l={4} xl={3}><Item n={2} /></Col>
            <Col s={12} m={6} l={4} xl={3}><Item n={3} /></Col>
            <Col s={12} m={6} l={4} xl={3}><Item n={4} /></Col>
            <Col s={12} m={6} l={4} xl={3} offset={['l4']}><Item n={5} /></Col>
        </Row>
        <Row>
            <Col s={12}>
                <Row nested noMargin>
                    <Col s={6}><Item n={6} /></Col>
                    <Col s={6}><Item n={7} /></Col>
                </Row>
            </Col>
        </Row>
    </div>
);
```
