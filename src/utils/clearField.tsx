interface ClearFieldProps {
  setName: (value: string) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}

export const clearField = ({
  setName,
  setTitle,
  setDescription,
}: ClearFieldProps) => {
  // setName("");
  setTitle("");
  setDescription("");

  const nameInput = document.getElementById("name") as HTMLInputElement;
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const todoInput = document.getElementById("todo") as HTMLInputElement;
  // if (nameInput) nameInput.value = "";
  if (titleInput) titleInput.value = "";
  if (todoInput) todoInput.value = "";
};

