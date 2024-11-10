const Card = ({ children }) => {
  return <div className="grid grid-cols-2">
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-6xl font-bold border-2 px-4 py-3 border-slate-700 rounded-xl">EmpManage</h1>
    </div>
    <div className="flex justify-center items-center h-screen">
      {
        children
      }
    </div>
  </div>
}

export default Card