# Grid System

Arwes implements a `<Grid />` component and its extensions `<Row />` and `<Col />`
components to create grids and layout your application.

Using the [Design System](/docs/design-system) `<ThemeProvider />` theme the
grid is configured and by providing the grid components with specific props you
can create pretty much complex layouts.

## Rows and Columns

The structure for the grid is mostly ported from [MaterialCSS Grid](http://materializecss.com/grid.html)
into [react-jss](http://cssinjs.org/react-jss/). The rows and columns behave the
same. You create rows and inside you add your columns as a real grid. Review their
docs to get to know how it works.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme, Row, Col } from 'arwes';

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Row>
      <Col s={6}>First Column</Col>
      <Col s={6}>Second Column</Col>
    </Row>
    <Row>
      <Col s={12} m={6}>Third Column</Col>
      <Col s={12} m={6}>Fourth Column</Col>
      <Col s={12} m={6}>Fifth Column</Col>
    </Row>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

In this example there are 2 rows, in the first one 2 columns with 50% width always.
In the second row there are 3 columns, 100% width on small and 50% on medium and so on.

## Columns

The `<Col />` component can take the props of:

- `s: number` - With the number of columns when device is in small breakpoint.
- `m: number` - With the number of columns when device is in medium breakpoint.
- `l: number` - With the number of columns when device is in large breakpoint.
- `xl: number` - With the number of columns when device is in xlarge breakpoint.

The number of columns can be configured in the theme with the property `columns`.
By default is `12`. So any column can take from `1` to `12`.

## Breakpoints

There are 3 breakpoints in a device viewport width in pixels:

- `small` - From `0` to this width, it is small.
- `medium` - From `small + 1` to this width, it is medium.
- `large` - From `medium + 1` to this width, it is large. And from `large + 1`
is is `xlarge`.

They are configured in the [Design System](/docs/design-system) theme. By default:

```javascript
const myTheme = {
  responsive: {
    small: 600,
    medium: 992,
    large: 1200
  }
};
```

## Offsets

They are configured in the columns and behave the same way as from MaterialCSS.

```javascript
const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Row>
      <Col s={12} m={8} l={6} offset={['m2', 'l3']}>
        Centered Column
      </Col>
    </Row>
  </ThemeProvider>
);
```

In this example, the column uses 100% width in small, in medium it is 66.6% width
and has an offset of 16.6% so it is centered and in large it uses 50% width and has
an offset of 25% and it is centered.
