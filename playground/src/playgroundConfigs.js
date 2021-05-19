const playgroundConfigs = [
  {
    name: 'design',
    components: [
      {
        name: 'createTheme',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/design/src/createTheme/createTheme.basic.sandbox.md').default },
          { name: 'breakpoints', code: require('repository/packages/design/src/createTheme/createTheme.breakpoints.sandbox.md').default },
          { name: 'palette', code: require('repository/packages/design/src/createTheme/createTheme.palette.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/design/src/createTheme/createTheme.dynamic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'animator',
    components: [
      {
        name: 'withAnimator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animator/src/withAnimator/withAnimator.basic.sandbox.md').default },
          { name: 'nesting', code: require('repository/packages/animator/src/withAnimator/withAnimator.nesting.sandbox.md').default },
          { name: 'staggering', code: require('repository/packages/animator/src/withAnimator/withAnimator.staggering.sandbox.md').default },
          { name: 'sequence', code: require('repository/packages/animator/src/withAnimator/withAnimator.sequence.sandbox.md').default },
          { name: 'custom-manager', code: require('repository/packages/animator/src/withAnimator/withAnimator.custom-manager.sandbox.md').default }
        ]
      },
      {
        name: 'Animator',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animator/src/Animator/Animator.basic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'animated',
    components: [
      {
        name: 'Animated',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/animated/src/Animated/Animated.basic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'bleeps',
    components: [
      {
        name: 'BleepsProvider',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/bleeps/src/BleepsProvider/BleepsProvider.basic.sandbox.md').default },
          { name: 'categories', code: require('repository/packages/bleeps/src/BleepsProvider/BleepsProvider.categories.sandbox.md').default },
          { name: 'loops', code: require('repository/packages/bleeps/src/BleepsProvider/BleepsProvider.loops.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/bleeps/src/BleepsProvider/BleepsProvider.dynamic.sandbox.md').default }
        ]
      }
    ]
  },
  {
    name: 'core',
    components: [
      {
        name: 'StylesBaseline',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/StylesBaseline/StylesBaseline.basic.sandbox.md').default }
        ]
      },
      {
        name: 'Text',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Text/Text.basic.sandbox.md').default },
          { name: 'multiple', code: require('repository/packages/core/src/Text/Text.multiple.sandbox.md').default },
          { name: 'dynamic', code: require('repository/packages/core/src/Text/Text.dynamic.sandbox.md').default },
          { name: 'intercepting', code: require('repository/packages/core/src/Text/Text.intercepting.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Text/Text.static.sandbox.md').default }
        ]
      },
      {
        name: 'List',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/List/List.basic.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/List/List.static.sandbox.md').default }
        ]
      },
      {
        name: 'Blockquote',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Blockquote/Blockquote.basic.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Blockquote/Blockquote.static.sandbox.md').default }
        ]
      },
      {
        name: 'Table',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Table/Table.basic.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Table/Table.static.sandbox.md').default }
        ]
      },
      {
        name: 'CodeBlock',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/CodeBlock/CodeBlock.basic.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/CodeBlock/CodeBlock.static.sandbox.md').default }
        ]
      },
      {
        name: 'LoadingBars',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/LoadingBars/LoadingBars.basic.sandbox.md').default },
          { name: 'determinate', code: require('repository/packages/core/src/LoadingBars/LoadingBars.determinate.sandbox.md').default },
          { name: 'full', code: require('repository/packages/core/src/LoadingBars/LoadingBars.full.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/LoadingBars/LoadingBars.static.sandbox.md').default }
        ]
      },
      {
        name: 'Figure',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Figure/Figure.basic.sandbox.md').default },
          { name: 'fluid', code: require('repository/packages/core/src/Figure/Figure.fluid.sandbox.md').default },
          { name: 'responsive', code: require('repository/packages/core/src/Figure/Figure.responsive.sandbox.md').default },
          { name: 'preload', code: require('repository/packages/core/src/Figure/Figure.preload.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Figure/Figure.static.sandbox.md').default }
        ]
      },
      {
        name: 'Button',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Button/Button.basic.sandbox.md').default },
          { name: 'palette', code: require('repository/packages/core/src/Button/Button.palette.sandbox.md').default },
          { name: 'active', code: require('repository/packages/core/src/Button/Button.active.sandbox.md').default },
          { name: 'frames', code: require('repository/packages/core/src/Button/Button.frames.sandbox.md').default },
          { name: 'disabled', code: require('repository/packages/core/src/Button/Button.disabled.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Button/Button.static.sandbox.md').default }
        ]
      },
      {
        name: 'Card',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/Card/Card.basic.sandbox.md').default },
          { name: 'landscape', code: require('repository/packages/core/src/Card/Card.landscape.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/Card/Card.static.sandbox.md').default }
        ]
      },
      {
        name: 'FrameBox',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FrameBox/FrameBox.basic.sandbox.md').default },
          { name: 'lines', code: require('repository/packages/core/src/FrameBox/FrameBox.lines.sandbox.md').default },
          { name: 'origins', code: require('repository/packages/core/src/FrameBox/FrameBox.origins.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FrameBox/FrameBox.static.sandbox.md').default }
        ]
      },
      {
        name: 'FrameCorners',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FrameCorners/FrameCorners.basic.sandbox.md').default },
          { name: 'content-lines', code: require('repository/packages/core/src/FrameCorners/FrameCorners.content-lines.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FrameCorners/FrameCorners.static.sandbox.md').default }
        ]
      },
      {
        name: 'FramePentagon',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FramePentagon/FramePentagon.basic.sandbox.md').default },
          { name: 'inverted', code: require('repository/packages/core/src/FramePentagon/FramePentagon.inverted.sandbox.md').default },
          { name: 'square', code: require('repository/packages/core/src/FramePentagon/FramePentagon.square.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FramePentagon/FramePentagon.static.sandbox.md').default }
        ]
      },
      {
        name: 'FrameHexagon',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FrameHexagon/FrameHexagon.basic.sandbox.md').default },
          { name: 'inverted', code: require('repository/packages/core/src/FrameHexagon/FrameHexagon.inverted.sandbox.md').default },
          { name: 'square', code: require('repository/packages/core/src/FrameHexagon/FrameHexagon.square.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FrameHexagon/FrameHexagon.static.sandbox.md').default }
        ]
      },
      {
        name: 'FrameUnderline',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FrameUnderline/FrameUnderline.basic.sandbox.md').default },
          { name: 'square', code: require('repository/packages/core/src/FrameUnderline/FrameUnderline.square.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FrameUnderline/FrameUnderline.static.sandbox.md').default }
        ]
      },
      {
        name: 'FrameLines',
        sandboxes: [
          { name: 'basic', code: require('repository/packages/core/src/FrameLines/FrameLines.basic.sandbox.md').default },
          { name: 'widths', code: require('repository/packages/core/src/FrameLines/FrameLines.widths.sandbox.md').default },
          { name: 'static', code: require('repository/packages/core/src/FrameLines/FrameLines.static.sandbox.md').default }
        ]
      }
    ]
  }
];

export { playgroundConfigs };
