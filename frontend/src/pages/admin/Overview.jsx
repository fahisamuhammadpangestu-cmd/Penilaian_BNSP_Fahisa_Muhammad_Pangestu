import { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminSidebar from '../../components/AdminSidebar';

const Overview = () => {
  const [stats, setStats] = useState({
    total_buku: 0,
    total_terjual: 0,
    total_report: 0
});

const fetchStats = async () => {
    try {
        const res = await api.get('/admin/statistics');
        console.log("Data Full Response:", res.data); 
        
        const result = res.data.success ? res.data : res.data;

        setStats({
            total_buku: result.total_buku || 0,
            total_terjual: result.total_terjual || 0,
            total_report: result.total_report || 0
        });
    } catch (err) {
        console.error("Gagal ambil statistik:", err);
    }
};

useEffect(() => {
    fetchStats();
}, []); // Kosong artinya dipanggil pas halaman dibuka

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F0F9F4' }}>
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold" style={{ color: '#1A1F1E' }}>Dashboard Overview</h1>
          <p className="text-gray-500">Pantau performa HisaStore Anda hari ini.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Total Buku */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 transition-transform hover:-translate-y-2" style={{ borderColor: '#1A1F1E' }}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Koleksi</p>
            <h2 className="text-5xl font-black mt-2" style={{ color: '#1A1F1E' }}>{stats.total_buku}</h2>
            <p className="text-xs mt-4 text-gray-400">Buku tersedia di sistem</p>
          </div>

          {/* Card Terjual */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 transition-transform hover:-translate-y-2" style={{ borderColor: '#366650' }}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pesanan Berhasil</p>
            <h2 className="text-5xl font-black mt-2" style={{ color: '#366650' }}>{stats.total_terjual}</h2>
            <p className="text-xs mt-4 text-gray-400">Transaksi selesai divalidasi</p>
          </div>

          {/* Card Report */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 transition-transform hover:-translate-y-2" style={{ borderColor: '#A3DFBF' }}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Laporan Masuk</p>
            <h2 className="text-5xl font-black mt-2" style={{ color: '#4F9B7E' }}>{stats.total_report}</h2>
            <p className="text-xs mt-4 text-gray-400">Pesan dari pelanggan</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Overview;