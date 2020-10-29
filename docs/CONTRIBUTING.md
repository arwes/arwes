> **THIS DOCUMENT IS OUTDATED.**

All your contributions are welcome!

There are many ways to help out:

- If you have found a bug, Create an issue on GitHub
- Fix and write test cases for open bug issues
- Improve the documentation
- Blog about how to use tools or brag about how they work for you
- Create new tools based on Arwes

When contributing to this repository, please first discuss the change you wish to
make [via issue](https://github.com/arwes/arwes/issues/new) with the owners
of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it
in all your interactions.

## Conventions

[editorconfig](http://editorconfig.org) is used for common file conventions.

[standardjs](https://standardjs.com) style guide is used with minor tweaks with
[eslint](https://eslint.org).

Please install in your editor/IDE the respective plugins/packages.

## Architecture

### Components

The React components follow this file structure:

```text
/[componentNameInCamelCase]/
    [componentNameInCamelCase].component.js - Code
    [componentNameInCamelCase].styles.js - Styles
    [componentNameInCamelCase].test.js - Tests
    [componentNameInCamelCase].[feature].test.js - Tests for a feature
    index.js - Integration Exports
    sandbox.js - Playground sandbox
    README.js - Documentation
```

- Use [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent)
when applicable.
- Dependency injection and integrations are setup using high-order components,
and the components receive their dependencies via props.
- Components styles main class should be named "root" using CSSinJS.
- Patterns like [Render Props](https://reactjs.org/docs/render-props.html) are not
used since some Arwes functionalities need to keep the components life-cycles and
these patterns make components re-mount on re-render.
- Use named export variables instead of default.
- Imports should be at the beginning and exports at the end of file.

Example: In a "jungle" package, this is a simple styled "Hawk" component
(without animations and without sounds) which uses another component named "Wings"
in the same package.

```js
// packages/jungle/src/Hawk/Hawk.component.js

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Component extends React.PureComponent {
    static propTypes = {
        Wings: PropTypes.element.isRequired,
        classes: PropTypes.object.isRequired,
        className: PropTypes.string
        children: PropTypes.any
    };

    render () {
        const { Wings, classes, className, children, ...otherProps } = this.props;
        const rootClassname = cx(classes.root, className);
        return (
            <div className={rootClassname} {...otherProps}>
                <div className={classes.head}>Hawk</div>
                <div className={classes.body}>{children}</div>
                <Wings className={classes.wings} />
            </div>
        );
    }
}

export { Component };
```

```js
// packages/jungle/src/Hawk/Hawk.styles.js

const styles = () => ({
    root: { ... },
    head: { ... },
    body: { ... },
    wings: { ... }
});

export { styles };
```

```js
// packages/jungle/src/Hawk/index.js

import React from 'react';
import { withStyles } from '...';
import { Wings } from '../Wings';
import { Component } from './Hawk.component';
import { styles } from './Hawk.styles';

const ComponentWithDependencies = React.forwardRef((props, ref) => (
    <Component Wings={Wings} {...props} ref={ref} />
));
const Hawk = withStyles(styles)(ComponentWithDependencies);

export { Hawk };
```

### Tools and tool makers

There are modules to create tools instances. They make functions loosely coupled
and simpler to understand. "Partial application" is used as dependency injection
pattern.

- There should not be any call to either node or browser APIs on imports.
- When using the browser APIs, always reference the `window` object. e.g.
`window.document`, `window.localStorage`, `window.URL`...
- Imports should be at the beginning and exports at the end of file.

#### Tool makers

The tools makers should follow the name convention: `make[Tool]`.

```text
/make[Tool]/
    make[Tool].js - Decoupled module
    make[Tool].test.js - Test cases
    index.js - Exports
    README.md - Documentation
```

Example: in a "water" package, this is a water cleaner maker tool.

```js
// packages/water/src/makeClearWater/makeClearWater.js

const makeClearWater = dependencies => {
    const { removeBacteria, removeDirt } = dependencies;
    return water => removeBacteria(removeDirt(water));
};

export { makeClearWater };
```

```js
// packages/water/src/makeClearWater/index.js

export { makeClearWater } from './makeClearWater';
```

#### Tools

Tool modules should be created internally with a tool maker.

```text
/[tool]/
    make[Tool].js - Decoupled module
    make[Tool].test.js - Unit test cases
    index.js - Integrations and Exports
    README.md - Documentation
```

Example: in a "water" package, this is a "clearWater" tool.

```js
// packages/water/src/clearWater/makeClearWater.js

const makeClearWater = dependencies => {
    const { removeBacteria, removeDirt } = dependencies;
    return water => removeBacteria(removeDirt(water));
};

export { makeClearWater };
```

```js
// packages/water/src/clearWater/index.js

import { removeBacteria } from '...';
import { removeDirt } from '...';
import { makeClearWater } from './makeClearWater';

const clearWater = makeClearWater({ removeBacteria, removeDirt });

export { clearWater };
```

## Workflow

This is a monorepo maintained with [lerna](https://lernajs.io).

### Setting up

To install repository dependencies and bootstrap repository packages:

```bash
npm install
```

Post-installation, the packages source code is compiled.

### Compilation

The packages are interconnected by NPM dependencies. They use the compiled/transpiled
code, not the source code. So they need to be compiled for them to work with
their dependencies.

```bash
npm run compile
```

### Testing

To test the components and modules [jest](https://facebook.github.io/jest/),
and [@testing-library/react](https://github.com/testing-library/react-testing-library)
are used. Run them using:

```bash
npm run test # test all packages once
npm run test-dev # test with watcher
npm run lint # run linter
npm run lint-fix # format code if needed
```

### Playground

All components should have playgrounds, where the integrated components can be
tested a real environment.

It is a `webpack-dev-server` listing the components sandboxes and letting
the user choose which one to render.

Each component sandbox should `export default` a React component with the
components tests.

```bash
# run plaground at http://localhost:9000
npm run playground
```

### Git commit messages

For Git commit messages we use the following format: `type: message`.

The categories are:

- feat: add a new feature with tests
- update: improve a current feature with tests
- fix: resolve a bugfix or issue
- refactor: change code structure with possibly breaking changes
- docs: update documentation either in code or markdown
- chore: changes in building, playing, testing, or any other process
- release: release project breakpoint

Examples:

- `feat: SoundsProvider nested support`
- `fix: animation Stream subscription`
- `release: v1.0.0-alpha.14`

### Releasing

In the `master` branch, at root path, run:

```bash
npm run release
```

It will execute the following processes:

- Compile the code.
- Check linter.
- Run tests.
- Lerna publish.

Lerna will take care of publishing to NPM and releasing in GitHub.

To update the changelog after release:

```bash
npm run changelog
git add CHANGELOG.md
git commit -m "chore: changelog"
```

-------

Have a question or an idea? Share it on [Discord](https://discord.gg/s5sbTkw)!

Thank you for your contributions! :alien: :blue_heart:
