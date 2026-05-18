import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.clear(); navigate('/'); };

  return (
    <nav className="fixed top-0 z-50 w-full border-b" style={{ backgroundColor: '#1A1F1E', borderColor: '#366650' }}>
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-white">
              Hisa<span style={{ color: '#A3DFBF' }}>Store</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/home" className="text-white hover:text-[#A3DFBF]">Home</Link>
            <Link to="/bookstore" className="text-white hover:text-[#A3DFBF]">Buku Terlaris</Link>
            <Link to="/cart" className="text-white hover:text-[#A3DFBF]">Keranjang</Link>
            <Link to="/contact" className="text-white hover:text-[#A3DFBF]">Layanan</Link>
            <Link to="/history" className="text-white hover:text-[#A3DFBF]">Riwayat</Link>
          </div>
          <button onClick={handleLogout} className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg text-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;