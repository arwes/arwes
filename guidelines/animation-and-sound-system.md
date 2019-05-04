# Animation and Sound System

Any element in the system can use animations for many purposes, as individual elements
or sub-systems of elements.

Sounds can be played when animations run.

When multiple elements play the same sound at the same time, the sound is played
only once. If a sound is playing and another element tries to play it again,
the sound restarts.

## Transitions

When an element transitions in the system, it should be built. It should
feel as being created part by part. A simple line will start as a point and
get its final length over a short period of time. Opacity can be used from 0 to 1
while animating but should last very short in the beginning of the animation.

When an element transitions out of the system, it should be disassembled. It should
feel as if it is being unmounted part by part. A simple line will shrink until it is a point
in a short period of time. Opacity can be used from 1 to 0 while animating, but
should last very short at the end of the animation.

Elements transitioning in and out can have a sound effect lasting the time the
animations take.

When a system transitions in, elements should transition in by their order of
depth: First backgrounds, then structural frames, then containers, and finally
content. All elements in the same depth start transitioning in at the same time
and should take the same duration. A typical system can take up to 5 levels of
depth.

When a system transitions out, all elements regardless of their level of depth,
should start transitioning out at the same time and should take the same duration.

## Persistency

In a system, once it is created and shown, it can run randomly subtle passive
animations on its elements every dozen seconds with very optional sounds.

Lines in a rectangular container can glow momentary once in a while in a system.
A background can be animated the whole time with subtle changes and low dim music
can be played in the duration of the system.

But these animations shouldn't be intrusive. User shouldn't be distracted from primary
content.

## Interactions

When a user interacts with elements in the system, the elements can affect themselves,
such as a toggle (changing from on to off and vice-versa), or they can affect a sub-system,
such as expanding information on hover or transitioning to another system.

For subtle interactions, like hovering an element or typing a key, subtle animations
and sounds can be played. These shouldn't bring too much attention.

For decisive interactions, like selecting an option or typing enter, more concise
animations and sounds can be played. These should bring attention.
