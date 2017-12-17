import React from 'react';
import withDocs from '../../site/withDocs';

const Documentation = ({ compile }) => {
  return (
    <div>
      {compile(`

## Arwes

Arwes is a web framework to build user interfaces for
web applications based on science fiction and cyberpunk styles guidelines, animations
and sounds effects. The idea is to **provide an user experience as if you were using
futuristic out of a movie interfaces** for your project.

The tools are based on [React](https://reactjs.org) for components,
[JSS](http://cssinjs.org) for styles,
[react-transition-group](https://reactcommunity.org/react-transition-group/) for
animations, [Howler](https://howlerjs.com/) for sounds and [Prism](http://prismjs.com)
for code highlighting.

> Currently is under development with an alpha version available on npm. API may change.

### Get Started

Let's create a simple example with
[create-react-app](https://github.com/facebookincubator/create-react-app)
and install Arwes.

\`\`\`bash
$ create-react-app example
$ cd example
$ npm install --save arwes
\`\`\`

Images and sounds are not provided, if you want to use the implemented in the docs,
download them from the repository in GitHub.

Once installed, enter to the folder and empty the \`src/index.js\` to start
from scratch.

1. [Styling System](/docs/system-styling)
2. [Animation System](/docs/system-animation)
3. [Sounds System](/docs/system-sounds)
4. [Grid System](/docs/system-grid)
5. [Loader Tool](/docs/tool-loader)
6. [Responsive Tool](/docs/tool-responsive)
7. [Player Tool](/docs/tool-player)

      `).tree}
    </div>
  );
}

export default withDocs({ title: 'Get Started' }, Documentation);
