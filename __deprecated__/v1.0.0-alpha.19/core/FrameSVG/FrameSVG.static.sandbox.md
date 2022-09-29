```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <Animator animator={{ animate: false }}>
        <FrameSVG
          hover
          shapes={[
            [
              [10, 10],
              [10, '100% - 10'],
              ['100% - 10', '100% - 10'],
              ['100% - 10', 10]
            ]
          ]}
          polylines={[
            [
              [0, 0],
              ['100%', 0]
            ],
            [
              ['100%', '100%'],
              [0, '100%']
            ]
          ]}
        >
          <div style={{ width: 200, height: 200 }} />
        </FrameSVG>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
