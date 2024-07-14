import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Project = {
  id: string;
  name: string;
};
type Todo = {
  id: string;
  text: string;
  completed: boolean;
  projectId: string;
};

export function Application() {
  const [currentProjectId, setCurrentProjectId] = useState<string>("0");
  const [projectList, setProjectList] = useState<Project[]>([
    {
      id: "0",
      name: "Inbox",
    },
  ]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const currentProject = projectList.find(
    (i) => i.id === currentProjectId,
  ) as Project;
  return (
    <div className="p-4">
      <h1 className="bg-slate-400">Todo App</h1>
      <h2>Project: {currentProject ? currentProject.name : "Inbox"}</h2>
      <div className="flex flex-col">
        {projectList.map((project) => (
          <Button
            key={project.id}
            onClick={() => {
              setCurrentProjectId(project.id);
            }}
          >
            {project.name}
          </Button>
        ))}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = document.getElementById(
                "project-input",
              ) as HTMLInputElement;
              const value = input.value as string;
              if (!value) return;
              setProjectList((list) => [
                ...list,
                {
                  id: crypto.randomUUID(),
                  name: value,
                },
              ]);
              input.value = "";
            }}
          >
            <Input required id="project-input" type="text" />
            <Button type="submit">add project</Button>
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        {todos
          .filter((t) => t.projectId === currentProject)
          .map((todo) => (
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
        projectList={projectList}
        addTodo={(t) => {
          setTodos((list) => [...list, t]);
        }}
      />
    </div>
  );
}

function TodoForm({
  addTodo,
  projectList,
}: {
  addTodo: (todo: Todo) => void;
  projectList: Project[];
}) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById("todo-input") as HTMLInputElement;
    const value = input.value as string;
    const projectSelect = document.querySelector("select") as HTMLSelectElement;
    const projectId = projectSelect.value;
    if (!value || !projectId) return;
    addTodo({
      id: crypto.randomUUID(),
      text: value,
      completed: false,
      projectId: "0",
    });
    input.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <Input id="todo-input" type="text" />
      <Select required>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {projectList.map((p: Project) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">add todo</Button>
    </form>
  );
}
