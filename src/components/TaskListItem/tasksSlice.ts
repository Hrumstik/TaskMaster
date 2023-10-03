import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Task {
  id: string;
  name: string;
  date: null | string;
  done: boolean;
  important: boolean;
}

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axios.get("http://localhost:3001/tasks/", {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (e) {
    throw e;
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: payload.id,
            name: payload.name,
            date: null,
            done: false,
            important: false,
          },
        ],
      };
    },
    setAsDoneTask: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.name === payload) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        }),
      };
    },
    setAsImportantTask: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.name === payload) {
            return {
              ...task,
              important: !task.important,
            };
          } else {
            return task;
          }
        }),
      };
    },
    setTheDateOfPerfomingTheTask: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.name === payload.name) {
            return {
              ...task,
              date: payload.date,
            };
          } else {
            return task;
          }
        }),
      };
    },
    deleteTask: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          return task.name !== payload;
        }),
      };
    },
    changeTheNameOfTask: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === payload.id) {
            return {
              ...task,
              name: payload.newName,
            };
          } else {
            return task;
          }
        }),
      };
    },
    deleteAllTask: (state) => {
      return {
        ...state,
        tasks: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.tasks = payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addTask,
  setAsDoneTask,
  setAsImportantTask,
  deleteTask,
  setTheDateOfPerfomingTheTask,
  changeTheNameOfTask,
  deleteAllTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
export const getTasksStatus = (state: any) => state.tasks.status;
