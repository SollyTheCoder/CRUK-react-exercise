import { Box, Button, Heading, Text } from "@cruk/cruk-react-components";
import { NasaResponse, NasaSearchParams } from "../../types";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { urlNasaSearch } from "../../services/nasa";
import { ListItem } from "../atoms/ListItem";

const PAGE_SIZE = 10;

export function List({ values }: { values?: NasaSearchParams }) {
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the search criteria change
  useEffect(() => {
    setPage(1);
  }, [values]);

  useEffect(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const { data, isFetching, isError, error } = useQuery<NasaResponse>(
    ["nasaSearch", values, page],
    () => fetch(urlNasaSearch({ ...values!, page })).then((res) => res.json()),
    {
      enabled: !!values,
      keepPreviousData: true,
    },
  );

  const resultsRef = useRef<HTMLDivElement>(null);

  if (!values) {
    return (
      <Box marginTop="m">
        <Text>Make a search to see results.</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box marginTop="m">
        <Text>Something went wrong: {(error as Error).message}</Text>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box marginTop="m">
        <Text>Loading…</Text>
      </Box>
    );
  }
  console.log(data);

  const items = data.collection.items;
  const totalHits = data.collection.metadata?.total_hits ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalHits / PAGE_SIZE));

  if (items.length === 0) {
    return (
      <Box marginTop="m">
        <Text>No results found.</Text>
      </Box>
    );
  }

  return (
    <Box marginTop="m" ref={resultsRef}>
      <Heading h2>Results</Heading>
      <Text textSize="s">
        Page {page} of {totalPages} ({totalHits} total)
      </Text>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => {
          const meta = item.data[0];

          if (!meta) return null;

          return (
            <li
              key={meta.nasa_id}
              style={{
                borderTop: "1px solid #ddd",
                padding: "1rem 0",
                display: "flex",
                gap: "1rem",
              }}
            >
              <ListItem key={item.data[0]?.nasa_id} item={item} />
            </li>
          );
        })}
      </ul>

      <Box
        marginTop="m"
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
      >
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isFetching}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages || isFetching}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
