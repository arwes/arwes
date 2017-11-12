This component should wrap the application components. It can have a background
image and a pattern image between the background and the content. It also can
display random blurred elements in the background as animation.

    <div style={{ position: 'relative', height: 300 }}>
        <Arwes animated style={{ position: 'absolute' }}>
            <p>Application elements</p>
        </Arwes>
    </div>

The component is fixed positioned in the page so there should be only one.
