const Label = ({ label, children }) => {

  return <div className="flex flex-col space-y-1">
    <label className="text-xl font-bold tracking-wider">{label}</label>
    <div className="flex flex-col">
      {children}
    </div>
  </div>
}

export default Label;