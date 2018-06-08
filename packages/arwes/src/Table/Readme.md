The component is a wrapper and replacement for the `<table />` component and its
children. You can either pass the `headers` and `dataset` or pass the `children`
with the whole table (including the `<table />` component).

```javascript
<Table
    animate
    headers={['Prop name', 'Type', 'Default', 'Description']}
    dataset={[
        ['name', 'string', '\'\'', 'The base name of the component'],
        ['age', 'number', '0', 'The age of the component'],
        ['married', 'bool', 'false', 'If the component is married'],
    ]}
/>
```

Currently only supports rows with columns the same width.
