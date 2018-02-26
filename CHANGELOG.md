# CHANGELOG

## v1.0.0-alpha.5 / 2018-02-26

- [update] simplify Button component props
- [feat] add content components: Content, Heading, Paragraph, Link, List, Blockquote

### Breaking Changes

Now the `Content` component will give styles to children static elements:

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `ul`, `ol`, `dl`
- `blockquote`
- `p`
- `a`

And the `Arwes` component will not set those styles.

## v1.0.0-alpha.4 / 2018-02-02

- [update] package export utils
- [fix] components align styles
- [update] add Frame property to disable border

## v1.0.0-alpha.3 / 2018-01-22

- [fix] components props and styles
- [fix] Arwes puff props
- [fix] Image component error handle
- [feat] add Grid support to remove gutter
- [feat] add Appear component
- [feat] add Table component

## v1.0.0-alpha.2 / 2017-12-21

- [fix] components styles and tags
- [fix] reference to withStyles
- [fix] server side execution
- [update] responsive tool only calls callback on breakpoint change
- [update] rename theme grid to columns
- [update] add animation prop to components

## v1.0.0-alpha.1 / 2017-12-09

- [feat] Initial release
