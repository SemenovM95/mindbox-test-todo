import { screen } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import renderTestComponent from 'utils/tests.tsx'

import TodoList, { TodoListProps } from './TodoList.tsx'

const defaultProps: TodoListProps = {
  todos: [],
  setTodos: vi.fn(),
}

describe('TodoList', () => {
  it('renders todos correctly', async () => {
    const { forceRerender } = renderTestComponent(TodoList, defaultProps)
    const emptyList = screen.getByTestId('todo-list-empty')
    expect(emptyList).toBeInTheDocument()
    expect(emptyList).toHaveTextContent('Ничего не нашлось😪')
    forceRerender({ todos: [{ id: 1, description: 'test', completed: true }], setTodos: vi.fn() })
    const list = screen.getByTestId('todo-list')
    expect(list).not.toBeEmptyDOMElement()
    expect(list.children).toHaveLength(1)
  })
})
