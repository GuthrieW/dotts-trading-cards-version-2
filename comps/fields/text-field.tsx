import React from 'react'
import { Field } from 'formik'

type TextFieldProps = {
  name: string
  label: string
  type: string
  disabled?: boolean
}

const TextField = ({ name, label, type, disabled = false }: TextFieldProps) => (
  <div className="m-2 flex justify-between">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} type={type} disabled={disabled} />
  </div>
)

export default TextField
