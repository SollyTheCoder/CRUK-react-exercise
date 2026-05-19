import { ItemsType } from "../../../types";

export function AudioItem({ item }: { item: ItemsType }) {
  const meta = item.data[0];
  if (!meta) return null;

  const detailUrl = `https://images.nasa.gov/details/${meta.nasa_id}`;

  return (
    <a
      href={detailUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen: ${meta.title}`}
      style={{
        width: 120,
        height: 120,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        fontSize: 32,
        textDecoration: "none",
      }}
    >
      🎵
    </a>
  );
}
