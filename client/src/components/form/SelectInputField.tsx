import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { InputFieldProps } from "./OmniInput";
import React from "react";
const SelectInputField = ({
  inputKey,
  formProps,
  editing,
}: InputFieldProps) => {
  const { register, unregister, getValues, getFieldState, formState, watch } =
    formProps;

  // We need to register the options even if it isn't mounted
  // useController does that via register() inside useEffect()
  const { field: optionsField } = useController({
    name: `${inputKey}.edit.options`,
  });

  return (
    <>
      {editing && (
        <Autocomplete options={} renderInput={(params) => <TextField {...params} />} />
      )}
      <TextField
        select
        sx={{ gridColumn: "1 / 3", justifySelf: "start" }}
        placeholder="Interesting text"
        multiline
        fullWidth
        {...register(`${inputKey}.content`, { shouldUnregister: true })}
        // disabled={editing}
      ></TextField>
    </>
  );
};

export default SelectInputField;
