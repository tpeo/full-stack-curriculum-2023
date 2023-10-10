import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  Grid,
} from "@mui/material";
import Header from "./Header";

export default function HomePage() {

  // State to hold the list of tasks.
  const [tasks, setTasks] = useState([
    // Sample tasks to start with.
    { name: "create a todo app", finished: false },
    { name: "wear a mask", finished: false },
    { name: "play roblox", finished: false },
    { name: "be a winner", finished: true },
    { name: "become a tech bro", finished: true },
  ]);

  // State for the task name being entered by the user.
  const [taskName, setTaskName] = useState("");

  // Function to add a new task to the list.
  function addTask() {
    // Check if task name is provided and if it doesn't already exist.
    if (taskName && !tasks.some((task) => task.name === taskName)) {
      setTasks([...tasks, { name: taskName, finished: false }]);
      setTaskName("");
    } else if (tasks.some((task) => task.name === taskName)) {
      alert("Task already exists!");
    }
  }

  // Function to toggle the 'finished' status of a task.
  function updateTask(name) {
    setTasks(
      tasks.map((task) =>
        task.name === name ? { ...task, finished: !task.finished } : task
      )
    );
  }

  // Function to compute a message indicating how many tasks are unfinished.
  function getSummary() {
    const unfinishedTasks = tasks.filter((task) => !task.finished).length;
    return unfinishedTasks === 1
      ? `You have 1 unfinished task`
      : `You have ${unfinishedTasks} tasks left to do`;
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm">
        {/* Main layout and styling for the ToDo app. */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Display the unfinished task summary */}
          <Typography variant="h4" component="div" fontWeight="bold">
            {getSummary()}
          </Typography>
          <Box
            sx={{
              width: "100%",
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Input and button to add a new task */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small" // makes the textfield smaller
                  value={taskName}
                  placeholder="Type your task here"
                  onChange={(event) => setTaskName(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addTask}
                  fullWidth
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            {/* List of tasks */}
            <List sx={{ marginTop: 3 }}>
              {tasks.map((task) => (
                <ListItem
                  key={task.name}
                  dense
                  onClick={() => updateTask(task.name)}
                >
                  <Checkbox
                    checked={task.finished}
                  />
                  <ListItemText primary={task.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </>
  );
}
