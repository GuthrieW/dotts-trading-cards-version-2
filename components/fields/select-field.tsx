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
  <div className="m-2 flex justify-between">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} as="select" disabled={disabled}>
      {options.map((option: SelectFieldOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
  </div>
)

export default SelectField
