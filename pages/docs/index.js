import React from 'react';
import withDocs from '../../site/withDocs';

const Documentation = ({ compile }) => {
  return (
    <div>
      {compile(`

# SciFi UI Framework

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

## Install

\`\`\`bash
$ npm install --save arwes
\`\`\`

## Need help?

Open [a GitHub issue](https://github.com/romelperez/arwes/issues/new).

## Want to contribute?

See [contributing guidelines](https://github.com/romelperez/arwes/blob/master/CONTRIBUTING.md).
All contributions of any kind are welcome!

## Inspiration

This project has many inspiration sources, some of them:

- [Orbit SciFi UI Kit](https://creativemarket.com/dannehr/163951-Orbit-SciFi-UI-Kit)
- [Hi-Tech Interface Builder Pack](https://www.behance.net/gallery/19051971/Hi-Tech-Interface-Builder-Pack)
- [Star Citizen](http://robertsspaceindustries.com)
- [Halo](https://www.halowaypoint.com/en-us/games/halo-2)
- [UXBERT High Tech Sci-Fi UX Dashboards, Infographics, Visual UI Elements](https://www.youtube.com/watch?v=NGIJDM2Xf4w)
- [TRON: Legacy](http://www.imdb.com/title/tt1104001/)
- [Ghost in the Shell](http://www.imdb.com/title/tt1219827/)

## Get Started

Let's create a simple example with
[create-react-app](https://github.com/facebookincubator/create-react-app)
and install Arwes.

\`\`\`bash
$ create-react-app example
$ cd example
$ npm install --save arwes
\`\`\`

Images and sounds are not provided, if you want to use the implemented in the docs,
download them from the [repository in GitHub](https://github.com/romelperez/arwes).

Once installed, enter to the folder and empty the \`src/index.js\` to start
from scratch.

## Guides

Once setup, explore the features.

- [Design System](/docs/design-system)
- [Animation System](/docs/animation-system)
- [Sounds System](/docs/sounds-system)
- [Grid System](/docs/grid-system)
- [Responsive Tool](/docs/responsive-tool)
- [Loader Tool](/docs/loader-tool)
- [Player Tool](/docs/player-tool)

      `).tree}
    </div>
  );
}

export default withDocs(Documentation);
