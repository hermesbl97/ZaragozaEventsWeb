import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import type { Event } from "../types/Event";
import type { Artist } from "../types/Artist";
import { useTheme } from "../components/ThemeContext";
import { getThemeColors } from "../styles/themeStyles";

export function EventsDetail() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "dark");

  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se ha podido conectar con el servidor");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: colors.info }}>
        Cargando evento...
      </div>
    );
  if (!event)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Evento no encontrado
      </div>
    );

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
          color: colors.info,
          borderRadius: "24px",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        <div>
          <h1 style={{ color: colors.text, fontSize: "2.5rem" }}>{event.name}</h1>
          <p>
            <strong>Fecha:</strong> {event.eventDate}
          </p>
          <p style={{ textAlign: "center" }}>{event.description}</p>
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
                📍 <strong>Lugar:</strong> {event.location?.name}
              </p>
              <p style={{ margin: 0 }}>
                🏷️ <strong>Categoría:</strong> {event.category}
              </p>
              <p style={{ margin: 0 }}>
                💰 <strong>Precio:</strong> {event.price} €
              </p>
              <p style={{ margin: 0 }}>
                👥 <strong>Capacidad:</strong> {event.capacity} personas
              </p>
              <p style={{ margin: 0 }}>
                🌟 <strong>Artistas invitados:</strong>{" "}
                {event.artists && event.artists.length > 0
                  ? event.artists
                      .map(
                        (artist: Artist) => `${artist.name} ${artist.surname}`,
                      )
                      .join(", ")
                  : "No hay artistas invitados"}
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
              to="/events"
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
