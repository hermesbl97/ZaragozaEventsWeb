import React from "react";

interface ArtistFiltersProps {
  query: string;
  onQueryChange: (val: string) => void;
  typeFilter: string;
  onTypeFilterChange: (val: string) => void;
  typeOptions: string[];
  sortOrder: "asc" | "desc";
  onSortOrderChange: (val: "asc" | "desc") => void;
  colors: {
    borders: string;
    navbar: string;
    text: string;
    bg: string;
  };
}

export function ArtistFilters({
  query,
  onQueryChange,
  typeFilter,
  onTypeFilterChange,
  typeOptions,
  sortOrder,
  onSortOrderChange,
  colors,
}: ArtistFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar por nombre, apellido, tipo de artista ..."
        style={{
          flex: 1,
          padding: "12px 14px",
          borderRadius: "10px",
          border: `1px solid ${colors.borders}`,
          background: "#f9fafb",
          fontSize: "1rem",
        }}
      />

      <select
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        style={{
          padding: "12px 14px",
          borderRadius: "10px",
          border: `1px solid ${colors.borders}`,
          backgroundColor: colors.navbar,
          color: colors.text,
          fontSize: "1rem",
          minWidth: "170px",
        }}
      >
        <option value="all">Todos</option>
        {typeOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as "asc" | "desc")}
        style={{
          padding: "12px 14px",
          borderRadius: "10px",
          backgroundColor: colors.navbar,
          border: `1px solid ${colors.borders}`,
          color: colors.text,
          fontSize: "1rem",
          minWidth: "170px",
        }}
      >
        <option value="asc">Ascendente (A-Z)</option>
        <option value="desc">Descendente (Z-A)</option>
      </select>

      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          style={{
            padding: "12px 14px",
            borderRadius: "10px",
            backgroundColor: colors.text,
            color: colors.bg,
            cursor: "pointer",
          }}
        >
          Borrar
        </button>
      )}
    </div>
  );
}
