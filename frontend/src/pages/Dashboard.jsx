import Navbar from "../components/Navbar";
const Dashboard = () => {
  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
  return <div className="flex flex-col">
    <Navbar />
    <div className="mt-10 p-2">
      <div className="flex flex-col space-y-3 justify-center items-center mt-32">
        <h1 className="text-6xl font-bold">{`${greeting}, ${localStorage.getItem("username")}!`}</h1>
        <p className="text-4xl font-serif">Welcome back to your Admin Dashboard. Let's make today productive!</p>
      </div>
    </div>
  </div>
}

export default Dashboard;