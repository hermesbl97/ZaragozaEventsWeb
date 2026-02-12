import React, { useEffect, useState } from "react";
import type { Event } from "../types/Event";

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  {
    /*Query params */
  }
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredEvents = normalizedQuery
    ? events.filter((event) => {
        const searchableText = [
          event.name,
          event.category,
          event.price,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : events;

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

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "40px",
        fontFamily: "system-ui",
      }}
    >
      <h1
        style={{
          marginBottom: "32px",
          color: "#562F00",
          fontSize: "2.2rem",
        }}
      >
        Eventos en Zaragoza
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
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
            border: "1px solid #d0d7de",
            background: "#f9fafb",
            fontSize: "1rem",
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #d0d7de",
              background: "white",
              cursor: "pointer",
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      {filteredEvents.length === 0 ? (
        <p style={{ color: "#666" }}>
          Nose dispone de ningún evento con estas características
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
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  background: "#FFFDF1",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "0.3s",
                }}
              >
                {/* TÍTULO + FECHA */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#562F00",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                    }}
                  >
                    {event.name}
                  </h3>

                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#7A4A1A",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Fecha: {event.eventDate}
                  </span>
                </div>

                {/* ETIQUETAS */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#FFCE99",
                      color: "#562F00",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    {event.category}
                  </span>

                  <span
                    style={{
                      backgroundColor: "#FFCE99",
                      color: "#562F00",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Precio: {event.price} €
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}
