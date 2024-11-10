const Button = ({ label, onClick, className }) => {
  const classes = `border px-3 mt-2 py-1 tracking-wider rounded-lg font-bold text-xl text-white  w-full  shadow-xl bg-slate-900 focus:bg-slate-800 hover:bg-slate-800 ${className}`;
  return <button className={classes} onClick={onClick}>{label}</button>
}

export default Button;
