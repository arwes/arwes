# Arwes Guidelines

Arwes Design, Animation, and Effects Guidelines. It's a living guide. These are
the core concepts and ideas behind the project Arwes.

-------

## Inspiration

Main sources of inspiration come from these awesome projects:

- [Star Citizen](http://robertsspaceindustries.com) ([Starmap](https://robertsspaceindustries.com/starmap))
- [Futuristic HUD UI Pack](https://videohive.net/item/hud-ui-pack-700/19326628)
- [Orbit SciFi UI Kit](https://creativemarket.com/dannehr/163951-Orbit-SciFi-UI-Kit)
- [Hi-Tech Interface Builder Pack](https://www.behance.net/gallery/19051971/Hi-Tech-Interface-Builder-Pack)
- [SciFi HUD Pack](https://videohive.net/item/hud/14206389)
- [TRON: Legacy](http://www.imdb.com/title/tt1104001)
- [Boom Sci-Fi Designed](https://soundcloud.com/boom-library/sci-fi-designed)

Some other multimedia projects compilations:

- [Futuristic Sci-Fi Designs Board](https://co.pinterest.com/romelperez07/futuristic-sci-fi-design)
- [Futuristic Sci-Fi Designs Playlist](https://www.youtube.com/playlist?list=PLAIjpj9Un1BDevmUZSDrLIYxF3Cl5LspY)
- [Best Futuristic Websites](https://www.webdesign-inspiration.com/web-designs/style/futuristic)
- [Sci-Fi Ambient Music Playlist](https://www.youtube.com/playlist?list=PLmGEbmwqAA4IYqCuH3bHzTVVtdpG6N4IJ)
- [Halo Games](https://www.halowaypoint.com/en-us/games/halo-2)
- [Cyberpunk 2077](https://www.cyberpunk.net)
- [TRON: Legacy](http://www.imdb.com/title/tt1104001/)
- [Ghost in the Shell](http://www.imdb.com/title/tt1219827/)

-------

## Purpose

Arwes is an intent to materialize futuristic science fiction concepts in a toolset
to let you create interfaces that inspire advanced technology, especially spatial,
influenced by alien conceptions.

Connected, augmented, and energized are the feelings sought in the experiences
provided with projects built with Arwes. So the interfaces are intensive and rich.

But building modular, configurable, heavy animated and interconnected interface
components for web applications from both design and functional perspectives
it's not easy. Since there are plenty of ideas where to get inspiration from, the
concepts used here are opinionated and focus on certain aspects to experience.

These are the main fundamental ideas behind this project.

### Advanced Alien Technology

The elements should looks like they were made with advanced technology based on
many fundamentally new scientific theories and created by developed alien
civilizations or human societies millennia away in the future.

But written and spoken language with letters and numbers is still used to communicate.
And mechanical interactions are still needed to manipulate the controls.

The design could be used in displays, virtual reality, augmented reality, and
even holograms, and it should give the impression user is controlling futuristic
sophisticated devices.

### Clean and Sleek

It doesn't have to be cryptic to feel advanced. Elements should be shown clearly
enough to express the ideas without getting lost in visual effects.

Sizes and spacing should be well used to convey the messages. Controls and structural
elements should not be too big to mean importance. Content should be legible and
not convoluted or obfuscated.

The interfaces should look polished and sophisticated.

### Functional

The elements in the experience should exist for a purpose, not just for display.
But they can be elaborated. These elements should express they have a function.

All components in an experience, should feel they are interconnected as a whole,
so it is not just functional but intelligent. Actions in one place, can echo in
other places or even broadcast it to the whole system.

### Energetic and Vibrant

All components should connect with the user visually and aurally. By navigating,
things don't just appear or disappear. They should feel being assembled, evolved
and decomposed. Using them should be an experience as an explorer and also as a
creator.

Elements glowing should inspire energy and animation should activate it. User
should feel connected with the system.

-------

## Design System

Arwes is a _framework_ to create UIs. Ideally most settings should be configurable.
So many of these guidelines should be flexible enough to adapt to the implementation
desired.

### Colors

Futuristic designs tend to be dark. Arwes is not an exception, it is specially
designed for dark backgrounds and light elements. But it could be configured
any way it is required.

#### Color Palette

TODO

#### Color Usage

TODO

### Fonts

The typographies tend to be rectangular and maybe oblique with techno influence.

Text as any other content, should have the ability to "glow". The effect is
achieved with `text-shadow` and it is defined according to the type of content
and user interactions.

Arwes defines three main typographies. Headings, content, and code. You can
configure all of them along with their scales.

The project uses [Titillium Web](https://fonts.google.com/specimen/Titillium+Web)
and [Electrolize](https://fonts.google.com/specimen/Electrolize).

### Spaces

TODO

### Shapes

TODO

### Icons

TODO

### Illustrations

TODO

-------

## Animation and Sound System

Any element in the system can use animations for many purposes, as individual
or sub-systems of elements.

Sounds can be played when the animations run.

When multiple elements play the same sound at the same time, the sound is played
only once. If the sound is being played and it is tried to be played again,
it restarts.

### Transitions

When an element transitions in the system, it should be built. It should
feel as being created part by part. A simple line will start as a point and
get its final length over a short period of time. Opacity can be used from 0 to 1
while animating but should last very short in the beginning of the animation.

When an element transitions out the system, it should be disassembled. It should
feel as being unmounted part by part. A simple line will shrink until it is a point
in a short period of time. Opacity can be used from 1 to 0 while animating but
should last very short at the end of the animation.

Elements transitioning in and out can have a sound effect lasting the time the
animations takes.

When a system transitions in, elements should transition in by their order of
deepness: First backgrounds, then structural frames, then containers, and finally
content. All elements in the same depth start transitioning in at the same time
and should take the same duration. A typical system can take up to 5 levels of
deepness.

When a system transitions out, all elements regardless of their level of depth,
should start transitioning out at the same time and should take the same duration.

### Persisting

In a system, once it is created and shown, it can run randomly subtle passive
animations on its elements every dozen seconds with very optional sounds.

Lines in a rectangular container can glow momentary once in a while in a system.
A background can be animated the whole time with subtle changes and low dim music
can be played in the duration of the system.

But these animations shouldn't be intrusive. User shouldn't be distracted from its
content.

### Interactions

When user interacts with elements in the system, these can take effects on themselves
like a toggle (changing from on to off and viceversa), or affecting a sub-system
like expanding information on hover, or transitioning to another system.

For subtle interactions, like hovering an element or typing a key, subtle animations
and sounds can be played. These shouldn't bring too much attention.

For decisive interactions, like selecting an option or typing enter, more concise
animations and sounds can be played. These should bring attention.

-------

## Patterns and Components

TODO

### Backgrounds

TODO

### Line

TODO

### Frame

TODO

### Words

TODO

### Lists

TODO

### Tables

TODO
