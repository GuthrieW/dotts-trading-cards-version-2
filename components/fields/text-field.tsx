import React from 'react'
import { Field } from 'formik'

type TextFieldProps = {
  name: string
  label: string
  type: 'text' | 'number' | 'password'
  disabled?: boolean
  min?: number
}

const TextField = ({
  name,
  label,
  type,
  disabled = false,
  min,
}: TextFieldProps) => (
  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <Field
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      as="input"
      id={name}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={label}
      min={min}
    />
  </div>
)

export default TextField
