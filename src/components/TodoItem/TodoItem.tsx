import { memo } from 'react'
import type { LiHTMLAttributes } from 'react'

import Input from 'components/ui/Input/Input.tsx'

import s from './TodoItem.module.scss'

export interface Todo {
  id: number
  description: string
  completed: boolean
}

export interface TodoItemProps extends LiHTMLAttributes<HTMLLIElement> {
  todo: Todo
  onCompleted: (id: number) => void
}

function TodoItem({ todo: { description, completed, id }, onCompleted, ...props }: TodoItemProps) {
  const cls = completed ? `${s.title} ${s.completed}` : `${s.title}`

  return (
    <li className={s.item} {...props} data-testid="todo-item">
      <Input
        title="toggle"
        type="checkbox"
        checked={completed}
        onChange={() => onCompleted(id)}
        data-testid="todo-toggle"
      />
      <label htmlFor="toggle" className={cls} data-testid="todo-title">
        {description}
      </label>
    </li>
  )
}

export default memo(TodoItem)
