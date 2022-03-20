import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { Controller, useController } from "react-hook-form";
import { InputFieldProps } from "./OmniInput";
import React from "react";
const RatingInputField = ({ inputKey, editing }: InputFieldProps) => {
  const { field: maxField } = useController({ name: `${inputKey}.edit.max` });
  return (
    <>
      {/* {editing && <TextField {...maxField} />} */}
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
          />
        )}
      />
    </>
  );
};

export default RatingInputField;
