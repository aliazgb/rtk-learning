import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
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
      state.todos = state.todos.filter((todo) => action.payload.id !== todo.id);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
