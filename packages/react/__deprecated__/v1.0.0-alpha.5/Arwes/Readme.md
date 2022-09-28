Arwes application container. This component should wrap the application components.
It can have a background image and a pattern image between the background and the
content. It uses `<Puffs />` component to display an animation between the children
and the background.

```javascript
<Arwes
    animate
    pattern='/static/images/glow.png'
    background={{
        small: '/static/images/small.jpg',
        medium: '/static/images/medium.jpg',
        large: '/static/images/large.jpg',
        xlarge: '/static/images/xlarge.jpg'
    }}
>
    <p>Application elements</p>
</Arwes>
```

The component is fixed positioned in the page so there should be only one.

The component also apply default styles to common HTML tags so it prevents
global styles pollution.
