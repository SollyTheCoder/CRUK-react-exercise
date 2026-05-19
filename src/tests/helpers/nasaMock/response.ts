type MediaType = "image" | "video" | "audio";

const titlePrefix: Record<MediaType, string> = {
  image: "Lunar mosaic",
  video: "Apollo launch footage",
  audio: "Apollo transmission",
};

const descriptionPrefix: Record<MediaType, string> = {
  image: "Composite view of the lunar surface",
  video: "Rocket launch footage from",
  audio: "Historic audio from Apollo",
};

const mediaCenter: Record<MediaType, string> = {
  image: "GSFC",
  video: "KSC",
  audio: "JSC",
};

export const createResponse = (mediaType: MediaType, total: number) => {
  return {
    collection: {
      version: "1.0",
      href: `localhost:3000/search?keywords=moon&media_type=${mediaType}`,
      metadata: { total_hits: total },
      items: Array.from({ length: total }, (_, i) => i + 1).map((v) => ({
        href: `localhost:3000/${mediaType}/test-${mediaType}-${v}/collection.json`,
        data: [
          {
            center: mediaCenter[mediaType],
            title: `${titlePrefix[mediaType]} ${v}`,
            keywords: ["moon", mediaType],
            location: "",
            nasa_id: `test-${mediaType}-${v}`,
            date_created: "2020-01-01T00:00:00Z",
            media_type: mediaType,
            description: `${descriptionPrefix[mediaType]} ${v}.`,
          },
        ],
        links:
          mediaType === "audio"
            ? []
            : [
                {
                  href: `localhost:3000/${mediaType}-thumb-${v}.jpg`,
                  rel: "preview",
                  render: "image",
                },
              ],
      })),
    },
  };
};
