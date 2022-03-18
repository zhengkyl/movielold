import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import React, { FocusEventHandler } from "react"; // needed for fragments
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
interface FormSchema {
  type: "object";
  required?: string[];
  properties: {
    [key: string]: (FormSchema | FormInputSchema)[];
  };
}

interface FormInputSchema {
  type: string;
  [key: string]: string | string[] | number | number[];
}

interface TextInputSchema extends FormInputSchema {
  type: "Text";
}

interface InputProps {
  inputKey: string | number;
  dragHandleProps: any;
  onDelete: () => void;
}
const TextInput = ({ inputKey, onDelete, dragHandleProps }: InputProps) => {
  const [inputType, setInputType] = useState("Text");

  const [editing, setEditing] = useState(false);

  // need to subscribe to formState to use getFieldState
  const { register, unregister, getValues, getFieldState, formState, watch } =
    useFormContext();

  const watchLabel = watch(`${inputKey}-label`);

  const onChangeInputType: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setInputType(e.target.value);
    },
    []
  );

  const onEdit = useCallback(() => setEditing(true), []);

  const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    // Lost focus to child
    if (
      !event.currentTarget ||
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }
    onSave();
  };

  const onSave = () => {
    // const titleValue = getValues(`${inputKey}-label`)
    const test = getFieldState(`${inputKey}-label`);
    console.log(test);
    setEditing(false);
  };

  // TODO add confirmation?
  const onTryDelete = useCallback(() => {
    unregister(`${inputKey}-label`);
    onDelete();
  }, [unregister, onDelete, inputKey]);

  return (
    <Card
      sx={{ display: "flex", justifyContent: "space-between" }}
      onBlur={onBlur}
      tabIndex={0}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 2,
        }}
      >
        {editing ? (
          <TextField
            size="small"
            placeholder="Label"
            required
            autoFocus
            {...register(`${inputKey}-label`, { minLength: 1, maxLength: 64 })}
          />
        ) : (
          <Typography
            component="h2"
            sx={{
              fontWeight: 500,
              fontSize: "1.25em",
              lineHeight: 1.2,
              pt: 1,
              pb: 1,
            }}
            // This matches textfield height most of the time, better for ux
            // 16px * 1.25 * 1.2 + 8 + 8 = 40px
          >
            {watchLabel || `Unnamed ${inputKey}`}
          </Typography>
        )}

        {editing && (
          <TextField
            sx={{ justifySelf: "end" }}
            select
            size="small"
            label="Text Length"
            value={inputType}
            onChange={onChangeInputType}
          >
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="Color">Color</MenuItem>
            <MenuItem value="Number">Number</MenuItem>
          </TextField>
        )}

        <TextField
          sx={{ gridColumn: "1 / 3", justifySelf: "start" }}
          placeholder="Interesting text"
          multiline
          fullWidth
          disabled={editing}
        />
      </CardContent>
      <Divider orientation="vertical" flexItem />
      <CardActions
        {...dragHandleProps}
        sx={{
          flexDirection: "column",
          position: "relative",
          bgcolor: "primary.light",
          justifyContent: "space-between",
        }}
        disableSpacing
      >
        {editing ? (
          <>
            <IconButton aria-label="save" onClick={onSave} size="small">
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={onTryDelete} size="small">
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <IconButton aria-label="edit" onClick={onEdit} size="small">
            <EditIcon />
          </IconButton>
        )}
        <DragIndicatorIcon
          sx={{ position: "absolute", top: 0, bottom: 0, margin: "auto" }}
        />
      </CardActions>
    </Card>
  );
};

export default TextInput;
