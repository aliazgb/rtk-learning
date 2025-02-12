import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const  todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>TodoList</h2>

      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo}/>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
