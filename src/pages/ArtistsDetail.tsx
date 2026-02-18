import { NavLink, useParams } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { useEffect, useState } from "react";
import { getThemeColors } from "../styles/themeStyles";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import type { Artist } from "../types/Artist";

export function ArtistsDetail() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/artists/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setArtist(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se ha podido conectar con el servidor");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingStatus message="Cargando localización ..." />;
  if (error) return <ErrorStatus message="Artista no encontrado" />;

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        minHeight: "100vh",
        minWidth: "1200px",
      }}
    >
      <div
        style={{
          margin: "20px auto",
          background: colors.navbar,
          borderRadius: "24px",
          color: colors.info,
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        <div>
          <h1 style={{ color: colors.text, fontSize: "2.5rem" }}>
            {artist?.name} {artist?.surname} 🌟
          </h1>
        </div>
        <div>
          <div
            style={{
              background: colors.bg,
              padding: "24px",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3
              style={{
                color: colors.text,
                textAlign: "center",
                margin: 0,
                marginBottom: "12px",
              }}
            >
              Información adicional
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                textAlign: "left",
              }}
            >
              <p style={{ margin: 0 }}>
                🔖 <strong>Tipo:</strong> {artist?.type}
              </p>
              <p style={{ margin: 0 }}>
                ⚧️ <strong>Género: </strong> {artist?.genre}
              </p>
              <p style={{ margin: 0 }}>
                📆 <strong>Fecha de nacimiento:</strong> {artist?.birthDate}
              </p>
              <p style={{ margin: 0 }}>
                📱 <strong>Seguidores:</strong> {artist?.followers} personas
              </p>
              <p style={{ margin: 0 }}>
                📊 <strong>Altura: </strong> {artist?.height} m
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
            }}
          >
            <NavLink
              to="/locations"
              style={{
                backgroundColor: colors.text,
                color: colors.bg,
                border: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              ← Volver atrás{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
