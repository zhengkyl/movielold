import OmniInput, { InputFieldProps } from "./OmniInput";
import TextInputField from "./TextInputField";
import RatingInputField from "./RatingInputField";

import NumbersIcon from "@mui/icons-material/Numbers";
import StarIcon from "@mui/icons-material/Star";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckboxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export enum InputFieldType {
  Text = "Text",
  Rating = "Rating",
  Number = "Number",
  Checkbox = "Checkbox",
  RadioGroup = "RadioGroup",
}
// TODO
// look into why icon can be used without capital
export const InputFieldTypes = {
  [InputFieldType.Text]: {
    title: "Text",
    icon: TextFieldsIcon,
    component: TextInputField,
  },
  [InputFieldType.Rating]: {
    title: "Rating",
    icon: StarIcon,
    component: RatingInputField,
  },
  [InputFieldType.Number]: {
    title: "Number",
    icon: NumbersIcon,
    component: TextInputField,
  },
  [InputFieldType.Checkbox]: {
    title: "CheckBox",
    icon: CheckboxIcon,
    component: TextInputField,
  },
  [InputFieldType.RadioGroup]: {
    title: "Multiple choice",
    icon: RadioButtonCheckedIcon,
    component: TextInputField,
  },
};

export const OmniInputField = (
  props: InputFieldProps & { type: InputFieldType }
) => {
  const { type, ...inputProps } = props;
  const InputField = InputFieldTypes[type].component;
  return <InputField {...props} />;
};
