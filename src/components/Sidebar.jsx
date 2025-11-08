import { FaUser, FaChartLine, FaWarehouse, FaDollarSign, FaThLarge } from "react-icons/fa";

export default function Sidebar() {
  const menus = [
    { name: "Dashboard", icon: <FaThLarge /> },
    { name: "Sales", icon: <FaDollarSign /> },
    { name: "Finance", icon: <FaChartLine /> },
    { name: "Human Resources", icon: <FaUser /> },
    { name: "Warehouse", icon: <FaWarehouse /> },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-primary text-white p-6 flex flex-col gap-8 shadow-card z-40">
      <h2 className="text-2xl font-semibold tracking-wide">ERP Dashboard</h2>

      <nav className="flex flex-col gap-3 mt-4">
        {menus.map((menu) => (
          <button
            key={menu.name}
            className="flex items-center gap-3 py-2 px-3 hover:bg-secondary/70 rounded-lg text-sm transition-all duration-200 text-white"
          >
            <span className="text-lg">{menu.icon}</span>
            <span>{menu.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto text-xs text-white/70">© 2025 ERP System</div>
    </aside>
  );
}
