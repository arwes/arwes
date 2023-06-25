import { type AppTheme as Theme, createAppTheme } from '@arwes/react';

const theme = createAppTheme({
  settings: {
    hues: {
      primary: 180,
      secondary: 60
    },
    fontFamilies: {
      title: '"Titillium Web","Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
      body: '"Titillium Web","Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
      cta: '"Titillium Web","Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
      input: '"Titillium Web","Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
      code: 'JetBrains Mono,Menlo,Monaco,Consolas,Courier New,monospace'
    }
  }
});

export type { Theme };
export { theme };
