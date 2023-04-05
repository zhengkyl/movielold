import React, { FormEventHandler, ReactEventHandler, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useController, useFormContext } from "react-hook-form";
import { InputFieldProps } from "./OmniInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

interface Option {
  title?: string;
  value: string;
}

const EditSelectInputField = ({ optionsFormName }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => setDialogOpen(false);

  const [dialogValue, setDialogValue] = useState("");
  const [autoValue, setAutoValue] = useState("");

  const { setValue, getValues, watch } = useFormContext();

  const watchOptions = watch(optionsFormName);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const oldValues = getValues(optionsFormName);
    if (oldValues.some((option) => option.value === dialogValue)) {
      return;
    }
    setValue(optionsFormName, [...oldValues, { value: dialogValue }]);
    handleClose();
  };
  return (
    <>
      <Autocomplete
        freeSolo
        clearOnBlur
        handleHomeEndKeys
        options={watchOptions}
        renderInput={(params) => <TextField {...params} label="Options" />}
        onChange={(event, newValue) => {
          console.log("onchange", newValue);
          if (!newValue) return;
          if (typeof newValue === "string") {
            // Add new option
            setDialogValue(newValue);
            setDialogOpen(true);
          } else if (newValue.title) {
            setDialogValue(newValue.value);
            setDialogOpen(true);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = optionFilter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              value: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option.title || option.value;
        }}
        getOptionDisabled={(option) => !option.title}
      />
      <Dialog open={dialogOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new option</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            Did you miss any film in our list? Please, add it!
          </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue}
              onChange={(event) => setDialogValue(event.target.value)}
              label="title"
              type="text"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const optionFilter = createFilterOptions<Option>();

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
    defaultValue: [],
  });
  console.log("value", optionsField.value);
  return (
    <>
      {editing && (
        <EditSelectInputField optionsFormName={`${inputKey}.edit.options`} />
      )}
      <TextField
        select
        sx={{ gridColumn: "1 / 3", justifySelf: "start" }}
        placeholder="Make selection"
        fullWidth
        {...register(`${inputKey}.content`, { shouldUnregister: true })}
      >
        {optionsField.value.map((option: Option) => {
          <MenuItem value={option.value}>
            {option.title || option.value}
          </MenuItem>;
        })}
      </TextField>
    </>
  );
};

export default SelectInputField;
