Arwes application container. This component should wrap the application components.
It can have a background image and a pattern image between the background and the
content. It uses `<Puffs />` component to display an animation between the children
and the background.

```javascript
<Arwes
    animate
    pattern='/static/img/glow.png'
    background={{
        small: '/static/img/small.jpg',
        medium: '/static/img/medium.jpg',
        large: '/static/img/large.jpg',
        xlarge: '/static/img/xlarge.jpg'
    }}
>
    <p>Application elements</p>
</Arwes>
```

The component is fixed positioned in the page so there should be only one.

The component also apply default styles to common HTML tags so it prevents
global styles pollution.
