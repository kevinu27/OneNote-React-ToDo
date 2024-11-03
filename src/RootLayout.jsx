
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout
