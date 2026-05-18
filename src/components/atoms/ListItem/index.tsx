import { Heading, Text } from "@cruk/cruk-react-components";
import { ItemsType } from "../../../types";
import { AudioItem } from "./AudioItem";
import { ImageItem } from "./ImageItem";
import { VideoItem } from "./VideoItem";

export function ListItem({ item }: { item: ItemsType }) {
  const meta = item.data[0];
  if (!meta) return null;

  return (
    <div
      style={{
        borderTop: "1px solid #ddd",
        padding: "1rem 0",
        display: "flex",
        gap: "1rem",
        listStyle: "none",
      }}
    >
      <MediaPreview item={item} />
      <div style={{ flex: 1 }}>
        <Heading h3>{meta.title}</Heading>
        <Text textSize="s">
          {meta.media_type}
          {meta.date_created && ` · ${meta.date_created.slice(0, 10)}`}
          {meta.center && ` · ${meta.center}`}
        </Text>
        {meta.description && (
          <Text>
            {meta.description.length > 200
              ? `${meta.description.slice(0, 200)}…`
              : meta.description}
          </Text>
        )}
      </div>
    </div>
  );
}

function MediaPreview({ item }: { item: ItemsType }) {
  switch (item.data[0]?.media_type) {
    case "image":
      return <ImageItem item={item} />;
    case "video":
      return <VideoItem item={item} />;
    case "audio":
      return <AudioItem item={item} />;
    default:
      return null;
  }
}
