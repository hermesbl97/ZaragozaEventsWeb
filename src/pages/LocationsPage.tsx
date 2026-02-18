import { useEffect, useState } from "react";
import type { Location } from "../types/Location";
import { NavLink } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { getThemeColors } from "../styles/themeStyles";

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

  if (loading) return <p>Cargando localizaciones...</p>;
  if (error) return <p>{error}</p>;

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

        {/* BARRA DE FILTROS */}
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
            onChange={(location) => setQuery(location.target.value)}
            placeholder="Buscar por nombre o categoría"
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #d0d7de",
              background: "#f9fafb",
              fontSize: "1rem",
            }}
          />
          <select
            value={categoryFilter}
            onChange={(location) => setCategoryFilter(location.target.value)}
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
            <option value="all">Todas las categorías</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(location) =>
              setSortOrderLocations(location.target.value as "asc | desc")
            }
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
            <option value="asc">Ascendente (A-Z)</option>
            <option value="desc">Descendente (Z-A)</option>
          </select>

          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #d0d7de",
                backgroundColor: colors.text,
                color: colors.bg,
                cursor: "pointer",
              }}
            >
              Borrar
            </button>
          )}
        </div>

        {/* LISTADO DE TARJETAS */}
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
              <NavLink to={`/locations/${location.id}`}>
                <div
                  key={location.id}
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
                    {location.name}
                  </h3>

                  {/* CATEGORÍA Y ACCESO EN LA MISMA LÍNEA */}
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
                      🏷️ Categoría: <strong>{location.category}</strong>
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
                      ♿ Acceso a discapacitados:{" "}
                      {location.disabledAccess ? "🟢" : "🔴"}
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
