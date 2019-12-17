# Frequently Asked Questions

<!-- TODO: Update questions when the next "stable" alpha/beta is released. -->
<!-- TODO: Update questions when the website is released. -->

## When Arwes will be ready for production?

Arwes is currently in _alpha_ version. It means there is ongoing development,
APIs and guidelines can change and have breaking changes.

An ideal Arwes project _beta_ release would be for **2020 Q2**.

A stable version is expected to be released anytime in **2020**.

See [roadmap](./ROADMAP.md) for more details.

## What is the status of the development?

Arwes is being worked on packages. The functional packages can be developed
in parallel, except for `@arwes/core` which depends on the other functional
ones.

The guidelines are the main concepts used for all design implementations and
can be worked in parallel with the functional packages.

Once the functional packages and the guidelines are ready, the `@arwes/arwes`
package can be started. And later the documentation and the website.

In the packages information there is a badge indicating its status.

- <img src="https://img.shields.io/badge/status-in%20concept-999999.svg" alt="status">
- <img src="https://img.shields.io/badge/status-in%20specification-blue.svg" alt="status">
- <img src="https://img.shields.io/badge/status-in%20development-orange.svg" alt="status">
- <img src="https://img.shields.io/badge/status-in%20polishing-yellow.svg" alt="status">
- <img src="https://img.shields.io/badge/status-in%20testing-purple.svg" alt="status">
- <img src="https://img.shields.io/badge/status-in%20production-green.svg" alt="status">

See [roadmap](./ROADMAP.md) for more details.

## [arwes.dev](https://arwes.dev) website is outdated and where is the source code?

Currently, the website shows the documentation for **Arwes v1.0.0-alpha.5** with
source code for the project and the website from this repository at branch **[`version1-breakpoint1`](https://github.com/arwes/arwes/tree/version1-breakpoint1)**.

The branch `master` is at current development with major breaking changes.

## Can I use it in React Native and other environments?

Arwes version 1.x is intended to support only web environments with latest
technologies.

Though the project may offer support for other environments in major future
versions.

You can use tools to embed the web apps into other environments such as
mobile with [Apache Cordova](https://cordova.apache.org) or [Electron](https://electronjs.org)
in desktop, or simply make it a [PWA](https://developers.google.com/web/progressive-web-apps).

## What about Arwes for AR/VR?

Since we can build AR/VR apps for the web, Arwes can be used for such projects.
But for Arwes version 1.0, there is no plan to build/test specific tools for
that.

Once the project is stable, we can start defining how Arwes can be implemented
for AR/VR.

## What browsers are supported?

Latest version of Chrome, Firefox and Safari for Android, iOS and desktop.

## Does Arwes only work with [React](https://reactjs.org)?

Since [React](https://reactjs.org) is a library with component logic written
in JavaScript, we could easily use React components with other frameworks or
vanilla JavaScript. Though it may be more complicated to setup and work with.

## Why Arwes uses [JSS](https://cssinjs.org) as a styling solution?

[JSS](https://cssinjs.org) is an excellent _CSS in JavaScript_ implementation
with pretty robust benefits for scalable component tools in JavaScript.

Read more:

- [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660).
- [CSS in JavaScript with JSS and React](https://medium.com/jobsity/css-in-javascript-with-jss-and-react-54cdd2720222).
- Check how [material-ui](https://material-ui.com) (the world's most popular UI React framework) uses JSS for its [customization](https://material-ui.com/customization/css-in-js) strategy.

## What about SSR or the [JAMstack](https://jamstack.org)?

Arwes is built in tools that can be easily setup for server-side rendering (SSR)
or used as static generated markup/JavaScript sites as the [JAMstack](https://jamstack.org),
so definitely you can use Arwes with [Gatsby](http://gatsbyjs.org) or [Next](https://nextjs.org).

But Arwes requires a few more setup steps to make it work for such requirements
due to its design, sound and animation systems.

There is a plan to document complete examples.

## Can I build SEO-friendly sites with Arwes?

Arwes is a framework with rich sound and animations effects so there are a few
extra considerations to take for SEO sites/apps. But definitely, the sites built
with Arwes can be SEO-friendly.

There is a plan to document these.

## Is there a plan to build specific tools?

There are plans to add _grid layout_, _graph_, and _map_ tools with Arwes
customization but not for version 1.0.
