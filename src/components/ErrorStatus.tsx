import { getThemeColors } from "../styles/themeStyles";
import { useTheme } from "./ThemeContext";

export function ErrorStatus({ message }: { message: string }) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  return (
    <div style={{ 
      display: "flex", justifyContent: "center", alignItems: "center", 
      minHeight: "50vh", color: "#e74c3c", backgroundColor: colors.bg 
    }}>
      <div style={{ textAlign: "center", padding: "20px", border: "1px solid #e74c3c", borderRadius: "10px" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>❌ Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
}