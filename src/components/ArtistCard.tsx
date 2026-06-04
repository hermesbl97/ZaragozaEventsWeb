import React from "react";
import { NavLink } from "react-router-dom";
import type { Artist } from "../types/Artist";

interface ArtistCardProps {
  artist: Artist;
  colors: {
    navbar: string;
    text: string;
  };
}

export function ArtistCard({ artist, colors }: ArtistCardProps) {
  return (
    <NavLink to={`/artists/${artist.id}`} style={{ textDecoration: "none" }}>
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
          {artist.name} {artist.surname}
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
            🔖 Type: <strong>{artist.type}</strong>
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
            📱 Followers: <strong>{artist.followers}</strong>
          </span>
        </div>
      </div>
    </NavLink>
  );
}