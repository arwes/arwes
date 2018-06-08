Simple grid system components inspired in [MaterializeCSS](http://materializecss.com/grid.html).
Currently it supports rows, columns, nested rows, small, medium, large and xlarge
column sizes and its respectives offsets.

```javascript
<Row>
    <Col s={12} l={6}>First</Col>
    <Col s={12} l={6}>Second</Col>
    <Col s={12} l={6} offset={['l3']}>Third</Col>
</Row>
```

The `<Row />` components is a shortcut for `<Grid row />` and the `<Col />` component
is a shortcut for `<Grid col />`.

It is possible to create a component which is a row and a column at the same time,
you can pass `row` and `col` as `true` at the same time.

```javascript
<Row col s={12}>
    <p>App Content</p>
</Row>
```

A nested row would not required lateral margins so you can use:

```javascript
<Row col s={12}>
    <p>Rows inside rows:</p>
    <Row nested>
        <Col s={12}>
            <p>Awesome</p>
        </Col>
    </Row>
</Row>
```
