import { Field } from 'formik'

const TextField = ({ name, label, type, disabled = false }) => (
  <div className="m-2 flex justify-between">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} type={type} disabled={disabled} />
  </div>
)

export default TextField
