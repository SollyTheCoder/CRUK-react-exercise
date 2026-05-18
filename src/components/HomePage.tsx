"use client";

import { Box, Heading } from "@cruk/cruk-react-components";
import { useState } from "react";
import { NasaSearchParams } from "../types";
import { Form } from "./Form";
import { List } from "./molecules/List";

export const HomePage = () => {
  const [values, setValues] = useState<NasaSearchParams>();

  console.log(values);

  return (
    <Box marginTop="s" paddingTop="s">
      <Heading h1>React Exercise</Heading>
      <Form setValues={setValues} />
      <List values={values} />
    </Box>
  );
};

export default HomePage;
