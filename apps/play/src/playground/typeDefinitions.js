/* eslint-disable import/no-webpack-loader-syntax */

export const typeDefinitions = [
  // react and react-dom
  {
    filename: 'file:///node_modules/csstype/index.d.ts',
    code: require('!raw-loader?esModule=false!csstype/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/prop-types/index.d.ts',
    code: require('!raw-loader?esModule=false!@types/prop-types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/react/index.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@types/react/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/react/global.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@types/react/global.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/scheduler/tracing.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@types/scheduler/tracing.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/react-dom/index.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@types/react-dom/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/react-dom/client.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@types/react-dom/client.d.ts')
  },

  // @emotion/react
  {
    filename: 'file:///node_modules/@emotion/react/index.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/css-prop.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/css-prop.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/helper.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/helper.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/jsx-dev-runtime.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/jsx-dev-runtime.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/jsx-namespace.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/jsx-namespace.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/jsx-runtime.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/jsx-runtime.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/theming.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/react/types/theming.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/serialize/index.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/serialize/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/utils/index.d.ts',
    code: require('!raw-loader?esModule=false!../../../../node_modules/@emotion/utils/types/index.d.ts')
  },

  // motion
  {
    filename: 'file:///node_modules/motion/index.d.ts',
    code: `
      declare module 'motion' {
        interface MotionOptions {
          repeat?: number
          direction?: string
          duration?: number
          easing?: string
        }

        interface AnimationControls {
          cancel: () => void
          finished: Promise<void>
        }

        declare function AnimateFunction (
          element: SVGElement | SVGElement[] | HTMLElement | HTMLElement[],
          props: Record<string, any>,
          options: MotionOptions
        ): AnimationControls;

        declare function AnimateFunction (
          (progress: number) => void,
          options: MotionOptions
        ): AnimationControls;

        declare function Stagger (
          duration: number,
          options?: { start: any, from: any, easing: any }
        ): any;

        const animate: AnimateFunction;
        const stagger: Stagger;

        export { AnimationControls, animate, stagger };
      }
    `
  },

  // empanada
  {
    filename: 'file:///node_modules/empanada/index.d.ts',
    code: `
      declare module 'empanada' {
        export const LOREM_IPSUM = string;
        export const createRandomEmail: () => string;
        export const createRandomWords: (length?: number) => string;
      }
    `
  },

  // arwes
  {
    filename: 'file:///node_modules/@arwes/tools/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/tools/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/theme/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/theme/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/animator/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/animator/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/animated/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/animated/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/bleeps/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/bleeps/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/text/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/text/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/frames/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/frames/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/bgs/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/bgs/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/core/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/core/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/arwes/index.d.ts',
    code: require('!raw-loader?esModule=false!arwes/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-styles/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-styles/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-animator/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-animator/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-animated/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-animated/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-bleeps/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-bleeps/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-text/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-text/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-frames/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-frames/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-bgs/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-bgs/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react-core/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react-core/build/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@arwes/react/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/react/build/types/index.d.ts')
  }
];
