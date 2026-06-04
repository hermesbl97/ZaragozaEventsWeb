import { useEffect, useState } from "react";
import type { Location } from "../types/Location";
import { NavLink } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { getThemeColors } from "../styles/themeStyles";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import { LocationCard } from "../components/LocationCard";
import { LocationCounter } from "../components/LocationCounter";
import { LocationFilters } from "../components/LocationFilters";

export function LocationsPage() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  {
    /*Query params*/
  }
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrderLocations] = useState<"asc" | "des">("asc");

  const categoryOptions = Array.from(
    new Set(locations.map((location) => location.category)),
  ).sort();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredLocations = locations.filter((location) => {
    if (categoryFilter !== "all" && location.category !== categoryFilter) {
      return false;
    }

    if (!normalizedQuery) return true;

    const searchableText = [location.name, location.category]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  useEffect(() => {
    fetch("http://localhost:8080/locations")
      .then((r) => r.json())
      .then((data: Location[]) => {
        setLocations(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se ha podido cargar la API");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingStatus message="Cargando localizaciones..." />;
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
          Localizaciones en Zaragoza
        </h1>

        {/* Componente del Contador */}
        <LocationCounter count={sortedLocations.length} color={colors.subtext} />

        {/* Componente de Filtros */}
        <LocationFilters
          query={query}
          onQueryChange={setQuery}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categoryOptions={categoryOptions}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrderLocations}
          colors={colors}
        />

        {filteredLocations.length === 0 ? (
          <p style={{ color: "#666" }}>No se han encontrado localizaciones.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {sortedLocations.map((location) => (
              <LocationCard key={location.id} location={location} colors={colors} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
