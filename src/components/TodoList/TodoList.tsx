import { ReactElement, useCallback } from 'react'

import TodoItem from 'components/TodoItem/TodoItem.tsx'
import type { Todo } from 'components/TodoItem/TodoItem'

import s from './TodoList.module.scss'

export interface TodoListProps {
  todos: Todo[]
  setTodos: (callback: (prev: Todo[]) => Todo[]) => void
}

export default function TodoList({ todos, setTodos }: TodoListProps): ReactElement {
  const handleCompleted = useCallback((id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  return todos.length ? (
    <ul className={s.todoList} data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onCompleted={handleCompleted} />
      ))}
    </ul>
  ) : (
    <p className={s.todoListEmpty} data-testid="todo-list-empty">
      Ничего не нашлось😪
    </p>
  )
}
