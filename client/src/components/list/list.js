import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function DataList() {
  const [todoItems, setTodoItems] = useState(() => {
    const savedData = localStorage.getItem("todoItems");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  function handleIInputChange(e) {
    setTodo(e.target.value);
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (  todo !== "" ) {
      setTimeout(() => {
        todo !== "" && setTodoItems([
          ...todoItems,
          {
            id: todoItems.length + 1,
            text: todo.trim(),
          },
        ]);
        setLoading(false);
      }, 1000);
      setLoading(true);
    }
    // clear out the input box
    setTodo("");
    
    /////////////  
    // if (localStorage.getItem("todoItems").includes(todo)) {
    //   alert("already exists!");
    //   return
    // } else  {
    //   setTimeout(() => {
    //     todo !== "" && setTodoItems([
    //       ...todoItems,
    //       {
    //         id: todoItems.length + 1,
    //         text: todo.trim(),
    //       },
    //     ]);
    //     setLoading(false);
    //   }, 1000);
    //   setLoading(true);
    //   setTodo("");
    // } 
  }

  const ClearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todoItems.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodoItems(updatedItem);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }
  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const Delete = (id) => {
    let newTodo = todoItems.filter((item) => item.id !== id);
    setTodoItems([...newTodo]);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={`m-t-20 ${loading ? "is-loading" : ""}`}
      >
        <Grid item lg={4}>
          {isEditing ? (
            <>
              <form onSubmit={handleEditFormSubmit}>
                <TextField
                  fullWidth
                  label="Edit todo"
                  name="editTodo"
                  value={currentTodo.text}
                  onChange={handleEditInputChange}
                  id="fullWidth"
                  variant="outlined"
                  inputProps={{
                    autoComplete: "off",
                    autoFocus: true,
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className="m-t-20"
                >
                  Update
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className="m-t-20 m-l-20"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </form>
            </>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <TextField
                fullWidth
                label="Add new todo"
                name="todo"
                value={todo}
                onChange={handleIInputChange}
                id="fullWidth"
                variant="outlined"
                inputProps={{
                  autoComplete: "off",
                  autoFocus: true,
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="m-t-20"
              >
                Save
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="m-t-20 m-l-20"
                onClick={ClearAll}
              >
                ClearAll
              </Button>
            </form>
          )}

          {todoItems.length === 0 && (
            <div className="m-t-20 text-Align">No data</div>
          )}
          {loading && (
            <div className="loader">
              <div className="icon"></div>
            </div>
          )}
          {todoItems.map((todo, i) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              key={i}
            >
              <ListItem alignItems="flex-start" className="m-t-20">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                  primary={todo.text}
                  secondary={<React.Fragment></React.Fragment>}
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    editTodo(todo);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  className="delete-icon"
                  onClick={() => {
                    Delete(todo.id || "");
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default DataList;
