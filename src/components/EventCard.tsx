import React from "react";
import { NavLink } from "react-router-dom";
import type { Event } from "../types/Event";

interface EventCardProps {
  event: Event;
  colors: {
    navbar: string;
    text: string;
  };
}

export function EventCard({ event, colors }: EventCardProps) {
  return (
    <NavLink to={`/events/${event.id}`} style={{ textDecoration: "none" }}>
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

        <div
          style={{
            color: colors.text,
            fontSize: "0.9rem",
            marginTop: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
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
  );
}