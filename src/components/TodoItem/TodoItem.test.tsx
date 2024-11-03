import { screen } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import renderTestComponent from 'utils/tests.tsx'

import TodoItem, { TodoItemProps } from './TodoItem.tsx'

const defaultProps: TodoItemProps = {
  todo: {
    description: 'test',
    completed: false,
    id: 1,
  },
  onCompleted: vi.fn(),
}

describe('TodoItem', () => {
  it('renders todo correctly', async () => {
    renderTestComponent(TodoItem, defaultProps)
    const description = screen.getByTestId('todo-title')
    const toggle = screen.getByTestId('todo-toggle')
    expect(toggle).not.toBeChecked()
    expect(description).toHaveTextContent(defaultProps.todo.description)
  })
  it('calls onCompleted and re-renders', async () => {
    const { user, props, forceRerender } = renderTestComponent(TodoItem, defaultProps)
    const toggle = screen.getByTestId('todo-toggle')
    expect(toggle).not.toBeChecked()
    await user.click(toggle)
    expect(props.onCompleted).toHaveBeenCalledWith(props.todo.id)
    forceRerender({ todo: { ...defaultProps.todo, completed: true } })
    expect(toggle).toBeChecked()
  })
})
