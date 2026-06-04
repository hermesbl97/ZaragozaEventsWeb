interface EventCounterProps {
  count: number;
  color: string;
}

export function EventCounter({ count, color }: EventCounterProps) {
  return (
    <div
      style={{
        marginBottom: "25px",
        color: color,
        fontSize: "0.9rem",
        fontWeight: 500,
      }}
    >
      {count === 0
        ? "No se han encontrado resultados para tu búsqueda"
        : `Se han encontrado ${count} eventos`}
    </div>
  );
}