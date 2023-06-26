# Frequently Asked Questions

## When will Arwes be ready for production?

Arwes is currently in [alpha release](https://stackoverflow.com/questions/40067469).
It means there is ongoing development with breaking changes. APIs and guidelines
can change as they get completed.

The project will be ready for production when it has a stable and tested API.

Check out [Project Task Boards](https://github.com/arwes/arwes/projects).

## What is the development status?

You can check the [next.arwes.dev](https://next.arwes.dev) website and its playground
to check out functionalities and components sandboxes.

## Can I use it in React Native and other environments?

Arwes version 1.x is intended to support only web environments with latest
technologies.

The project may offer support for other environments in future versions.

You can use tools to embed the web apps into other environments such as
mobile with [Apache Cordova](https://cordova.apache.org) or [Electron](https://electronjs.org)
in desktop, or simply make it a [PWA](https://developers.google.com/web/progressive-web-apps).

## What about Arwes for AR/VR?

Since we can build AR/VR apps for the web now, Arwes can be used for such projects.
But for Arwes version 1.0, there is no plan to build/test specific tools for
that.

Once the project is stable, we can start defining how Arwes can be implemented
for AR/VR.

## What browsers are supported?

Latest version of Chromium, Firefox, and Safari, for Android, iOS, and desktop.

## Does Arwes only work with specific UI libraries such as [React](https://reactjs.org)?

There are functional packages which are agnostic to the UI library used. These have
more low level APIs which are intended to be used with the implementation packages
which are UI library specific.

For example, `@arwes/animator` is the main animator functionalities without external
dependencies which could be used with any UI library, and `@arwes/react-animator`
is its implementation in React.

## What about SSR/SSG?

Arwes is built in tools that can be easily setup for server-side rendering (SSR)
or used as static generated markup/JavaScript sites as the [JAMstack](https://jamstack.org),
so definitely you can use Arwes with frameworks such as [Next](https://nextjs.org),
[Gatsby](http://gatsbyjs.org), or [Remix](https://remix.run).

But Arwes requires a few more setup steps to make it work for such requirements
due to its design, sound, and animation systems. It is recommended to use simple
SPA (single page apps) since they are simpler to setup.

## Can I build SEO-friendly sites with Arwes?

Arwes is a framework with rich sound and animations effects so there are a few
extra considerations to take for SEO sites/apps. But definitely, the sites built
with Arwes can be SEO-friendly.

## Why does Arwes use CSSinJS for some UI components?

Since UI elements are more dynamic and rich, a more complex theming is required.
Building static CSS for such components can become more arduous, so a CSSinJS styling
solution can simplify this aspect, though it is not required.

See [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660).

Some UI components require to setup theming directly in JavaScript due to their APIs,
so there is no way to use simple CSS for styling.

## What about using declarative HTML animation tools?

The main animation functionalities reside in the `@arwes/animator` package.
It is agnostic from the HTML animation tool. But the recommended tool
to be used with the animations implementations is [motion.dev](https://motion.dev).

There are no specific APIs for declarative tools like [react-spring](https://www.react-spring.io)
or [Framer Motion](https://www.framer.com/motion).

Since the animation API is still in early testing, more production experience
will be needed to properly create stable and versatile abstractions for creating
and composing component animations with imperative and declarative methodologies.
