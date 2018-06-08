```javascript
render(
    <Arwes>
        <p>
            This is an inline
            <Code animate>const id = x => x;</Code>
            code rendered.
        </p>
        <p>But we can also render a full example:</p>
        <Code animate type='pre' language='javascript'>{
`// An arbitrary example
class Code extends Component {
    constructor () {
        super(...arguments);
        this.mapProps('something pretty');
    }
    // An advanced high tech method
    mapProps (obj, map) {
      const newObj = Object.keys(obj || {
          random: 'key'
      });
      if (!props.length) {
          newObj.update('sci fi cyberpunk');
      }
      const result = 100.45 + 71.25 / 10;
      return true ? newObj : false;
    }
}`
        }</Code>
        <p>And another example with more details:</p>
        <Code animate type='pre' language='css'>{
`/* Some global classes */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
html, body {
  margin: 0;
  padding: 0;
}
.play {
  position: fixed;
  left: 0; right: 0;
  top: 0; bottom: 0;
  display: flex !important;
  flex-direction: column;
  background-color: #000000;
  color: #00ffff;
}`
        }</Code>
        <p>Where the code is more complete.</p>
    </Arwes>
);
```
