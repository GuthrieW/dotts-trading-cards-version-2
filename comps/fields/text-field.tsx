import React from 'react'
import { Field } from 'formik'

type TextFieldProps = {
  name: string
  label: string
  type: string
  placeholder?: string
  disabled?: boolean
}

const TextField = ({
  name,
  label,
  type,
  placeholder,
  disabled = false,
}: TextFieldProps) => (
  <div className=" mb-4">
    <label
      className=" block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <Field
      className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
    />
  </div>
)

export default TextField
