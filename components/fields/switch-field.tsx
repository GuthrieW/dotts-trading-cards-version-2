import React, { useState } from 'react'
import { Field } from 'formik'

type SwitchFieldProps = {
  name: string
  label: string
  initialValue: boolean
  disabled?: boolean
}

const SwitchField = ({
  name,
  label,
  initialValue,
  disabled = false,
}: SwitchFieldProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(Boolean(initialValue))
  return (
    <div className="flex items-center mb-4">
      <Field
        id={name}
        as="input"
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        disabled={disabled}
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor={name}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  )
}

export default SwitchField
