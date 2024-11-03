import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent, Dispatch, SetStateAction } from 'react'

import Input from 'components/ui/Input/Input.tsx'
import type { Todo } from 'components/TodoItem/TodoItem'

import s from './NewTaskForm.module.scss'

export interface NewTaskFormProps {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export default function NewTaskForm({ setTodos }: NewTaskFormProps) {
  const [description, setDescription] = useState('')

  const resetFormData = () => {
    setDescription('')
  }

  const onDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const addTodo = () => {
    setTodos((prev) => {
      const id = prev.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1
      const newTodo: Todo = { completed: false, description, id }
      return prev.concat(newTodo)
    })
  }

  const onSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!description) return
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Enter') {
      addTodo()
      resetFormData()
    }
    if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Escape') {
      resetFormData()
    }
  }

  return (
    <header className="header">
      <Input
        type="text"
        className={s.newTodo}
        value={description}
        placeholder="What needs to be done?"
        onChange={onDescriptionInput}
        onKeyDown={onSubmit}
      />
    </header>
  )
}
