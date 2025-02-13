import { useDispatch } from "react-redux";

import { deleteAsyncTodo } from "../../features/todo/todoSlice.js";
import { toggleAsyncTodo } from "../../features/todo/todoSlice";
const TodoItem = ({ id, title, complete }) => {
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${complete && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={(e) => {
              e.preventDefault();
              dispatch(toggleAsyncTodo({ id, complete: !complete }));
            }}
            type="checkbox"
            className="mr-3"
            checked={complete}
          />
          <span>{title}</span>
        </span>
        <button
          onClick={() => dispatch(deleteAsyncTodo({ id: id }))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
