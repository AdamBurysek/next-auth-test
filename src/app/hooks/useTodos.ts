import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/lib/types";
import { useSession } from "next-auth/react";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const sessionData = useSession();
  const session = sessionData?.data;

  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("Chyba při načítání úkolů");
      return res.json();
    },
  });

  const addTodo = useMutation<
    Todo,
    Error,
    Todo,
    { previousTodos: Todo[] | undefined }
  >({
    mutationFn: async (newTodo) => {
      const userEmail = session!.user?.email;
      console.log(newTodo);
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          ...newTodo,
          email: userEmail,
        }),
      });
      if (!res.ok) throw new Error("Chyba při přidávání úkolu");
      console.log(res);
      return res.json();
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        newTodo,
        ...old,
      ]);

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodo = useMutation<
    Todo,
    Error,
    { id: number; text?: string; completed?: boolean },
    { previousTodos: Todo[] | undefined }
  >({
    mutationFn: async ({ id, text, completed }) => {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, text, completed }),
      });
      if (!res.ok) throw new Error("Chyba při úpravě úkolu");
      return res.json();
    },

    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
        ),
      );

      return { previousTodos };
    },

    onError: (_err, _updatedTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodo = useMutation<
    void,
    Error,
    number,
    { previousTodos: Todo[] | undefined }
  >({
    mutationFn: async (todoId) => {
      const res = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: todoId }),
      });
      if (!res.ok) throw new Error("Chyba při mazání úkolu");
    },
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== todoId),
      );

      return { previousTodos };
    },
    onError: (_err, _todoId, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { todos, isLoading, addTodo, updateTodo, deleteTodo };
};
