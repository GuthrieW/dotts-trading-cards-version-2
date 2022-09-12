import { Field } from 'formik'
import React, { useId } from 'react'

type SelectOption = {
  key: string
  value: string
}

type AutocompleteDropdownProps = {
  title: string
  options: SelectOption[]
  disabled?: boolean
}

const AutocompleteDropdown = ({
  title,
  options,
  disabled,
}: AutocompleteDropdownProps) => {
  const id = useId()
  return (
    <div className="m-2 flex justify-between">
      <label htmlFor={`${title}-${id}`}>{title}</label>
      <Field
        disabled={disabled}
        autoComplete="on"
        list={`${title}-list-${id}`}
        name={title}
        id={`${title}-${id}`}
      />
      <datalist id={`${title}-list-${id}`}>
        {options.map((option: SelectOption) => (
          <option value={option.key}>{option.value}</option>
        ))}
      </datalist>
    </div>
  )
}

export default AutocompleteDropdown
