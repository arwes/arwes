```javascript
const style = { display: 'inline-block' };
const Example = () => <div style={{ padding: '20px' }}>Cyberpunk</div>;
render(
    <Arwes>
        <Highlight animate={false} style={style}><Example /></Highlight>
        {' '}
        <Highlight style={style}><Example /></Highlight>
        {' '}
        <Highlight layer='success' style={style}><Example /></Highlight>
        {' '}
        <Highlight layer='alert' style={style}><Example /></Highlight>
    </Arwes>
);
```
