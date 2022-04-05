/**
 * Extracted from https://stackoverflow.com/questions/56687668
 */
export type NoInfer<T> = [T][T extends any ? 0 : never];
