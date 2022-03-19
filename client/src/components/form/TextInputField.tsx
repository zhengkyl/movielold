import TextField from "@mui/material/TextField";
import { InputFieldProps } from "./OmniInput";

const TextInputField = ({ inputKey, formProps }: InputFieldProps) => {
  const { register, unregister, getValues, getFieldState, formState, watch } =
    formProps;

  return (
    <TextField
      sx={{ gridColumn: "1 / 3", justifySelf: "start" }}
      placeholder="Interesting text"
      multiline
      fullWidth
      {...register(`${inputKey}-content`, { shouldUnregister: true })}
      // disabled={editing}
    />
  );
};

export default TextInputField;
