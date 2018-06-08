```javascript
render(
    <Arwes>
        <div style={{ padding: 20 }}>
            <Table
                animate
                headers={['Prop name', 'Type', 'Default', 'Description']}
                dataset={[
                    ['name', 'string', '\'\'', 'The base name of the component'],
                    ['age', 'number', '0', 'The age of the component'],
                    ['married', 'bool', 'false', 'If the component is married'],
                ]}
            />
        </div>
    </Arwes>
);
```
