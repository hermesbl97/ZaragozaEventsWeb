import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
    <footer
      style={{
        backgroundColor: "#562F00", 
        color: "#FFFDF1",           
        padding: "40px 80px",
        marginTop: "auto",          
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "40px",
        }}
      >
        {/* COLUMNA 1: INFO DE LA MARCA */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF9644">
              <path d="M22,21H2V19H22v2ZM20,10V17H18V10h2ZM13,10v7h-2V10h2ZM6,10v7H4V10h6ZM22,8H2L12,2l10,6Z"/>
            </svg>
            <span style={{ fontSize: "1.5rem", fontWeight: 750, color: "#FF9644" }}>
              Zaragoza Events
            </span>
          </div>
        </div>

        {/* COLUMNA 2: ENLACES RÁPIDOS */}
        <div>
          <h4 style={{ color: "#FFCE99", marginBottom: "20px" }}>Navegación</h4>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            <li><NavLink to="/" style={{ color: "#FFFDF1", textDecoration: "none", fontSize: "0.9rem" }}>Home</NavLink></li>
            <li><NavLink to="/events" style={{ color: "#FFFDF1", textDecoration: "none", fontSize: "0.9rem" }}>Eventos</NavLink></li>
            <li><NavLink to="/locations" style={{ color: "#FFFDF1", textDecoration: "none", fontSize: "0.9rem" }}>Localizaciones</NavLink></li>
          </ul>
        </div>

        {/* COLUMNA 3: CONTACTO */}
        <div>
          <h4 style={{ color: "#FFCE99", marginBottom: "20px" }}>Contacto</h4>
          <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>📍 Plaza del Pilar, Zaragoza</p>
          <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>📧 info@zaragozaevents.com</p>
          <div style={{ display: "flex", gap: "5px", marginTop: "10px", justifyContent:"center" }}>
             <span style={{ fontSize: "1rem", cursor: "pointer" }}>📸</span>
             <span style={{ fontSize: "1rem", cursor: "pointer" }}>🐦</span>
             <span style={{ fontSize: "1rem", cursor: "pointer" }}>facebook</span>
          </div>
        </div>
      </div>

      {/* LÍNEA FINAL DE COPYRIGHT */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 206, 153, 0.2)",
          marginTop: "40px",
          paddingTop: "20px",
          textAlign: "center",
          fontSize: "0.8rem",
          opacity: 0.6,
        }}
      >
        © 2026 Zaragoza Events. Todos los derechos reservados.
      </div>
    </footer>
  );
}