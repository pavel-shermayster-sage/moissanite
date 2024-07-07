import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Input } from "./ui/input";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export function Application() {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <div className="p-4">
      <h1 className="bg-slate-400">Todo App</h1>
      <div className="flex flex-col">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <Checkbox
              onClick={() =>
                setTodos((l) =>
                  l.map((t) => {
                    if (t.id === todo.id) {
                      return {
                        ...t,
                        completed: !t.completed,
                      };
                    }
                    return t;
                  }),
                )
              }
              checked={todo.completed}
              id={`${todo.id}-checkbox`}
            />
            <label htmlFor={`${todo.id}-checkbox`}>{todo.text}</label>
          </div>
        ))}
      </div>
      <TodoForm
        addTodo={(t) => {
          setTodos((list) => [...list, t]);
        }}
      />
    </div>
  );
}

function TodoForm({ addTodo }: { addTodo: (todo: Todo) => void }) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById("todo-input") as HTMLInputElement;
    const value = input.value as string;
    addTodo({
      id: crypto.randomUUID(),
      text: value,
      completed: false,
    });
    input.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <Input id="todo-input" type="text" />
      <Button type="submit">add todo</Button>
    </form>
  );
}
