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
    code: require('!raw-loader?esModule=false!@types/react/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/react/global.d.ts',
    code: require('!raw-loader?esModule=false!@types/react/global.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/scheduler/tracing.d.ts',
    code: require('!raw-loader?esModule=false!@types/scheduler/tracing.d.ts')
  },
  {
    filename: 'file:///node_modules/@types/react-dom/index.d.ts',
    code: require('!raw-loader?esModule=false!@types/react-dom/index.d.ts')
  },

  // @emotion/react
  {
    filename: 'file:///node_modules/@emotion/react/index.d.ts',
    code: require('!raw-loader?esModule=false!@emotion/react/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/jsx-namespace.d.ts',
    code: require('!raw-loader?esModule=false!@emotion/react/types/jsx-namespace.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/theming.d.ts',
    code: require('!raw-loader?esModule=false!@emotion/react/types/theming.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/react/helper.d.ts',
    code: require('!raw-loader?esModule=false!@emotion/react/types/helper.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/serialize/index.d.ts',
    code: require('!raw-loader?esModule=false!@emotion/serialize/types/index.d.ts')
  },
  {
    filename: 'file:///node_modules/@emotion/utils/index.d.ts',
    code: require('!raw-loader?esModule=false!@emotion/utils/types/index.d.ts')
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
        }

        const animate: (
          element: HTMLElement | HTMLElement[],
          props: Record<string, any>,
          options: MotionOptions
        ) => void;

        export { animate };
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
    filename: 'file:///node_modules/@arwes/styles/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/styles/build/types/index.d.ts')
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
    filename: 'file:///node_modules/@arwes/bgs/index.d.ts',
    code: require('!raw-loader?esModule=false!@arwes/bgs/build/types/index.d.ts')
  }
];
