import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
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



const TextInput = () => {
  const [inputType, setInputType] = useState("short");

  const onChangeTextLength: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputType(e.target.value);
  };

  return (
    <Card>
      <CardContent
        sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2 }}
        component="form"
      >
        <TextField size="small" placeholder="Label" required />
        <TextField
          sx={{ justifySelf: "end" }}
          select
          size="small"
          label="Text Length"
          value={inputType}
          onChange={onChangeTextLength}
        >
          <MenuItem value="short">Short</MenuItem>
          <MenuItem value="paragraph">Paragraph</MenuItem>
        </TextField>
        <TextField
          sx={{ gridColumn: "1 / 3", justifySelf: "start" }}
          placeholder="Interesting text"
          multiline={inputType === "paragraph"}
          fullWidth
          rows={4}
        />
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TextInput;
