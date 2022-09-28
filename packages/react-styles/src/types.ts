import type { Theme, CSSObject } from '@emotion/react';

export type Style = CSSObject;

export type Styles = Record<string, Style>;

export type StylesCreatorFunction<P = undefined> = (props: P) => Styles;

export type StylesCreator<P = undefined> = StylesCreatorFunction<P> | Styles | false | null | undefined;

export type StylesThemeCreatorFunction<P = undefined> = (theme: Theme, props: P) => Styles;

export type StylesThemeCreator<P = undefined> = StylesThemeCreatorFunction<P> | Styles | false | null | undefined;
