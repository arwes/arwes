# Roadmap

An ideal Arwes project _beta_ release would be for **2020 Q2**.

- The order in the lists does not represent priority.
- Active items are represented with **bold**.
- Tasks are listed in the [project boards](https://github.com/arwes/arwes/projects).

----

## 2014 - 2018

From 2014 to 2018 the project was released in alpha versions where the main
ideas have been tested out in projects. Though many features were limited, have
little support / extensibility, or buggy. The plan was to gather enough insight
to decide and build the foundation of the framework.

----

## 2019

### Q1

- [x] Define and implement a new project architecture to improve organization,
simplify tooling, and facilitate developers contributions.
- [x] Complete started animation and sounds guidelines. These guidelines will
establish the ground concepts for the framework to work.
- [x] Research and playground new ideas and concepts to implement in the project
with the [soulextract.com](https://github.com/soulextract/soulextract.com) side
project. The results are going to be used in Arwes.

### Q2

- Animation System.
    - [x] Create an animation specification to define the animation system architecture.
    - [x] Document React components APIs to create animation systems.
- Sounds System.
    - [x] Create a sounds specification to define the sound system architecture.
    - [x] Develop the `@arwes/sounds` package with the sounds system APIs.
    - [x] Document React components APIs to create sounds systems.

### Q3

- [ ] **Complete started purpose guideline document. This will clarify what
the vision of the project is.**
- [ ] Update contribution guidelines to allow developers to know what are the
technical guidelines, architectures, workflow tasks, and communication and
management details, in the project, to contribute in it.
- Animation System.
    - [x] Update animation system architecture specification with complex
    animation flow scenearios.
    - [ ] Research SEO and SSR strategies to standardize recommended animation
    setups and settings.
    - [ ] **Develop the `@arwes/animation` package with the animation system APIs.**

### Q4

- Sounds System.
    - [ ] Research browser sound API supports and compatibility to standardize
    recommended sound setups and settings.
- Design System.
    - [ ] Create a design specification to define the design tools architecture.
    - [ ] Create a design system for Arwes UI components.
    - [ ] Create a user experience specification for Arwes applications.
    - [ ] Develop the `@arwes/design` package with the design system APIs.
- General Tools.
    - [ ] Define general purpose tools and browser API tools to modularize. It will
    include tools for asset loading, viewport dimension, user-browser activity,
    and any other general need.
    - [ ] Develop the `@arwes/platform` package with the general tools APIs.

----

## 2020

### Q1

- Arwes core components.
    - [ ] Define the core UI components to modularize, independent of the design
    system variation used with the Arwes UI components.
    - [ ] Develop the `@arwes/core` package with the core UI components.
- Arwes UI components.
    - [ ] Define the UI components to implement the specified Arwes design system.
        - [ ] Define the Static/Content UI components.
        - [ ] Define the Frame/Container/Structure UI components.
        - [ ] Define the Shape/Icon UI components.
        - [ ] Define the Control/Form UI components.
        - [ ] Define the Navigation UI components.
    - [ ] Develop the `@arwes/arwes` package with the UI components.

### Q2

- [ ] Arwes UI components integration testing.
- [ ] Create user guides documents where to specify how to use the framework.
- [ ] Develop the website _arwes.dev_ for Arwes v1.0 to document the project
vision, guidelines, documentation, APIs, and UI component playground.
