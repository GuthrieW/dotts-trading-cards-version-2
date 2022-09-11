import React from 'react'
import { Field } from 'formik'

type AutocompleteFieldProps = {
  name: string
  label: string
  type: string
  disabled?: boolean
}

const AutocompleteField = ({
  name,
  label,
  type,
  disabled,
}: AutocompleteFieldProps) => {
  return (
    <div className="m-2 flex justify-between">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} disabled={disabled} />
    </div>
  )
}

export default AutocompleteField
