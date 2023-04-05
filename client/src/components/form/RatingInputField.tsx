import React, { useMemo } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { Controller, useController } from "react-hook-form";
import { InputFieldProps } from "./OmniInput";

const DEFAULT_SIZE = 5;
const MIN_SIZE = 1;
const MAX_SIZE = 20;

const RatingInputField = ({ inputKey, editing }: InputFieldProps) => {
  const { field: maxField } = useController({
    name: `${inputKey}.edit.max`,
    defaultValue: DEFAULT_SIZE,
  });

  // MUI takes number, but value from useController is string
  // get clamped size
  const ratingSize = useMemo(
    () => Math.max(Math.min(+maxField.value, MAX_SIZE), MIN_SIZE),
    [maxField.value]
  );

  return (
    <>
      {editing && <TextField {...maxField} label="Rating Scale" size="small"/>}
      <Controller
        name={`${inputKey}.content`}
        shouldUnregister={true}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Rating
            sx={{ gridRowStart: 2 }}
            onChange={onChange}
            value={+value} // MUI takes number, but value from controller is string
            onBlur={onBlur}
            ref={ref}
            precision={0.5}
            max={ratingSize}
          />
        )}
      />
    </>
  );
};

export default RatingInputField;
