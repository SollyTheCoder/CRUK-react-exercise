import { ItemsType } from "../../../types";

export function ImageItem({ item }: { item: ItemsType }) {
  const meta = item.data[0];
  const thumbnail = item.links?.find((l) => l.rel === "preview")?.href;

  if (!meta || !thumbnail) return null;

  const detailUrl = `https://images.nasa.gov/details/${meta.nasa_id}`;

  return (
    <a
      href={detailUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View image: ${meta.title}`}
    >
      <img
        src={thumbnail}
        alt={meta.title}
        style={{
          width: 120,
          height: 120,
          objectFit: "cover",
          flexShrink: 0,
          display: "block",
        }}
      />
    </a>
  );
}
