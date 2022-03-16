import { useMemo, useRef, useEffect, useState } from 'react';

import type { PartialDeep } from '@arwes/tools';
import type {
  ThemeExtensionColorScheme,
  ThemeCreatorStructure,
  ThemeSettingsExtend,
  ThemeExtend,
  ThemeCreatorOptions
} from '../types';
import { createCreateTheme } from '../createCreateTheme';

const themeOptionsDefault: ThemeCreatorOptions = {
  getCacheColorScheme: (): string | undefined | null => {
    return window.localStorage.getItem('theme-color-scheme');
  },
  setCacheColorScheme: (colorScheme: string): void => {
    window.localStorage.setItem('theme-color-scheme', colorScheme);
  }
};

const createUseCreateThemeExtended = <ThemeSettings, Theme>(
  themeStructure: ThemeCreatorStructure,
  themeSettingsDefaults: ThemeSettings,
  themeOptions: ThemeCreatorOptions = themeOptionsDefault
) => {
  type ThemeSettingsPartial = PartialDeep<ThemeSettings>;
  type ThemeSettingsExtended = ThemeSettingsExtend<ThemeSettings>;
  type ThemeExtended = ThemeExtend<Theme>;

  interface MediaListener {
    media: string
    mediaQueryList: MediaQueryList
    settings: ThemeSettingsPartial
    getIsActive: () => boolean
    onChange: () => void
  }
  type MediasListeners = MediaListener[];

  type CountUpdateFunction = () => void;

  interface ThemeColorScheme {
    scheme: ThemeExtensionColorScheme['colorScheme']
    control: ThemeExtensionColorScheme['colorSchemeControl']
  }

  const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeSettingsDefaults);

  const isBrowser = typeof window !== 'undefined' && !!window.matchMedia;
  const themeColorSchemeDefaults: ThemeColorScheme = {
    control: 'system',
    scheme: 'dark'
  };

  const createMediaThemeColorSchemeLight = (): MediaQueryList =>
    window.matchMedia('(prefers-color-scheme: light)');

  // TODO: Could there be a default theme color scheme when it is not provided
  // by the system?
  const getSystemThemeColorScheme = (): ThemeExtensionColorScheme['colorScheme'] =>
    createMediaThemeColorSchemeLight().matches ? 'light' : 'dark';

  const useCreateTheme = (
    getThemeSettingsExtended: () => ThemeSettingsExtended,
    dependencies: any[]
  ): ThemeExtended => {
    const themeSettingsExtendedRef = useRef<ThemeSettingsExtended>(null as any);
    const mediasListenersRef = useRef<MediasListeners>([]);
    const themeColorSchemeRef = useRef<ThemeColorScheme>(themeColorSchemeDefaults);

    // In SSR, media queries can not be checked, so it creates the theme with the
    // common settings. Once it is rehydrated in the browser, the media queries
    // are checked and it will trigger another render.
    const [countUpdate, setCountUpdate] = useState(0);
    const updateRef = useRef<CountUpdateFunction>(() => {});

    updateRef.current = () => setCountUpdate(count => count + 1);

    //

    const setupCurrentThemeColorScheme = (): void => {
      if (!isBrowser) {
        return;
      }

      const storedThemeColorScheme = themeOptions.getCacheColorScheme();

      if (storedThemeColorScheme) {
        themeColorSchemeRef.current = {
          control: 'user',
          scheme: storedThemeColorScheme === 'light' ? 'light' : 'dark'
        };
      }
      else {
        const mediaQueryThemeColorSchemeLight = createMediaThemeColorSchemeLight();
        themeColorSchemeRef.current = {
          control: 'system',
          scheme: mediaQueryThemeColorSchemeLight.matches ? 'light' : 'dark'
        };
      }
    };

    const configureCurrentThemeColorScheme = (): void => {
      const scheme = themeColorSchemeRef.current.control === 'user' ? themeColorSchemeRef.current.scheme : '';
      themeOptions.setCacheColorScheme(scheme);
    };

    const setupMediasListeners = (): void => {
      if (!isBrowser) {
        return;
      }

      const medias = themeSettingsExtendedRef.current.medias || {};
      const mediasList: Array<{ media: string, settings: ThemeSettingsPartial | undefined }> = Object
        .keys(medias)
        .map(media => ({ media, settings: medias[media] }));

      const newMediaListeners: MediasListeners = mediasList
        .filter(mediaItem => !!mediaItem.settings)
        .map(mediaItem => {
          const { media } = mediaItem;
          const settings = mediaItem.settings as ThemeSettingsPartial;
          const mediaQueryList = window.matchMedia(mediaItem.media);
          const onChange = () => updateRef.current();
          const getIsActive = () => mediaQueryList.matches;

          mediaQueryList.addEventListener('change', onChange);

          return { media, settings, mediaQueryList, onChange, getIsActive };
        });

      const newColorSchemeMediaListeners: MediasListeners = [
        { scheme: 'light', settings: themeSettingsExtendedRef.current.colorSchemes?.light },
        { scheme: 'dark', settings: themeSettingsExtendedRef.current.colorSchemes?.dark }
      ]
        .filter(item => !!item.settings)
        .map(item => {
          const media = `(prefers-color-scheme: ${item.scheme})`;
          const settings = item.settings as ThemeSettingsPartial;
          const mediaQueryList = window.matchMedia(media);
          const onChange = () => {
            setupCurrentThemeColorScheme();
            updateRef.current();
          };
          const getIsActive = () => {
            if (themeColorSchemeRef.current.control === 'system') {
              return mediaQueryList.matches;
            }
            return themeColorSchemeRef.current.scheme === item.scheme;
          };

          mediaQueryList.addEventListener('change', onChange);

          return { media, settings, mediaQueryList, onChange, getIsActive };
        });

      mediasListenersRef.current = [...newMediaListeners, ...newColorSchemeMediaListeners];

      updateRef.current();
    };

    const cleanMediasListeners = (): void => {
      const mediasListeners = mediasListenersRef.current;

      if (mediasListeners.length) {
        mediasListeners.forEach(mediaListener => {
          const { mediaQueryList, onChange } = mediaListener;
          mediaQueryList.removeEventListener('change', onChange);
        });
      }

      mediasListenersRef.current = [];
    };

    const getThemeSettingsOfMediasApplicable = (): ThemeSettingsPartial[] => {
      return mediasListenersRef.current
        .map(mediaListener => mediaListener.getIsActive() ? mediaListener.settings : undefined)
        .filter(Boolean) as ThemeSettingsPartial[];
    };

    //

    const theme = useMemo(() => {
      themeSettingsExtendedRef.current = getThemeSettingsExtended();

      const applicableMediasThemeSettings: ThemeSettingsPartial[] = getThemeSettingsOfMediasApplicable();

      const themeBase = createTheme([
        themeSettingsExtendedRef.current.common,
        ...applicableMediasThemeSettings
      ]);

      const themeColorScheme: ThemeExtensionColorScheme = {
        colorScheme: themeColorSchemeRef.current.scheme,
        colorSchemeControl: themeColorSchemeRef.current.control,
        setColorScheme: scheme => {
          themeColorSchemeRef.current = {
            control: scheme ? 'user' : 'system',
            scheme: scheme || getSystemThemeColorScheme()
          };
          configureCurrentThemeColorScheme();
          updateRef.current();
        }
      };

      return { ...themeBase, ...themeColorScheme };
    }, [countUpdate]);

    useEffect(() => {
      setupCurrentThemeColorScheme();
      setupMediasListeners();

      return () => {
        cleanMediasListeners();
      };
    }, dependencies);

    return theme;
  };

  return useCreateTheme;
};

export { createUseCreateThemeExtended };
