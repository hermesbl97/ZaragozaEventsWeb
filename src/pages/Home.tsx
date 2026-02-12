import { Link, useNavigate } from "react-router-dom";

export function Home() {
    
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#FFFDF1",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* HERO */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "60px 80px",
          gap: "60px",
        }}
      >
        {/* TEXTO */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              color: "#562F00",
              marginBottom: "20px",
              textAlign: "match-parent",
            }}
          >
            Descubre los mejores eventos en Zaragoza
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#7A4A1A",
              maxWidth: "500px",
              marginBottom: "32px",
              lineHeight: 1.6,
              textAlign: "justify"
            }}
          >
            ¿Buscas estar al tanto de todo lo que ocurre en tu ciudad? Gracias a la web que hemos desarrollado no te perderás 
            ninguno de los eventos que tienen lugar en Zaragoza. Tenemos toda la información que necesitas.
          </p>

          {/* BOTONES */}
          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              to="/locations"
              style={{
                backgroundColor: "#FFCE99",
                color: "#562F00",
                border: "none",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Encuentra por localización
            </Link>

            <Link
              to="/events"
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
              Encuentra tu evento
            </Link>
          </div>
        </div>

        {/* IMAGEN */}
        <div
          style={{
            flex: 1,
            height: "420px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src="https://www.marquid.com/wp-content/uploads/2017/06/6197706_orig.jpg"
            alt="Espacios para eventos"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {/* SECCIÓN NUESTRA HISTORIA */}
      <section
        style={{
          backgroundColor: "#FFCE99",
          padding: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            backgroundColor: "#FFFDF1",
            padding: "60px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#562F00",
              marginBottom: "24px",
            }}
          >
            ¿Cuál es nuestra historia?
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#7A4A1A",
              lineHeight: 1.7,
              textAlign: "justify",
            }}
          >
            Zaragoza Events surgió una tarde en un bar. Sí, sí ... así como lo oyes. Estábamos una tarde de verano, 
            aburridos en la terraza del Tuno sin saber qué hacer. Empezamos conlos típicos comentarios:
            "Es que en esta ciudad no hay nada que hacer...", "¡Zaragoza en verano está muerta!".
            
            Tras 10 minutos de desahogo, Pedro lanzó la pregunta que cambió todo: "¿Realmente no
            hay nada que hacer o es que no nos enteramos de la misa la media?". En ese mismo instante nació nuestra
            misión: crear la web definitiva para saber qué está pasando en la ciudad. Que no se escape ni un concierto, ni una obra de teatro, 
            ni un festival. Que no se nos escape nada.  
          </p>
        </div>
      </section>
    </div>
  );

}