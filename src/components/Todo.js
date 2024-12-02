import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { TodosContext } from "../Contexts/TodosContext";

//icons
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Delete Dialog Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  //Event Handler
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleEditClick() {
    setShowEditDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleEditConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditDialog(false);
  }

  //=========Event Handler=====

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك فى حذف هذة المهمه؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعذ اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم. قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* == Delete Dialog == */}

      {/* Edit Dialog */}
      <Dialog
        open={showEditDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(event) => {
                setUpdatedTodo({ ...updatedTodo, title: event.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="التفاصيل "
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(event) => {
                setUpdatedTodo({ ...updatedTodo, details: event.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleEditConfirm}>
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* == Edit Dialog == */}
      <Card
        className="cardContent"
        sx={{
          minWidth: 275,
          marginTop: 5,
          background: "#283593",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={8}
              sx={{
                textAlign: "right",
              }}
            >
              <Typography
                title={todo.title}
                variant="h5"
                sx={{
                  fontSize: "18px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textDecoration: todo.isCompleted ? "line-through":"none"
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                title={todo.details}
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontWeight: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {" "}
                {todo.details}{" "}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleCheckClick}
                className="icon-buttons"
                style={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: " #8bc34a solid 3px",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                }}
              >
                <CheckOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleEditClick}
                className="icon-buttons"
                style={{
                  background: "white",
                  border: " #1769aa solid 3px",
                  color: "#1769aa",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleDeleteClick}
                className="icon-buttons"
                style={{
                  background: "white",
                  border: " #b23c17 solid 3px",
                  color: "#b23c17",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
