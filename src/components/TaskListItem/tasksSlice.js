import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    try {
        const response = await fetch('http://localhost:3001/tasks/', {
            method: 'GET',
            body: null,
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Could not fetch http://localhost:3001/posts, status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (e) {
        throw e;
    }
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
            return {
                ...state, tasks: [...state.tasks, {
                    id: uuidv4(),
                    name: action.payload,
                    date: null,
                    done: false,
                    important: false
                }]
            }
        },
        setAsDoneTask: (state, action) => {
            return {
                ...state, tasks: state.tasks.map(task => {
                    if (task.name === action.payload) {
                        return {
                            ...task,
                            done: !task.done
                        }
                    } else {
                        return task
                    }
                })
            }
        },
        setAsImportantTask: (state, action) => {
            return {
                ...state, tasks: state.tasks.map(task => {
                    if (task.name === action.payload) {
                        return {
                            ...task,
                            important: !task.important
                        }
                    } else {
                        return task
                    }
                })
            }
        },
        setTheDateOfPerfomingTheTask: (state, action) => {
            return {
                ...state, tasks: state.tasks.map(task => {
                    if (task.name === action.payload.name) {
                        return {
                            ...task,
                            date: action.payload.date
                        }
                    } else {
                        return task
                    }
                })
            }
        },
        deleteTask: (state, action) => {
            return {
                ...state, tasks: state.tasks.filter((task) => {
                    return task.name !== action.payload
                })
            }


        },
        changeTheNameOfTask: (state, action) => {
            return {
                ...state, tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            name: action.payload.newName
                        }
                    } else {
                        return task
                    }
                })
            }
        },
        deleteAllTask: (state) => {
            return {
                ...state, tasks: []
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { addTask, setAsDoneTask, setAsImportantTask, deleteTask, setTheDateOfPerfomingTheTask, changeTheNameOfTask, deleteAllTask } = tasksSlice.actions;
export default tasksSlice.reducer;
export const getTasksStatus = (state) => state.tasks.status;

