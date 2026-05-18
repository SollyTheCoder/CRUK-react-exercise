import { ItemsType } from "../../../types";

export function VideoItem({ item }: { item: ItemsType }) {
  const meta = item.data[0];
  const thumbnail = item.links?.find((l) => l.rel === "preview")?.href;

  if (!meta || !thumbnail) return null;

  const detailUrl = `https://images.nasa.gov/details/${meta.nasa_id}`;

  return (
    <a
      href={detailUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Play video: ${meta.title}`}
      style={{
        position: "relative",
        width: 120,
        height: 120,
        flexShrink: 0,
        display: "block",
      }}
    >
      <img
        src={thumbnail}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 32,
          textShadow: "0 0 4px rgba(0,0,0,0.7)",
        }}
      >
        ▶
      </div>
    </a>
  );
}
