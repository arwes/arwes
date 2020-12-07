The React context provider can setup non-specific animation settings to all
descendant nodes.

The available props are: `animate` and `duration`.

The descendant nodes will extend those props if available.

The providers can be stacked and their props will be extended.

Example:

```js
<AnimationProvider animate duration={{ enter: 200 }}>
  <App />
</AnimationProvider>
```
