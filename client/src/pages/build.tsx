import {
  DragDropContext,
  Draggable,
  Droppable,
  DropReason,
  DropResult,
} from "react-beautiful-dnd";

// Allows choosing icon by text name dynamically
// Explodes bundle size, but ok for SSR?
// import * as MuiIcons from "@mui/icons-material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CssBaseline } from "@mui/material";
import OmniInput from "../components/form/OmniInput";


interface FormInputBase {
  title: string; // convertable into unique camelCase object key
  type: "Text" | "Number" | "Checkbox" | "Multiple choice";
}

const BuildPage = () => {
  const [formInputs, setFormInputs] = useState<FormInputBase[]>([
    { title: "test", type: "Text" },
    { title: "test", type: "Text2" },
    { title: "test", type: "Text3" },
    { title: "test", type: "Text4" },
  ]);

  const methods = useForm();
  const onSubmit = (data: any) => console.log(data); // TODO figure out this type

  const reorder = (list: any[], oldIndex: number, newIndex: number) => {
    const newList = Array.from(list);
    const [item] = newList.splice(oldIndex, 1);
    newList.splice(newIndex, 0, item);
    return newList;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newInputs = reorder(formInputs, source.index, destination.index);
    setFormInputs(newInputs);
  };

  const handleDelete = (index: number) => () => {
    const newInputs = [...formInputs];
    newInputs.splice(index, 1);
    setFormInputs(newInputs);
  };

  return (
    <main>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <Droppable droppableId="toolbox">
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
                      <TextInput />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable> */}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Droppable droppableId="form">
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
                        >
                          <OmniInput
                            inputKey={input.type}
                            dragHandleProps={provided.dragHandleProps}
                            onDelete={handleDelete(index)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </form>
        </FormProvider>
      </DragDropContext>
    </main>
  );
};

export default BuildPage;
