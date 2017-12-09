Simple grid system components inspired in [MaterializeCSS](http://materializecss.com/grid.html).
Currently it supports rows, columns, nested rows, small, medium, large and xlarge
column sizes and its respectives offsets.

```js
render(
    <div>
        <Row>
            <Col s={12} l={6}>First</Col>
            <Col s={12} l={6}>Second</Col>
            <Col s={12} l={6} offset={['l3']}>Third</Col>
        </Row>
    </div>
);
```

It is possible to create a component which is a row and a column at the same time,
you can pass `row` and `column` as `true` at the same time.
