import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";
const AddTodoForm = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    if (!value) {
      return;
    }
    e.preventDefault();
    dispatch(addTodo({ title: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        value={value}
        autoComplete="off"
        id="name"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-1">
        Submit
      </button>
    </form>
  );
};

export default AddTodoForm;
