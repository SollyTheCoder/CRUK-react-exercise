import { Heading, Text } from "@cruk/cruk-react-components";
import { DataType } from "../../../types";
import { AudioItem } from "./AudioItem";
import { ImageItem } from "./ImageItem";
import { VideoItem } from "./VideoItem";

export function ListItem({ item }: { item: DataType }) {
  return (
    <div>
      <MediaPreview item={item} />
      <div style={{ flex: 1 }}>
        <Heading h3>{item.title}</Heading>
        <Text textSize="s">
          {item.media_type}
          {item.date_created && ` · ${item.date_created.slice(0, 10)}`}
          {item.center && ` · ${item.center}`}
        </Text>
        {item.description && (
          <Text>
            {item.description.length > 200
              ? `${item.description.slice(0, 200)}…`
              : item.description}
          </Text>
        )}
      </div>
    </div>
  );
}

function MediaPreview({ item }: { item: DataType }) {
  switch (item.media_type) {
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
