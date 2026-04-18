"use client";

interface FractionGridProps {
  numerator: number;
  denominator: number;
  cols: number;
  rows: number;
  interactive?: boolean;
  shadedCells?: Set<number>;
  onCellClick?: (i: number) => void;
  color?: string;
  /** Show all cells with placeholder styling (for "unknown" grids) */
  unknown?: boolean;
}

export default function FractionGrid({
  numerator,
  denominator,
  cols,
  rows,
  interactive = false,
  shadedCells,
  onCellClick,
  color = "#489BFC",
  unknown = false,
}: FractionGridProps) {
  const total = cols * rows;
  // Compute cell size so the grid stays compact but readable
  const maxWidth = 300;
  const cellSize = Math.max(32, Math.min(56, Math.floor(maxWidth / cols) - 4));

  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: "4px",
        padding: "12px",
        backgroundColor: "#F5EEE6",
        borderRadius: "12px",
        border: "1px solid #E2D5C8",
      }}
      aria-label={`Fraction grid showing ${numerator}/${denominator}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const isShaded = interactive
          ? (shadedCells?.has(i) ?? false)
          : i < numerator;

        return (
          <div
            key={i}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={() => interactive && onCellClick?.(i)}
            onKeyDown={(e) => {
              if (interactive && (e.key === "Enter" || e.key === " "))
                onCellClick?.(i);
            }}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: unknown
                ? "#EDE5DC"
                : isShaded
                ? color
                : "#EDE5DC",
              border: `2px solid ${
                unknown ? "#489BFC44" : isShaded ? color : "#D4C8BC"
              }`,
              borderRadius: "6px",
              cursor: interactive ? "pointer" : "default",
              transition: "background-color 0.12s, border-color 0.12s, transform 0.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#9CA3AF",
            }}
          >
            {unknown ? "?" : null}
          </div>
        );
      })}
    </div>
  );
}
