import type { ComponentType, ExoticComponent } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type TestableComponent<P> = ComponentType<P> | ExoticComponent<P>

interface RenderTestComponentResult<P> extends RenderResult {
  forceRerender: (newProps: Partial<P>) => void
  props: P
  user: ReturnType<typeof userEvent.setup>
}

function renderTestComponent<P>(Component: TestableComponent<P>, initialProps: P): RenderTestComponentResult<P>
function renderTestComponent<P>(
  Component: TestableComponent<P>,
  overrideProps?: Partial<P>
): RenderTestComponentResult<P>
function renderTestComponent<P>(
  Component: TestableComponent<P>,
  initialProps: P,
  overrideProps: Partial<P> = {}
): RenderTestComponentResult<P> {
  const props = { ...initialProps, ...overrideProps }

  const renderResult = render(<Component {...props} />)

  const forceRerender = (newProps: Partial<P>) => renderResult.rerender(<Component {...props} {...newProps} />)

  return {
    ...renderResult,
    forceRerender,
    props,
    user: userEvent.setup(),
  }
}

export default renderTestComponent
