Arwes application container. This component should wrap the application components.
It can have a background image and a pattern image between the background and the
content. It uses `Puffs` component to display an animation between the children
and the background.

```js
<div style={{ position: 'relative', height: 300 }}>
    <Arwes animate style={{ position: 'absolute' }}>
        <p>Application elements</p>
    </Arwes>
</div>
```

The component is fixed positioned in the page so there should be only one.
