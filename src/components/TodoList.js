import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../Contexts/TodosContext";

// Components
import Todo from "./Todo";

//Others
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputTitle, setInputTitle] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");

// filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRender=todos;
  if(displayTodosType==="completed"){
    todosToBeRender=completedTodos;
  }else if (displayTodosType==="non-completed"){
    todosToBeRender=notCompletedTodos;
  }else{
    todosToBeRender=todos;
  }

  const todosJsx = todosToBeRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

 

  useEffect(() => {
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: inputTitle,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputTitle("");
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh" , overflow:"scroll"}}>
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامى
            </Typography>
            <Divider />
            {/* Filter Button */}
            <ToggleButtonGroup
              value={displayTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              style={{ marginTop: "30px", direction: "ltr" }}
              color="primary"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* =========Filter Button============ */}

            {/* All Todos */}
            {todosJsx}
            {/* ===============All Todos========= */}

            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid size={8}>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمه"
                  variant="outlined"
                  value={inputTitle}
                  onChange={(event) => {
                    setInputTitle(event.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={handleAddClick}
                  disabled={inputTitle ===0 }
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
