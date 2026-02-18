import { getThemeColors } from "../styles/themeStyles";
import { useTheme } from "./ThemeContext";

export function LoadingStatus({ message } : { message: string }) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  return (
    <div style={{ 
      display: "flex", justifyContent: "center", alignItems: "center", 
      minHeight: "50vh", color: colors.text, backgroundColor: colors.bg 
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: 500 }}> {message}</p>
      </div>
    </div>
  );
}