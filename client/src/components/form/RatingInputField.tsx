import Rating from "@mui/material/Rating";
import { Controller } from "react-hook-form";
import { InputFieldProps } from "./OmniInput";

const RatingInputField = ({ inputKey, editing }: InputFieldProps) => {

  return (
    <Controller
      name={`${inputKey}-content`}
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
  );
};

export default RatingInputField;
