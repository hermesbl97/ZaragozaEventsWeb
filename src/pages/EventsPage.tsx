import React, { useEffect, useState } from "react";
import type { Event } from "../types/Event";
import { NavLink } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import { getThemeColors } from "../styles/themeStyles";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import { EventCard } from "../components/EventCard";
import { EventCounter } from "../components/EventCounter";
import { EventFilters } from "../components/EventFilters";

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

        {/* Componente del Contador */}
        <EventCounter count={sortedEvents.length} color={colors.subtext} />

        {/* Componente de Filtros */}
        <EventFilters
          query={query}
          onQueryChange={setQuery}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categoryOptions={categoryOptions}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          colors={colors}
        />

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
                <EventCard key={event.id} event={event} colors={colors} />
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
