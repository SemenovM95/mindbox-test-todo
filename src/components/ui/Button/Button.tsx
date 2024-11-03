import { type ButtonHTMLAttributes, type PropsWithChildren, forwardRef } from 'react'

import s from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }: PropsWithChildren<ButtonProps>, ref) => {
    const cls = `${s.button} ${className}`
    return (
      <button type="button" className={cls} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
