import {
  Card,
  CardContent,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Divider,
  CardActions,
} from "@mui/material";

import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactChild,
  useCallback,
  useRef,
  useState,
} from "react";

import { useFormContext, UseFormReturn } from "react-hook-form";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  OmniInputField,
  InputFieldType,
  InputFieldTypes,
} from "./OmniInputField";

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

interface BaseInputProps {
  /** Form field id prefix that is unique between each `<Input/>`
   * Each `<Input/>` might have several form inputs
   * ```
   * `${inputKey}-label` // Used in BaseInput
   * `${inputKey}-content` // Example usage in <XXXXInput/>
   * ```
   */
  inputKey: string | number;
}

interface OmniInputProps extends BaseInputProps {
  dragHandleProps: any;
  /** Callback that does all logic to unmount the `<Input/>` */
  onDelete: () => void;
}
export interface InputFieldProps extends BaseInputProps {
  editing: boolean;
  formProps: Pick<
    UseFormReturn,
    | "register"
    | "unregister"
    | "getValues"
    | "getFieldState"
    | "formState"
    | "watch"
  >;
}

const OmniInput = ({ inputKey, onDelete, dragHandleProps }: OmniInputProps) => {
  const [inputType, setInputType] = useState<InputFieldType>(
    InputFieldType.Text
  );

  const [editing, setEditing] = useState(false);
  
  // need to subscribe to formState to use getFieldState
  const { register, unregister, getValues, getFieldState, formState, watch } =
    useFormContext();

  const formProps = {
    register,
    unregister,
    getValues,
    getFieldState,
    formState,
    watch,
  };

  const watchLabel = watch(`${inputKey}-label`);

  const onChangeInputType: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setInputType(e.target.value); // TODO fix type
    },
    []
  );

  const onEdit = useCallback(() => setEditing(true), []);

  const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    const modalRoot = document.querySelector(".MuiModal-root");
    // Lost focus to child or modalRoot b/c select popup is in a portal
    if (
      !event.relatedTarget || // deselect select popup has undefined relatedTarget
      event.currentTarget.contains(event.relatedTarget) ||
      (modalRoot && modalRoot.contains(event.relatedTarget))
    ) {
      return;
    }

    // Else exit edit mode by saving
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
            {/* TODO Not actually sure why value.icon works, look into? */}
            {Object.entries(InputFieldTypes).map(([key, value]) => (
              <MenuItem value={key} key={key}>
                <value.icon />
                {value.title}
              </MenuItem>
            ))}
          </TextField>
        )}
        <OmniInputField
          type={inputType}
          inputKey={inputKey}
          editing={editing}
          formProps={formProps}
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

export default OmniInput;