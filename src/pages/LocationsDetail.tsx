import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import type { Location } from "../types/Location";

export function LocationsDetail() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/locations/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se ha podido conectar con el servidor");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#1D3557" }}>
        Cargando localización...
      </div>
    );
  if (!location)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Localización no encontrada
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#FFFDF1",
        minHeight: "100vh",
        minWidth: "1200px",
      }}
    >
      <div
        style={{
          margin: "20px auto",
          background: "#FFCE99",
          borderRadius: "24px",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        <div>
          <h1 style={{ color: "#562F00", fontSize: "2.5rem" }}>{location.name} 📍</h1>
          <p style={{ textAlign: "center" }}>{location.description}</p>
        </div>
        <div>
          <div
            style={{
              background: "#FFFDF1",
              padding: "24px",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h3
              style={{
                color: "#562F00",
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
                🏷️ <strong>Categoría:</strong> {location.category}
              </p>
              <p style={{ margin: 0 }}>
                🌆 <strong>Dirección: </strong>{location.streetLocated}, {location.postalCode}
              </p>
              <p style={{ margin: 0 }}>
                📆 <strong>Fecha de registro:</strong> {location.registerDate}
              </p>
             <p style={{ margin: 0 }}>
                🧭 <strong>Coordenadas:</strong> {location.latitude}, {location.longitude}
              </p>
               <p style={{ margin: 0 }}>
                ♿ <strong>Acceso para personas con discapacidad</strong> {location.disabledAccess
                                  ? "🟢"
                                  : "🔴"
                }
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
              to="/locations"
              style={{
                backgroundColor: "#562F00",
                color: "#FFFDF1",
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
