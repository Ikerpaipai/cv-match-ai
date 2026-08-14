import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Mes CV',
    path: '/cvs',
  },
  {
    name: 'Opportunités',
    path: '/opportunities',
  },
  {
    name: 'Candidatures',
    path: '/applications',
  },
];

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="h-screen w-64 shrink-0 border-r bg-white p-6">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-gray-900">CV Analyzer AI</h1>

          <p className="mt-1 text-sm text-gray-500">Job matching assistant</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                rounded-lg px-4 py-3 text-sm font-medium transition
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
