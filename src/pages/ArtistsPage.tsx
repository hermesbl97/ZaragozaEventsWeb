import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getThemeColors } from "../styles/themeStyles";
import { useTheme } from "../components/ThemeContext";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import type { Artist } from "../types/Artist";

export function ArtistsPage() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  {
    /*Query params */
  }
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc | desc">("asc");

  const typeOptions = Array.from(
    new Set(artists.map((artist) => artist.type)),
  ).sort();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredArtists = artists.filter((artist) => {
    if (typeFilter !== "all" && artist.type !== typeFilter) {
      return false;
    }

    if (!normalizedQuery) return true;

    const searchableText = [artist.name, artist.surname, artist.type]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  useEffect(() => {
    fetch("http://localhost:8080/artists")
      .then((r) => r.json())
      .then((data: Artist[]) => {
        setArtists(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se ha podido cargar la API");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingStatus message="Cargando artistas..." />;
  if (error) return <ErrorStatus message={error} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui",
        backgroundColor: colors.bg,
        minWidth: "1200px",
      }}
    >
      <div
        style={{
          padding: "60px 80px",
          maxWidth: "1400px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            marginBottom: "32px",
            color: colors.text,
            fontSize: "2.2rem",
          }}
        >
          Listado de artistas
        </h1>

        {/* RETROALIMENTACIÓN: CONTADOR DE RESULTADOS */}
        <div
          style={{
            marginBottom: "25px",
            color: colors.subtext,
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          {sortedArtists.length === 0
            ? "No se han encontrado resultados para tu búsqueda"
            : `Se han encontrado ${sortedArtists.length} artistas`}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            value={query}
            onChange={(artist) => setQuery(artist.target.value)}
            placeholder="Buscar por nombre, apellido, tipo de artista ..."
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: "10px",
              border: `1px solid ${colors.borders}`,
              background: "#f9fafb",
              fontSize: "1rem",
            }}
          />
          <select
            value={typeFilter}
            onChange={(artist) => setTypeFilter(artist.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: `1px solid ${colors.borders}`,
              backgroundColor: colors.navbar,
              color: colors.text,
              fontSize: "1rem",
              minWidth: "170px",
            }}
          >
            <option value="all">Todos</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(artist) =>
              setSortOrder(artist.target.value as "asc | desc")
            }
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              backgroundColor: colors.navbar,
              border: `1px solid ${colors.borders}`,
              color: colors.text,
              fontSize: "1rem",
              minWidth: "170px",
            }}
          >
            <option value="asc">Ascendente (A-Z)</option>
            <option value="desc">Descendente (Z-A)</option>
          </select>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                backgroundColor: colors.text,
                color: colors.bg,
                cursor: "pointer",
              }}
            >
              Borrar
            </button>
          )}
        </div>

        {filteredArtists.length === 0 ? (
          <p style={{ color: "#666" }}>
            No se dispone ningún artista con estas características
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {sortedArtists.map((artist) => (
                <NavLink to={`/artists/${artist.id}`}>
                  <div
                    key={artist.id}
                    style={{
                      background: colors.navbar,
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      minHeight: "120px",
                    }}
                  >
                    {/* NOMBRE DE LA LOCALIZACIÓN */}
                    <h3
                      style={{
                        margin: 0,
                        color: colors.text,
                        fontSize: "1.4rem",
                        fontWeight: 700,
                      }}
                    >
                      {artist.name} {artist.surname}
                    </h3>

                    {/* Tipo Y Seguidores */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        fontSize: "0,7rem",
                        color: colors.text,
                        fontWeight: 500,
                        marginTop: "5px",
                      }}
                    >
                      <span>
                        🏷️ Type: <strong>{artist.type}</strong>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        fontSize: "0,7rem",
                        color: colors.text,
                        fontWeight: 500,
                      }}
                    >
                      <span>
                        📱 Followers: <strong>{artist.followers}</strong>
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
