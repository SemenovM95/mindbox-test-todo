import { screen } from '@testing-library/react'
import { describe, expect } from 'vitest'

import renderTestComponent from 'utils/tests.tsx'

import App, { defaultTodos } from './App.tsx'

describe('App', () => {
  it('adds and renders new todo', async () => {
    const { user } = renderTestComponent(App)
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    await user.type(input, '{enter}')
    expect(screen.getByText('test')).toBeInTheDocument()
  })
  it('deletes completed todos', async () => {
    const { user } = renderTestComponent(App)
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    await user.type(input, '{enter}')
    expect(screen.getByText('test')).toBeInTheDocument()
    const beforeClear = screen.getByTestId('todo-list')
    const total = beforeClear.children.length
    const completed = defaultTodos.filter((todo) => todo.completed).length
    const clearBtn = screen.getByTestId('clear-completed', { exact: false })
    const afterClear = screen.getByTestId('todo-list')
    await user.click(clearBtn)
    expect(afterClear.children).toHaveLength(total - completed)
  })
})
