import { screen } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import renderTestComponent from 'utils/tests.tsx'

import NewTaskForm, { NewTaskFormProps } from './NewTaskForm.tsx'

const defaultProps: NewTaskFormProps = {
  setTodos: vi.fn(),
}

describe('NewTaskForm', () => {
  it('updates input state', async () => {
    const { user } = renderTestComponent(NewTaskForm, defaultProps)
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    expect(input).toHaveValue('test')
    await user.type(input, '{escape}')
    expect(input).toHaveValue('')
  })
  it('adds new todo', async () => {
    const { user, props } = renderTestComponent(NewTaskForm, defaultProps)
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    expect(input).toHaveValue('test')
    await user.type(input, '{enter}')
    expect(input).toHaveValue('')
    expect(props.setTodos).toHaveBeenCalledTimes(1)
  })
})
