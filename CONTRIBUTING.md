# How to contribute

The Arwes project would love to welcome your contributions! There are many ways
to help out:

- Create an issue on GitHub, if you have found a bug
- Write test cases for open bug issues
- Write patches for open bug/feature issues, preferably with test cases included
- Contribute to the documentation
- Blog about how to use the package and its tools or brag about how it works for you

When contributing to this repository, please first discuss the change you wish to
make [via issue](https://github.com/romelperez/arwes/issues/new) with the owners
of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it
in all your interactions with the project.

## Development

### Install

This package uses React v16. To install repository dependencies:

```bash
$ npm install
```

### Playground

[react-live](https://react-live.philpl.com/) is used to play with the components.
To start the playground to experiment with them:

```bash
$ npm run play
```

It will start a server at [`http://127.0.0.1:7100`](http://127.0.0.1:7100)
to list all components to play with.

The playground application is run with the app in `/play`. Each component
sandbox is defined in each component folder with the file `Play.md` where the
code snippet will be passed to react-live to execute it. The assets in the
`/static` folder are used.

### Testing

To test the components and modules [karma](http://karma-runner.github.io),
[chai](http://chaijs.com), [sinon](http://sinonjs.org) and [enzyme](http://airbnb.io/enzyme/)
are used. Run them using:

```bash
# run linter and tests once
$ npm run test
# or with watcher
$ npm run test-dev
```

### Site

[next.js](https://github.com/zeit/next.js/) is used with support to read Markdown
files as `text/plain`. The pages are in `/pages`, the components and utilities
for the website are in `/site` and static files are served from `/static`.

The script `/script/api.js` (run with `$ npm run script-api`) creates the
documentation definitions for the components to be used in the site.

Run the website with:

```bash
$ npm run site-dev
```

It will open a server at [`http://127.0.0.1:7000`](http://127.0.0.1:7000).

## Guidelines

The Airbnb [JavaScript Style Guide](https://github.com/airbnb/javascript) is used.

Install [editorconfig](http://editorconfig.org) and [eslint](https://eslint.org)
in your editor/IDE and follow the conventions established by them.
