import { setCookie, getCookie } from "cookies-next";

export const THEME_COOKIE_NAME = "portfolio_theme";
export type Theme = "light" | "dark";

export function getClientTheme(): Theme {
  const theme = getCookie(THEME_COOKIE_NAME);
  return theme === "dark" ? "dark" : "light";
}

export function setClientTheme(theme: Theme) {
  setCookie(THEME_COOKIE_NAME, theme, {
    maxAge: 60 * 60 * 24 * 365, // 1 tahun
    path: "/",
    sameSite: "lax",
  });
}