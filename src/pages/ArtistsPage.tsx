import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getThemeColors } from "../styles/themeStyles";
import { useTheme } from "../components/ThemeContext";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import type { Artist } from "../types/Artist";
import { ArtistCard } from "../components/ArtistCard";
import { ArtistCounter } from "../components/ArtistCounter";
import { ArtistFilters } from "../components/ArtistFilters";

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

        {/* Contador */}
        <ArtistCounter count={sortedArtists.length} color={colors.subtext} />

        {/*  Barra de Búsqueda y Selectores */}
        <ArtistFilters
          query={query}
          onQueryChange={setQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          typeOptions={typeOptions}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          colors={colors}
        />

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
                <ArtistCard key={artist.id} artist={artist} colors={colors} />
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
