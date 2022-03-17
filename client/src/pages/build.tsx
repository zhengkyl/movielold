import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Allows choosing icon by text name dynamically
// Explodes bundle size, but ok for SSR?
// import * as MuiIcons from "@mui/icons-material";
import NumbersIcon from "@mui/icons-material/Numbers";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckboxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useState } from "react";
import TextInput from "../components/form/TextInput";
// temp for testing
const INPUT_TYPES = [
  { title: "Text", icon: <TextFieldsIcon /> },
  { title: "Number", icon: <NumbersIcon /> },
  { title: "Checkbox", icon: <CheckboxIcon /> },
  { title: "Multiple choice", icon: <RadioButtonCheckedIcon /> },
];
interface FormInputBase {
  title: string; // convertable into unique camelCase object key
  type: "Text" | "Number" | "Checkbox" | "Multiple choice";
}

const BuildPage = () => {
  const [formInputs, setFormInputs] = useState<FormInputBase[]>([]);
  const onDragEnd = () => {};
  return (
    <main>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="toolbox">
          {(provided, snapshot) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {INPUT_TYPES.map((type, index) => (
                <Draggable
                  key={type.title}
                  draggableId={type.title}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* {type.title}
                      {type.icon} */}
                      <TextInput/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        {/* <Droppable droppableId="form">
          {(provided, snapshot) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {formInputs.map((input, index) => (
                <Draggable
                  key={input.type}
                  draggableId={input.type}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {input.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable> */}
      </DragDropContext>
    </main>
  );
};

export default BuildPage;
