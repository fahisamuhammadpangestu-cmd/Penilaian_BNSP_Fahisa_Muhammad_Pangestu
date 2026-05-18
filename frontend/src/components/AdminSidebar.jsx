import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.clear(); navigate('/'); };

  const menu = [
    { name: 'Overview', path: '/admin/overview' },
    { name: 'Books', path: '/admin/books' },
    { name: 'Transactions', path: '/admin/transactions' },
    { name: 'User Reports', path: '/admin/reports' },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform border-r" style={{ backgroundColor: '#1A1F1E', borderColor: '#366650' }}>
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
        <div className="mb-10 px-2">
           <span className="text-2xl font-bold text-white">Hisa<span style={{ color: '#A3DFBF' }}>Store</span></span>
           <p className="text-xs text-gray-400">ADMIN PANEL</p>
        </div>
        <ul className="space-y-2 font-medium flex-1">
          {menu.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="flex items-center p-2 text-white rounded-lg hover:bg-[#366650] group">
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="pt-4 border-t border-[#366650]">
           <button onClick={handleLogout} className="flex items-center p-2 w-full text-red-400 hover:bg-red-900 rounded-lg transition">
             <span>Logout</span>
           </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;