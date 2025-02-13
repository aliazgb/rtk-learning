import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
export const getAsyncFetch = createAsyncThunk(
  "users/getAsyncFetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addAsyncTodo = createAsyncThunk(
  "users/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", {
        id: Date.now(),
        title: payload.title,
        complete: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAsyncTodo = createAsyncThunk(
  "users/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const toggleAsyncTodo = createAsyncThunk(
  "users/toggleAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${payload.id}`, {
        complete: payload.complete,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: "",
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        complete: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectTodo = state.todos.find(
        (todo) => action.payload.id == todo.id
      );
      selectTodo.complete = !selectTodo.complete;
    },
    deleteTodo: (state, action) => {
      console.log(action);
      state.todos = state.todos.filter((todo) => action.payload.id !== todo.id);
    },
  },
  extraReducers: {
    [getAsyncFetch.pending]: (state, action) => {
      state.loading = true;
      state.todos = [];
      state.error = "";
    },
    [getAsyncFetch.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    },
    [getAsyncFetch.rejected]: (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error;
    },
    [addAsyncTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [addAsyncTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },

    [deleteAsyncTodo.pending]: (state, action) => {
      state.loading = true;
    },

    [deleteAsyncTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter(
        (todo) => Number(todo.id) !== Number(action.payload.id)
      );
    },

    [toggleAsyncTodo.fulfilled]: (state, action) => {
      const todoCompleted =  state.todos.find(
        (todo) => todo.id === Number(action.payload.id)
      );
      todoCompleted.complete = action.payload.complete;
      console.log(todoCompleted);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
