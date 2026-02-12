import { NavLink } from "react-router-dom";

export default function Navbar() {
    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? "#562F00" : "#FFFDF1", // Marerón si activo, blanco si no lo está
        textDecoration: "none",
        fontWeight: 500,
        fontSize: "1rem",
        padding: "8px 16px",
        borderRadius: "6px",
        transition: "all 0.3s ease",
        backgroundColor: isActive ? "#FFCE99" : "transparent",
    });
    
    return (
        <nav
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 40px",
            height: "65px",
            backgroundColor: "#FF9644", 
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            boxSizing: "border-box",
            width: "100%",
            left:0,
            zIndex: 1000,
        }}
        >
        {/* LOGO + TÍTULO */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ 
                backgroundColor: "#FF9644", 
                display: "flex",
                padding: "2px",
                borderRadius: "10px",
                width:"25px",
                height:"20px",
                alignItems: "center",
                justifyContent: "center"
            }}>

            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24"
                viewBox="0 0 24 24"
                fill="white"
            >
                <path d="M22,21H2V19H22v2ZM20,10V17H18V10h2ZM13,10v7h-2V10h2ZM6,10v7H4V10h6ZM22,8H2L12,2l10,6Z"/>
                </svg>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#F1FAEE", fontWeight: 750, fontSize: "1.7rem", lineHeight: 1 }}>
                    Zaragoza Events
                </span>
            </div>
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <div style={{display:"flex", alignItems: "center"}}>
            <div style={{ display: "flex", gap: "3px"}}>
                <NavLink to="/" style={linkStyle}>
                Home
                </NavLink>
            </div>
            <div>
                <NavLink to="/events" style={linkStyle}>
                Eventos
                </NavLink>
            </div>
            <div>
                <NavLink to="/locations" style={linkStyle}>
                Localizaciones
                </NavLink>
            </div>
        </div>
        </nav>
    );
}