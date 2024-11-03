import { screen } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import renderTestComponent from 'utils/tests.tsx'

import Filter, { FilterProps } from './Filter.tsx'

const defaultProps: FilterProps = {
  options: ['all', 'active', 'completed'],
  incomplete: 0,
  currentFilter: 'all',
  onSetFilter: vi.fn(),
  onClearCompleted: vi.fn(),
}
// const renderComponent = (overrideProps?: Partial<FilterProps>) => {
//
//
//   const props = { ...defaultProps, ...overrideProps }
//
//   return {
//     ...render(<Filter {...props} />),
//     props,
//     user: userEvent.setup(),
//   }
// }

describe('Filter', () => {
  it('calls onSetFilter', async () => {
    const { user, props } = renderTestComponent(Filter, defaultProps)
    await user.click(screen.getByText('active'))
    expect(props.onSetFilter).toHaveBeenCalledTimes(1)
    expect(props.onSetFilter).toHaveBeenCalledWith('active')
  })
  it('calls onClearCompleted', async () => {
    const { user, props } = renderTestComponent(Filter, defaultProps)
    await user.click(screen.getByText('clear completed', { exact: false }))
    expect(props.onClearCompleted).toHaveBeenCalledTimes(1)
  })
})
