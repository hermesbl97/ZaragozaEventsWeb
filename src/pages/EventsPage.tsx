import React, { useEffect, useState } from "react";
import type { Event } from "../types/Event";
import { NavLink } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { getThemeColors } from "../styles/themeStyles";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";

export function EventsPage() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  {
    /*Query params */
  }
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc | desc">("asc");

  const categoryOptions = Array.from(
    new Set(events.map((event) => event.category)),
  ).sort();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredEvents = events.filter((event) => {
    if (categoryFilter !== "all" && event.category !== categoryFilter) {
      return false;
    }

    if (!normalizedQuery) return true;

    const searchableText = [event.name, event.category, event.price]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((r) => r.json())
      .then((data: Event[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se ha podido cargar la API");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingStatus message="Cargando eventos..." />;
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
          Eventos en Zaragoza
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
          {sortedEvents.length === 0
            ? "No se han encontrado resultados para tu búsqueda"
            : `Se han encontrado ${sortedEvents.length} eventos`}
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
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, categoría, precio ..."
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
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
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
            onChange={(event) =>
              setSortOrder(event.target.value as "asc | desc")
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

        {filteredEvents.length === 0 ? (
          <p style={{ color: "#666" }}>
            No se dispone de ningún evento con estas características
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
{sortedEvents.map((event) => (
              <NavLink key={event.id} to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: colors.navbar,
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    minHeight: "140px",
                    transition: "transform 0.2s",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: colors.text,
                      fontSize: "1.4rem",
                      fontWeight: 700,
                    }}
                  >
                    {event.name}
                  </h3>

                  <div style={{ color: colors.text, fontSize: "0.9rem", marginTop: "5px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span>
                      📅 Fecha: <strong>{event.eventDate}</strong>
                    </span>
                    <span>
                      🏷️ Categoría: <strong>{event.category}</strong>
                    </span>
                    <span>
                      💰 Precio: <strong>{event.price} €</strong>
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
