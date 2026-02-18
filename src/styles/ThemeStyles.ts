export interface ThemeStyles {
    bg: string,
    text: string,
    subtext: string,
    navbar: string,
    borders: string,
    info: string,

}

export const getThemeColors = (isDark:boolean): ThemeStyles => ({
    bg: isDark ? "#1A1A1A" : "#FFFDF1",
    text: isDark ? "#F1FAEE" : "#562F00",
    subtext: isDark ? "#A0A0A0" : "#7A4A1A",
    navbar: isDark ? "#483a2a" : "#FFCE99",
    borders: isDark ? "#925627" : "#d0d7de",
    info: isDark ? "#d9935e" : "#1D3557",
  });