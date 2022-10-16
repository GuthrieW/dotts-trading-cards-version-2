import { Field } from 'formik'

type SelectFieldOption = {
  label: string
  value: string | number
}

type SelectFieldProps = {
  name: string
  label: string
  options: SelectFieldOption[]
  disabled: boolean
}

const SelectField = ({
  name,
  label,
  options,
  disabled = false,
}: SelectFieldProps) => (
  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <Field
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      name={name}
      as="select"
      disabled={disabled}
    >
      {options.map((option: SelectFieldOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
  </div>
)

export default SelectField
