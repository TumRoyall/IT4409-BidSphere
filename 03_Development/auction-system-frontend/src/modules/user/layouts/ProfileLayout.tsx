import { NavLink, Outlet } from "react-router-dom";

const menu = [
  { label: "Hồ sơ", to: "/profile" },
  { label: "Ví", to: "/profile/wallet" },
];

export default function ProfileLayout() {
  return (
    <div className="bg-[#f5f7fa] min-h-screen py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b">
            <h2 className="text-[#0b2b4c] font-semibold">Tài khoản của tôi</h2>
            <p className="text-sm text-gray-500">Quản lý hồ sơ & bảo mật</p>
          </div>
          <nav className="p-3">
            {menu.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                end
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm mb-1 transition
                  ${isActive ? "bg-[#0b2b4c] text-white shadow" : "text-gray-700 hover:bg-gray-50"}`
                }
              >
                {m.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="col-span-9 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
