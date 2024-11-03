import { type InputHTMLAttributes, forwardRef } from 'react'

import s from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', value, placeholder, className, onChange, checked, ...props }: InputProps, ref) => {
    const cls = className ? `${s[type]} ${className} ` : s[type]

    return (
      <input
        className={cls}
        type={type}
        value={value}
        placeholder={placeholder}
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
Input.defaultProps = {
  checked: false,
}

export default Input
