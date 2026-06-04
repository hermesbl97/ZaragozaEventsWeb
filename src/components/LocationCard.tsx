import React from "react";
import { NavLink } from "react-router-dom";
import type { Location } from "../types/Location";

interface LocationCardProps {
  location: Location;
  colors: {
    navbar: string;
    text: string;
  };
}

export function LocationCard({ location, colors }: LocationCardProps) {
  return (
    <NavLink to={`/locations/${location.id}`} style={{ textDecoration: "none" }}>
      <div
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontSize: "0.8rem",
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
            fontSize: "0.8rem",
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
  );
}