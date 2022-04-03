```ts
declare module 'motion' {
  interface MotionOptions {
    repeat?: number
    direction?: string
    duration?: number
  }

  const animate: (
    element: HTMLElement | HTMLElement[],
    props: Record<string, any>,
    options: MotionOptions
  ) => void;

  export { animate };
}
```
