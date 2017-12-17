import React from 'react';
import withDocs from '../../site/withDocs';

const SystemStyling = ({ compile }) => {
  return (
    <div>
      {compile(`

## Styling System

Arwes uses [HOC](https://reactjs.org/docs/higher-order-components.html)
to provide and process the resources. You need to import the theme provider and
provide it a theme, which extends the default one. This will set the design
settings to use in the components.

\`\`\`javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from 'arwes';

const myTheme = {};  // your theme, extends the default

const App = () => (
  <ThemeProvider theme={createTheme(myTheme)}>
    <div>Arwes</div>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
\`\`\`

Now start the app.

\`\`\`bash
$ npm run start
\`\`\`

The main component which every application should have is the \`Arwes\` component.
It wraps the application with global styles and animations.

\`\`\`javascript
import { ThemeProvider, createTheme, Arwes } from 'arwes';

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes>
      My Arwes App
    </Arwes>
  </ThemeProvider>
);
\`\`\`

If you reload the app, now you'll see the new styles. All components under the theme provider will use the styles provided. For example:

\`\`\`javascript
import { ThemeProvider, createTheme, Arwes, Button } from 'arwes';

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes>
      <div style={{ padding: 20 }}>
        <Button>My Button</Button>
      </div>
    </Arwes>
  </ThemeProvider>
);
\`\`\`

In the theme, the colors are scoped by the object \`color\` and each of them have
3 variations: \`base, dark, light\`. The variations are defined by \`accent\`, the
default is 20% (0.2).

The backgrounds are scoped by the object \`background\` and each of them have 4
variations named \`level0, level1, level2, level3\`, each more lighted. By default
the increment in light is by 1.5% (0.015).

Most components have the ability to get a \`layer\` to define its color/background.
For example, the \`Button\` by default takes the \`primary\` layer. We can change it
to any other:

\`\`\`javascript
const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes>
      <div style={{ padding: 20 }}>
        <Button layer='success'>My Button</Button>
      </div>
    </Arwes>
  </ThemeProvider>
);
\`\`\`

You can see the complete list of styles to define in the Arwes file
[/src/tools/createTheme/theme.js](https://github.com/romelperez/arwes/blob/master/src/tools/createTheme/theme.js).

      `).tree}
    </div>
  );
}

export default withDocs({ title: 'Styling System' }, SystemStyling);
