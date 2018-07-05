# How to contribute

The Arwes project would love to welcome your contributions :blue_heart:

There are many ways to help out:

- Create an issue on GitHub, if you have found a bug
- Write test cases for open bug issues
- Write patches for open bug/feature issues, preferably with test cases included
- Contribute to the documentation
- Blog about how to use the package and its tools or brag about how it works for you

When contributing to this repository, please first discuss the change you wish to
make [via issue](https://github.com/arwesjs/arwes/issues/new) with the owners
of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it
in all your interactions.

## Conventions

The Airbnb [JavaScript Style Guide](https://github.com/airbnb/javascript) is used.

For code style and code formatting, in your editor or IDE, install the following
tools plugins/packages:

- [editorconfig](http://editorconfig.org)
- [eslint](https://eslint.org)
- [prettier](https://prettier.io)

The conventions followed are defined in their respective settings.

## Architecture

### Components

The React components follow this folder structure:

```text
/[componentNameInCamelCase]/
    [componentNameInCamelCase].js - The React component code without HOCs
    [componentNameInCamelCase].test.js - Component test cases
    styles.js - The component styles using JSS (a CSSinJS implementation) if they apply
    index.js - Export the component with its React HOCs
    sandbox.js - Playground sandbox to test component
    Readme.js - Component docs and small demos
```

Example: In a "jungle" package, this is a simple styled Hawk component
(without animations and without sounds) which uses another component named Wings
in the same package.

```js
// packages/jungle/src/Hawk/Hawk.js
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import WingsComponent from '../Wings';
export default function Hawk(props) {
    const { Wings, theme, classes, className, children, ...etc } = props;
    const cls = cx(classes.root, className);
    return (
        <div className={cls} {...etc}>
            <div className={classes.head}>Hawk</div>
            <div className={classes.body}>{children}</div>
            <Wings className={classes.wings} />
            <div className={classes.legs} />
        </div>
    );
}
Hawk.propTypes = {
    Wings: PropTypes.any.isRequired,
    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired
};
Hawk.defaultProps = {
    Wings: WingsComponent
};

// packages/jungle/src/Hawk/styles.js
export default theme => ({ // CSSinJS
    root: { ... },
    head: { ... },
    body: { ... },
    wings: { ... },
    legs: { ... }
});

// packages/jungle/src/Hawk/index.js
import withStyles from '.../withStyles'; // JSS HOC
import Hawk from './Hawk';
import styles from './styles';
export default withStyles(styles)(Hawk);
```

- Components should be simple functions unless they really require to be classes.
- Use `React.PureComponent` when applicable.
- Components does not use their dependencies directly, they should be passed
down as props so the testing is easier.
- By default, all styled components using JSS receive `theme` and `classes`
so they can be handled in component code.
- Components styles main class should be named "root" using JSS.

### Tools makers

These are general purpose modules to be used independently of React components
and should work universally, client and server side.

These are modules to create tools instances. The tools makers should follow the
name convention: `make[ToolNameInCamelCase]`.

```text
/make[ToolNameInCamelCase]/
    make[ToolNameInCamelCase].js - The module without dependencies
    make[ToolNameInCamelCase].test.js - Their test cases
    index.js - Export the module with default dependencies
    Readme.md - How to use
```

Example: in a "water" package, this is a water cleaner maker tool. All
dependencies are optional but we can define our own.

```js
// packages/water/src/makeWaterCleaner/makeWaterCleaner.js
const makeWaterCleaner = dependencies => {
    return {
        clean: water => dependencies.removeBacteria(dependencies.removeDirt(water))
    };
};

// packages/water/src/makeWaterCleaner/index.js
import removeDirt from 'removeDirt';
import removeBacteria from 'removeBacteria';
import makeWaterCleaner from './makeWaterCleaner';
export default providedDependencies =>
  makeWaterCleaner({
    removeDirt,
    removeBacteria,
    ...providedDependencies
  });

// usage.js
import makeWaterCleaner from '@arwes/water/makeWaterCleaner';
const removeBacteria = water => { ... };
const waterCleaner = makeWaterCleaner({ removeBacteria });
const cleanWater = waterCleaner.clean(myWater);
```

- All tools are creators to facilitate the dependency injection for any
purpose, mostly for testing.
- When using the browser APIs, always reference the `window` object. e.g.
`window.document`, `window.localStorage`, `window.URL`...
- There should not be any call to either node or browser APIs on imports.

## Development

This is a monorepo maintained with [lerna](https://lernajs.io) for bootstrapping,
but we don't used it for publishing. Each package is published independently.

### Install and setup

To install repository dependencies and bootstrap repository packages:

```bash
$ npm install
$ npm i -g lerna
$ lerna bootstrap
```

### Testing and code guidelines

To test the components and modules [jest](https://facebook.github.io/jest/),
[sinon](http://sinonjs.org), and [enzyme](http://airbnb.io/enzyme/) are used.
Run them using:

```bash
# test all packages once
$ npm run test

# tests with watcher
$ npm run test-dev

# run linter
$ npm run lint

# format code when needed
$ npm run format
```

### Git commit messages

For Git commit messages we use the following format:

- `feat: add a new feature with tests`
- `update: improve a current feature with tests`
- `fix: resolve a bugfix or issue`
- `refactor: change code structure with possibly breaking changes`
- `docs: update documentation either in code or markdown`
- `chore: changes in building, playing, testing, or any other process`
- `release: release project breakpoint`

_The syntax `[type] message` is now deprecated in this repo._

### Playground

All components should have a playground, where the integrated components
can be tested in development.

This is a `webpack-dev-server` importing the list of components sandboxes and
letting the user choose which one to render.

```text
/playground/
    /img/
    /sound/
    index.html
    playground.js - Playground application
    sandboxes.js - Define list of components sandboxes
```

Each component sandbox should `export default` a React component with the
components tests.

```bash
# run plaground at http://localhost:9000
$ npm run playground
```

## Releasing

Before releasing, please make sure all tests pass and code format and styles
are ok.

Lerna is not used for releasing.

### NPM

Each package has to be compiled and released to npm independently.

In each package `/packages/[packageName]/` you wish to release, update their
`package.json` versions accordingly and run:

```bash
$ npm run compile
$ npm run release
```

### Git

We use the `master` branch to release the packages. Other branches are used
for development.

To release to Git in GitHub, in the `master` branch, use the npm command:

```bash
$ npm run release-git
```

It will update the [CHANGELOG.md](./CHANGELOG.md) file, create a commit and
a tag with the version of the `@arwes/arwes` package and push it to GitHub.

-------

Have a question or an idea? Share it on [Discord](https://discord.gg/s5sbTkw)!

Thanks for your contributions :blue_heart:
