import tokensJson from './tokens.json';

export const tokens = tokensJson;

export type ColorToken = keyof typeof tokensJson.color;
export type RadiusToken = keyof typeof tokensJson.radius;
export type TypographyToken = keyof typeof tokensJson.typography;
export type ShadowToken = keyof typeof tokensJson.shadow;

export default tokens;
