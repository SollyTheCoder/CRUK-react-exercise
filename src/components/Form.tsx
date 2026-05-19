import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Button, Select, TextField } from "@cruk/cruk-react-components";
import { Dispatch, SetStateAction } from "react";
import { NasaSearchParams } from "../types";

const currentYear = new Date().getFullYear();

export const formSchema = z.object({
  keywords: z
    .string()
    .min(2, "keywords must have at least 2 characters.")
    .max(50, "keywords must have at most 50 characters."),
  mediaType: z.enum(["audio", "video", "image"], {
    errorMap: () => ({ message: "Please select a media type." }),
  }),
  yearStart: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^\d+$/.test(value),
      "Please enter a valid number.",
    )
    .refine(
      (value) => !value || Number(value) >= 1900,
      "Year start must be after 1900.",
    )
    .refine(
      (value) => !value || Number(value) <= currentYear,
      "Year start must not be in the future.",
    ),
});

export type FormValues = z.infer<typeof formSchema>;

const initialData: FormValues = {
  keywords: "",
  mediaType: "" as FormValues["mediaType"],
  yearStart: "",
};

export function Form({
  setValues,
}: {
  setValues: Dispatch<SetStateAction<NasaSearchParams | undefined>>;
}) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setValues({
      keywords: data.keywords,
      mediaType: data.mediaType,
      yearStart: data.yearStart ? Number(data.yearStart) : 1999,
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom="m">
        <TextField
          {...register("keywords")}
          errorMessage={errors.keywords?.message}
          label="Keywords"
          required
        />
      </Box>

      <Box marginBottom="m">
        <Select
          {...register("mediaType")}
          errorMessage={errors.mediaType?.message}
          label="Media type"
          required
        >
          <option value="">Select a media type</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </Select>
      </Box>

      <Box marginBottom="m">
        <TextField
          {...register("yearStart")}
          errorMessage={errors.yearStart?.message}
          label="Year start"
          inputMode="numeric"
        />
      </Box>

      <Box marginBottom="m">
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </form>
  );
}
