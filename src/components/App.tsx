import { useState, useMemo, useCallback } from 'react'

import NewTaskForm from 'components/NewTaskForm/NewTaskForm.tsx'
import TodoList from 'components/TodoList/TodoList.tsx'
import Filter from 'components/Filter/Filter.tsx'
import type { Todo } from 'components/TodoItem/TodoItem'
import type { TFilter } from 'components/Filter/Filter'

import s from './App.module.scss'

export const defaultTodos: Todo[] = [
  {
    completed: true,
    description: 'Тестовое задание',
    id: 1,
  },
  {
    completed: false,
    description: 'Прекрасный код )))))))',
    id: 2,
  },
  {
    completed: true,
    description: 'Покрытие тестами',
    id: 3,
  },
]

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos)
  const [currentFilter, setCurrentFilter] = useState<TFilter>('all')
  const filterOptions: TFilter[] = useMemo(() => ['all', 'active', 'completed'], [])

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      return currentFilter === 'all' ? todos : todo.completed === (currentFilter === 'completed')
    })
  }, [currentFilter, todos])

  const remainingTodos = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos])

  const clearCompleted = useCallback(() => setTodos((prev) => prev.filter((todo) => !todo.completed)), [])

  const setFilter = useCallback((filter: TFilter) => setCurrentFilter(filter), [])

  return (
    <main className={s.main}>
      <h1 className={s.appHeading}>todos</h1>
      <section className={s.todoapp}>
        <NewTaskForm setTodos={setTodos} />
        <TodoList todos={filteredTodos} setTodos={setTodos} />
        <Filter
          options={filterOptions}
          incomplete={remainingTodos}
          currentFilter={currentFilter}
          onSetFilter={setFilter}
          onClearCompleted={clearCompleted}
        />
      </section>
    </main>
  )
}
