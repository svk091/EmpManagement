const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xl font-bold tracking-wider">{label}</label>
      <input className="p-1 rounded-lg  border-2" type={type} value={value} onChange={onChange} />
    </div>
  )
}

export default InputField;